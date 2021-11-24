import React, {useState, useEffect} from 'react';
import './Inventory.css';
import ColumnGroupingTable from '../../components/ColumnGroupingTable';

import axios from 'axios';
import { api_host, axio_header } from '../proxy_env'

export default function Inventory() {
  // State variables
  const [games, setGames] = useState([]);
  const [rows, setRows] = useState([]);


  // Function that is called when page is changed
  useEffect(()=>{
    console.log("View in browser's developer console!");
    getGames();
  }, []);


  const getGames = async() => {
    try {
      const response = await axios.get(api_host+'/games', axio_header);
      setGames(response.data);
      let tableRows = []
      response.data.map((game) => {
        tableRows.push({
          name: game.name,
          description: game.description,
          price: game.price,
          inventoryCount: game.inventoryCount
        })
      })
      setRows(tableRows);
    } catch (error) {
      console.log("Couldn't fetch games :(");
    }
  }


  const columns = [
    {
      id: 'name',
      label: 'Name',
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
      label: 'Price',
      minWidth: 170,
      align: 'center',
    },
    {
      id: 'inventoryCount',
      label: 'Inventory Count',
      minWidth: 170,
      align: 'center',
    }
  ]


  return(
    <div className='Inventory'>
      <h1>Inventory</h1>
        <ColumnGroupingTable columns={columns} rows={rows} title="GameGo Games" />
    </div>
  );
}
