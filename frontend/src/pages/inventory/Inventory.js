import React, {useState, useEffect} from 'react';
import './Inventory.css';

export default function Inventory() {
  // State variables
  const [example, setExample] = useState('EX');

  // Function that is called when page is changed
  useEffect(()=>{
    console.log("View in browser's developer console!");
  });

  return(
    <div className='Inventory'>
      <h1>{example}</h1>
    </div>
  );
}
