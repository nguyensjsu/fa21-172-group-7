import React, {useState, useEffect} from 'react';
import AlertCustom from '../../components/AlertCustom';
import axios from 'axios';
import { api_host, axio_header } from '../proxy_env';
import './Login.css';
import { useHistory } from 'react-router';
import TextField from '@mui/material/TextField';

import {
    Routes,
    Route ,
    Redirect
  } from "react-router-dom";

import { useOktaAuth } from '@okta/okta-react';

const bcrypt = require('bcryptjs');

export default function Login() {
  // State variables
  const { oktaAuth } = useOktaAuth();
  const [sessionToken, setSessionToken] = useState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const [alertMsg, setAlertMsg]= useState('');
  const [severity, setSeverity] = useState('info');
  const history = useHistory();

  const { authState } = useOktaAuth();

  // Function that is called when page is changed
  useEffect(()=>{
  });


  const handleEmail = (e) => {
    setEmail(e.target.value);
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);
  }


  const handleSubmit = (e) => {
    e.preventDefault();

    oktaAuth.signInWithCredentials({ email, password })
    .then(res => {
      const sessionToken = res.sessionToken;
      setSessionToken(sessionToken);
      oktaAuth.signInWithRedirect({ sessionToken });
    })
    .catch(err => console.log('Okta Sign In Error: ', err));
  };


  return(
    authState.isAuthenticated ?

    <Redirect to={{ pathname: '/' }}/> :
    
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
        <div className='not-member'>
          Not a member? <a href='/register'>Register now!</a>
        </div>
      </div>
    </div>
  );
}
