import React, {useEffect} from 'react';
import './Error.css';

export default function Error() {

  // Function that is called when page is changed
  useEffect(()=>{
    console.log("View in browser's developer console!");
  });

  return(
    <div className='Error'>
      <div className='error-container'>
        You lost? Get outta here 😡
      </div>
    </div>
  );
}
