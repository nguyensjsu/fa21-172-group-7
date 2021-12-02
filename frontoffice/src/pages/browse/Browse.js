import React, {useCallback, useState, useEffect} from 'react';
import './Browse.css';
import Game from './Game.js';

import axios from 'axios';
import { api_host, axio_header } from '../proxy_env'
import { useHistory } from 'react-router-dom'

import { TextField, Box, Button, Modal, Typography } from '@mui/material'
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import Footer from '../../components/Footer.js';

export default function Browse() {
  // State variables
  const [example, setExample] = useState('EX'); // set logged in and non-logged in state?
  const [games, setGames] = useState([]);
  const [modal, setModel] = useState(false);

  const history = useHistory();

  function call_UserAPI() {
    !localStorage.getItem('userType')=="admin" && axios.get(api_host+'/user', axio_header).then(response=>{
      let data = response.data;
      console.log('user data', response);
      if(data.length <= 0) localStorage.clear()
      if(!localStorage.getItem('userType')){
        localStorage.setItem('userType', '');
        localStorage.setItem('ggToken', '');
      }
    })
    if(!localStorage.getItem('userType')){
      localStorage.setItem('userType', '');
      localStorage.setItem('ggToken', '');
    }
  }

  // Function that is called when page is changed
  useEffect(()=>{
    call_UserAPI()
    console.log("View in browser's developer console!");
    getGames();
  }, []);


  const getGames = async() => {
    try {
      const response = await axios.get(api_host+'/games/available', axio_header);
      setGames(response.data);
    } catch (error) {
      console.log("Couldn't fetch games :(");
    }
  }


  // Used to create pop-up message to direct user to payments page
  const callback = useCallback((game) => {
    setModel(true);
  }, []);


  return(
    <div className='Browse'>
      <h1 style={{marginLeft:'20px'}}>Browse Games</h1>

        {games.map( (game,index) => (
            <div key={index} className="game">
              <Game game={game} parentCallback={callback}/>
            </div>
        ))}

      <Modal
        open={modal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        id="cart-modal"
      >
        <Box id="cart-modal-box">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Game added to cart!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            You can only pay for one game at a time.
          </Typography>
          <Button id="cart-modal-button" variant="contained" onClick={() => { history.push("/Payments"); }}>Go to Payments Page</Button>
        </Box>
      </Modal>

    </div>


  );
}
