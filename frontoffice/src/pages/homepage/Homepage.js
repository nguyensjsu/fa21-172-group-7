import React, { Fragment, useEffect } from "react";
import axios from 'axios';
import { api_host, axio_header } from '../proxy_env';
import './Homepage.css'

export default function HomePage() {

  function call_UserAPI() {
    !localStorage.getItem('userType')==="admin" && axios.get(api_host+'/user', axio_header).then(response=>{
      let data = response.data;
      console.log('user data', response);
      if(data.length <= 0) localStorage.clear()
      if(!localStorage.getItem('userType')){
        localStorage.setItem('userType', '');
        localStorage.setItem('ggToken', '');
      }
    })
    if(!localStorage.getItem('userType')){
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
          We sell games and stuff. Mostly just games for now.
        </div>
        <h4>Welcome!</h4>
            <p> Hello! We are a group of software engineering students. Please enjoy this demo of our project for CMPE172 at SJSU. </p>
      
      </div>
    </div>
  );
}
