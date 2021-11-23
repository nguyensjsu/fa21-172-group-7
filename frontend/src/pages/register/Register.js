import React, {useState, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import AlertCustom from '../../components/AlertCustom';
import axios from 'axios';
import { api_host, axio_header } from '../proxy_env';
import './Register.css';
import { useHistory } from 'react-router';

const bcrypt = require('bcryptjs');

import { TextField, Box, Button, Modal, Typography } from '@mui/material'

export default function Register() {
  // State variables
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailHelper, setEmailHelper] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordHelper, setPasswordHelper] = useState('');
  const [open, setOpen] = useState(false);
  const [alertMsg, setAlertMsg]= useState('');
  const [severity, setSeverity] = useState('info');
  const history = useHistory();

  // Function that is called when page is changed
  useEffect(()=>{
    console.log("View in browser's developer console!");
  });

  const emailRegex = (e) => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(e);
  }

  const validInputs = () => {
    let valid = true;
    if(!emailRegex(email)){
      setEmailError(true);
      setEmailHelper('Email is invalid!')
      valid = false;
    }
    if(password.length <= 0) {
      setPasswordError(true);
      setPasswordHelper('Password is invalid!')
      valid = false;
    }
    return valid;
  }

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailError(false);
    setEmailHelper('');
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setPasswordError(false);
    setPasswordHelper('');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validInputs()) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      const payload = {
        email, password: hash
      }
      try {
        setSeverity('info')
        setAlertMsg('Please wait. System processing...');
        setOpen(true);
        setTimeout(async ()=>{
          const res = await axios.post(api_host + '/user/register', payload, axio_header);
          console.log('here', res)
          if(res.data.error === 'false'){ 
            console.log('here')
            history.push('/login');
            window.location.reload();
          }
        }, 1100);
      } catch (error) {
        setSeverity('error')
        setAlertMsg('Backend error occurred! Check your database.');
        setOpen(true);
        return;
      }
    }
  }

  return(
    <div className='Register'>
      <div className='register-container'>
        <div className='register-label'>
          Register Form
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
            error={emailError}
            label={'Email Address'}
            helperText={emailHelper ? emailHelper : ''}
            onChange={handleEmail}
          />
          <div className='spacer'/>
          <TextField
            style={{width: '100%', fontSize: '16px'}}
            id="outlined-password-input"
            type='password'
            error={passwordError}
            label='Password'
            helperText={passwordHelper ? passwordHelper : ''}
            onChange={handlePassword}
          />
          <button className='register-btn' onClick={handleSubmit}>Register</button>
        </form>
        <div className='not-member'>
          Already a member? <a href='/login'>Sign in.</a>
        </div>
      </div>
    </div>
  );
}
