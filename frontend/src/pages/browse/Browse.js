import React, {useState, useEffect} from 'react';
import './Browse.css';
import Game from './Game.js';

import axios from 'axios';
import { api_host, axio_header } from '../proxy_env'

export default function Browse() {
  // State variables
  const [example, setExample] = useState('EX'); // set logged in and non-logged in state?
  let games = [{"name":"Kingdom Hearts",
    "description":"RPG",
    "price":"30",
    "inventoryCount":"5"},
    {"name":"Kingdom Hearts 2",
    "description":"RPG second game",
    "price":"40",
    "inventoryCount":"5"}];

  // Function that is called when page is changed
  useEffect(()=>{
    console.log("View in browser's developer console!");
    /**
     * TO DO:
     * 1. Call API and set games variable info
     * 2. Make it an async function so it shows up on the page once fetched
     * 
     */ 

    // Uncomment to use H2 database
    // axios.get(api_host+'/games', axio_header).then(response=>{
    //   games = response.data
    //   console.log('data', response);
    // });

  });


  return(
    <div className='Browse'>
      <h1>Browse Games</h1>
      {games.map( (game,index) => (
        <div key={index}>
          <Game game={game} />
        </div>
      ))}
    </div>
  );
}
