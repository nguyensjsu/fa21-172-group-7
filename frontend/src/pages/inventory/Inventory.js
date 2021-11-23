import React, {useState, useEffect} from 'react';
import './Inventory.css';
import ColumnGroupingTable from '../../components/ColumnGroupingTable';

import axios from 'axios';
import { api_host, axio_header } from '../proxy_env'

export default function Inventory() {
  // State variables
  const [example, setExample] = useState('EX');
  const [games, setGames] = useState('EX');


  // Function that is called when page is changed
  useEffect(()=>{
    console.log("View in browser's developer console!");

    // const dbGames = axios.get(api_host+'/games', axio_header).then(response=>{
    //   games = response.data
    //   console.log('data', response);
    // });

    // dbGames.forEach( (game) => {
    //   rows.push({
    //     name: game.getName(), 
    //     description: game.getDescription(), 
    //     price: game.getPrice(), 
    //     inventoryCount: game.getInventoryCount() 
    //   })
    // })

  });

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

  const rows = [
    {
      name:"Kingdom Hearts",
      description:"RPG",
      price:"30",
      inventoryCount:"5"
    },
    {
      name:"Kingdom Hearts 2",
      description:"RPG second game",
      price:"40",
      inventoryCount:"5"
    }
  ]

  return(
    <div className='Inventory'>
      <h1>Inventory</h1>
        <ColumnGroupingTable columns={columns} rows={rows} title="GameGo Games" />
    </div>
  );
}
