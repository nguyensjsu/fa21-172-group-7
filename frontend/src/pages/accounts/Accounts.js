import React, {useState, useEffect} from 'react';
import './Accounts.css';

export default function Accounts() {
  // State variables
  const [example, setExample] = useState('EX');

  // Function that is called when page is changed
  useEffect(()=>{
    console.log("View in browser's developer console!");
  });

  return(
    <div className='Accounts'>
      <h1>{example}</h1>
    </div>
  );
}