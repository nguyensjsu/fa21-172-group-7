import React, {useEffect} from "react";
import './Homepage.css'

import AdminNavbar from '../../components/AdminNavbar';
import NotLoggedInNavbar from '../../components/NotLoggedInNavbar';

import { useOktaAuth } from '@okta/okta-react';

export default function HomePage() {

  const { authState } = useOktaAuth();

  // function call_UserAPI() {
  //   if(localStorage.getItem('userType') !== 'admin'){
  //     localStorage.setItem('userType', '');
  //     localStorage.setItem('ggToken', '');
  //   }
  // }

  // useEffect(()=>{
  //   call_UserAPI()
  //   console.log("View in browser's developer console!");
  // }, []);

  return (
    

  <div>

    {authState ? 
        authState.isAuthenticated ?
          <AdminNavbar />:
          <NotLoggedInNavbar /> :
      <NotLoggedInNavbar />
      
    }

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
  </div>
  );
}
