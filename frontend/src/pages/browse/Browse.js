import React, {useState, useEffect} from 'react';
import './Browse.css';

export default function Browse() {
  // State variables
  const [example, setExample] = useState('EX');

  // Function that is called when page is changed
  useEffect(()=>{
    console.log("View in browser's developer console!");
  });

  return(
    <div className='Browse'>
      <h1>{example}</h1>
    </div>
  );
}
