import React, {useState, useEffect} from 'react';
import './Register.css';

export default function Register() {
  // State variables
  const [example, setExample] = useState('EX');

  // Function that is called when page is changed
  useEffect(()=>{
    console.log("View in browser's developer console!");
  });

  return(
    <div className='Register'>
      <h1>{example}</h1>
    </div>
  );
}
