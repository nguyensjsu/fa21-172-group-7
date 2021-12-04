import React, {useState, useEffect} from 'react';
import AlertCustom from '../../components/AlertCustom';
import axios from 'axios';
import { api_host, axio_header } from '../proxy_env';
import './Login.css';
import { useHistory } from 'react-router';
import TextField from '@mui/material/TextField';

import { useOktaAuth } from '@okta/okta-react';


import {
    Routes,
    Route ,
    Redirect
  } from "react-router-dom";


const bcrypt = require('bcryptjs');

export default function LoginForm() {
  // State variables
  const { oktaAuth } = useOktaAuth();
  const [sessionToken, setSessionToken] = useState();
  // username is the same as the email
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const [alertMsg, setAlertMsg]= useState('');
  const [severity, setSeverity] = useState('info');
  const history = useHistory();

  // Function that is called when page is changed
  useEffect(()=>{
  });


  const handleEmail = (e) => {
    setUsername(e.target.value);
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);
  }


  const handleSubmit = (e) => {
    e.preventDefault();

    setSeverity('info')
    setAlertMsg('Please wait. System processing...');
    oktaAuth.signInWithCredentials({ username, password })
    .then(res => {
      const sessionToken = res.sessionToken;
      setSessionToken(sessionToken);
      oktaAuth.signInWithRedirect({ sessionToken });
      // localStorage.setItem('userType', 'admin');
      history.push('/');
    })
    .catch(err => {
      console.log('Okta Sign In Error: ', err)
      setSeverity('error');
      setAlertMsg('Invalid credentials. Try again!');
      setOpen(true);
    });
  };


  return (
  	<div className='Login'>
      <div className='login-container'>
        <div className='login-label'>
          Login Form
        </div>
        <AlertCustom
          style={{marginBottom: '16px'}}
          open={open}
          setOpen={setOpen}
          severity={severity}
          message={alertMsg}
        />
        <form onSubmit={handleSubmit}>
          <TextField
            style={{width: '100%'}}
            label={'Email Address'}
            onChange={handleEmail}
          />
          <div className='spacer'/>
          <TextField
            style={{width: '100%'}}
            label={'Password'}
            id="outlined-password-input"
            type='password'
            onChange={handlePassword}
          />
          <button className='login-btn' onClick={handleSubmit}>Login</button>
        </form>
      </div>
    </div>
  )
}
