import React, {useState, useEffect} from 'react';
import './Payments.css';

export default function Payments() {
  // State variables
  const [example, setExample] = useState('EX');

  // Function that is called when page is changed
  useEffect(()=>{
    console.log("View in browser's developer console!");
  });

  return(
    <div className='Payments'>
      <h1>{example}</h1>
    </div>
  );
}
