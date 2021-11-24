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
  const [error, setError] = useState('');
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
      console.log('games', games);
    } catch (error) {
      setError("Couldn't fetch games :(");
    }
  }

  // <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
  //       {games.map( (game,index) => (
  //         <Grid item xs={2}>
  //           <Item key={index}>
  //             <Game game={game} />
  //           </Item>
  //         </Grid>
  //       ))}
  //     </Grid>


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
