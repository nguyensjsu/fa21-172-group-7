import React, {useState, useEffect} from 'react';
import './Game.css';
import CardWithImage from '../../components/CardWithImage.js';

import '../payments/Payments.js';

import Button from '@mui/material/Button';
import {Redirect} from 'react-router-dom';

import AdminNavbar from '../../components/AdminNavbar';

export default function Game(props) {
  // State variables
  const [example, setExample] = useState('EX'); // pass in logged in and non-logged in state in props from Browse?
  const [cartState, setCartState] = useState('Add To Cart');

  // Function that is called when page is changed
  useEffect(()=>{
    console.log("View in browser's developer console!");
  });


  const addToCart = async() => {

    if (cartState === 'Add To Cart') {
      localStorage.setItem('gameid', props.game.id);
      localStorage.setItem('gameName', props.game.name);
      localStorage.setItem('description', props.game.description);
      localStorage.setItem('price', props.game.price);
      props.parentCallback(props.game);
      setCartState('Remove From Cart');
      console.log("local storage cart set with = ", props.game);
    }
  
  }


  return(
    <div>
      <AdminNavbar />
      <CardWithImage 
        title={props.game.name + " ($" + props.game.price + ")"} 
        text={props.game.description} 
        buttonLabel={cartState} 
        buttonAction={addToCart}
        className="Game" />
    </div>
  );
}