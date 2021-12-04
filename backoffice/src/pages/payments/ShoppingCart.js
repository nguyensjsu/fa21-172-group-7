import React, {useState, useEffect} from 'react';
import './ShoppingCart.css';
import ColumnGroupingTable from '../../components/ColumnGroupingTable';
import AdminNavbar from '../../components/AdminNavbar';
import NotLoggedInNavbar from '../../components/NotLoggedInNavbar';

import axios from 'axios';
import { api_host, axio_header } from '../proxy_env'

import { useOktaAuth } from '@okta/okta-react';

export default function ShoppingCart() {
  // State variables
  const { authState } = useOktaAuth();
  const [games, setGames] = useState([]);
  const [rows, setRows] = useState([]);


  // Function that is called when page is changed
  useEffect(()=>{
    console.log("View in browser's developer console!");

    const gameName = localStorage.getItem('gameName');
    const description = localStorage.getItem('description');
    const price = localStorage.getItem('price');

    if(gameName !== null && description !== null && price !== null) {

	  	let tableRows = [{
	  		gameName: gameName,
      		description: description,
      		price: "$" + price,
	  	}]

	    setRows(tableRows);
    }

  }, []);


  const columns = [
    {
      id: 'gameName',
      label: 'Game Name',
      minWidth: 170,
      align: 'center',
    },
    {
      id: 'description',
      label: 'Description',
      minWidth: 170,
      align: 'center',
    },
    {
      id: 'price',
      label: 'Total',
      minWidth: 170,
      align: 'center',
    },
  ]


  return(
    <div>
      {authState ? 
          authState.isAuthenticated ?
            <AdminNavbar />:
            <NotLoggedInNavbar /> :
        <NotLoggedInNavbar />
        
      }
      <div className='ShoppingCart'>
        <h1>Shopping Cart</h1>
          <ColumnGroupingTable columns={columns} rows={rows} title="Shopping Cart" />
      </div>
    </div>
  );
}
