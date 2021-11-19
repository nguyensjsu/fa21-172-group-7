import React, {useState, useEffect} from 'react';
import './Login.css';

export default function Login() {
  // State variables
  const [example, setExample] = useState('EX');

  // Function that is called when page is changed
  useEffect(()=>{
    console.log("View in browser's developer console!");
  });

  return(
    <div className='Login'>
      <h1>{example}</h1>
    </div>
  );
}
