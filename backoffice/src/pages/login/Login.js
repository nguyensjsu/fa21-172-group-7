import React, {useState, useEffect} from 'react';
import AlertCustom from '../../components/AlertCustom';
import axios from 'axios';
import { api_host, axio_header } from '../proxy_env';
import './Login.css';
import { useHistory } from 'react-router';
import TextField from '@mui/material/TextField';

import AdminNavbar from '../../components/AdminNavbar';
import NotLoggedInNavbar from '../../components/NotLoggedInNavbar';

import { useOktaAuth } from '@okta/okta-react';

import LoginForm from './LoginForm'

import {
    Routes,
    Route ,
    Redirect
  } from "react-router-dom";


const bcrypt = require('bcryptjs');

export default function Login() {
  // State variables
  // const { oktaAuth } = useOktaAuth();
  const { authState } = useOktaAuth();
  const [sessionToken, setSessionToken] = useState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const [alertMsg, setAlertMsg]= useState('');
  const [severity, setSeverity] = useState('info');
  const history = useHistory();

  // Function that is called when page is changed
  useEffect(()=>{
    console.log("AUTH STATE = ", authState);
    // console.log("OKTA AUTH = ", oktaAuth);
  }, []);


  const style = { textAlign: 'center', margin: '5%' }


  return (
    authState ? 
    (
      authState.isAuthenticated ?
       <div>
          <AdminNavbar />
          <h1 style={style}>You are logged in!</h1>
        </div> 
      :
      <div>
        <NotLoggedInNavbar />
        <LoginForm />
      </div>
    ) :

    <div>
      <NotLoggedInNavbar />
      <LoginForm />
    </div>
  )
}
