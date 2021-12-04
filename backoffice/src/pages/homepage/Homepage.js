import React, {useEffect} from "react";
import './Homepage.css'

import AdminNavbar from '../../components/AdminNavbar';
import NotLoggedInNavbar from '../../components/NotLoggedInNavbar';

import { useOktaAuth } from '@okta/okta-react';

export default function HomePage() {

  const { authState } = useOktaAuth();

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
