import React, {useState, useEffect} from 'react';
import './Browse.css';
import Game from './Game.js';

import axios from 'axios';
import { api_host, axio_header } from '../proxy_env'

import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';


export default function Browse() {
  // State variables
  const [example, setExample] = useState('EX'); // set logged in and non-logged in state?
  const [games, setGames] = useState([]);


  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


  // Function that is called when page is changed
  useEffect(()=>{
    console.log("View in browser's developer console!");
    getGames();
  }, []);

  const getGames = async() => {
    try {
      const response = await axios.get(api_host+'/games', axio_header);
      setGames(response.data);
    } catch (error) {
      console.log("Couldn't fetch games :(");
    }
  }



  return(
    <div className='Browse'>
      <h1>Browse Games</h1>

        {games.map( (game,index) => (
            <div key={index} className="game">
              <Game game={game} />
            </div>
        ))}

    </div>
  );
}
