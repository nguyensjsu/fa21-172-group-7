import React, {useState, useEffect} from 'react';
import './Transactions.css';

export default function Transactions() {
  // State variables
  const [example, setExample] = useState('EX');

  // Function that is called when page is changed
  useEffect(()=>{
    console.log("View in browser's developer console!");
  });

  return(
    <div className='Transactions'>
      <h1>{example}</h1>
    </div>
  );
}
