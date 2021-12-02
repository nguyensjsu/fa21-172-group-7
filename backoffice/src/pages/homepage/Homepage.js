import React, {useEffect} from "react";
import './Homepage.css'

export default function HomePage() {

  function call_UserAPI() {
    if(localStorage.getItem('userType') !== 'admin'){
      localStorage.setItem('userType', '');
      localStorage.setItem('ggToken', '');
    }
  }

  useEffect(()=>{
    call_UserAPI()
    console.log("View in browser's developer console!");
  }, []);

  return (
    <div className='HomePage'>
      <div className='main-component'>
        <div className='title'>
          GameGo
        </div>
        <div className='subtitle'>
          Welcome to our Back Office
        </div>
      </div>
    </div>
  );
}
