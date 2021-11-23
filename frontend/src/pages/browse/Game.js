import React, {useState, useEffect} from 'react';
import './Game.css';

import '../payments/Payments.js';

import Button from '@mui/material/Button';
import {Redirect} from 'react-router-dom';

export default function Game(props) {
  // State variables
  const [example, setExample] = useState('EX'); // pass in logged in and non-logged in state in props from Browse?

  // Function that is called when page is changed
  useEffect(()=>{
    console.log("View in browser's developer console!");
  });


  // THIS IS NOT WORKING YET
  function purchase() {
    console.log("REDIRECT TO PAYMENTS");

    return <Redirect to={{
              pathname: "/Payments",
              properties: { game: props.game }
            }}
          />

    // Source if we want to pass game into the URL: https://stackoverflow.com/questions/48233182/how-to-send-props-to-reactjs-when-redirect
  }


  /**
   * Change to this when using backend database:
   * <h1>{props.game.getName()}</h1>
      <p>{props.game.getDescription()}</p>
      <p>{props.game.getPrice()}</p>
   */ 
  return(
    <div className='Game'>
      <h1>{props.game.name}</h1>
      <p>{props.game.description}</p>
      <p>{props.game.price}</p>
      <Button onClick={purchase} variant="contained">Purchase</Button>
    </div>
  );
}