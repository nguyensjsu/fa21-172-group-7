import React, {useState, useEffect} from 'react';
import AlertCustom from '../../components/AlertCustom';
import axios from 'axios';
import { api_host, axio_header } from '../proxy_env';
import './Login.css';
import { useHistory } from 'react-router';
import TextField from '@mui/material/TextField';

const bcrypt = require('bcryptjs');

export default function Login() {
  // State variables
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const [alertMsg, setAlertMsg]= useState('');
  const [severity, setSeverity] = useState('info');
  const history = useHistory();

  // Function that is called when page is changed
  useEffect(()=>{
  });

  const handleEmail = (e) => {
    setEmail(e.target.value);
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = async (e) => {
    let hasError = true;
    e.preventDefault();
    if(email.length > 0 && password.length > 0){
      try {
        setSeverity('info')
        setAlertMsg('Please wait. System processing...');
        setOpen(true);
        setTimeout(async ()=> {
          const payload = { email: email.toLowerCase() }
          const res = await axios.post(api_host + '/user/login', payload, axio_header);
          console.log(res);
          if(res.data.error === 'false' && res.data.attempts < '3') {
            if(bcrypt.compareSync(password, res.data.password)){
              console.log('Passwords match');
              hasError = false;
              authenticateUser(email.toLowerCase());
            } else {
              setSeverity('error');
              setAlertMsg('Invalid credentials. Try again!');
              setOpen(hasError);
              incrementAttempts(email.toLowerCase());
            }
          } else if(res.data.attempts >= '3') {
            setSeverity('error');
            setAlertMsg('Your account has been locked! Please wait for an admin to unlock it.');
            setOpen(hasError);
          } else {
            setSeverity('error');
            setAlertMsg('Invalid credentials. Try again!');
            setOpen(hasError);
          }
        }, 1100);
      } catch (error) {
        setSeverity('error');
        setAlertMsg('Backend error occurred! Check your database.');
        setOpen(hasError);
        return;
      }
    }
  }

  const incrementAttempts = async (e) => {
    const payload = {email: e};
    const res = await axios.post(api_host + '/user/login/increment', payload, axio_header);
  }

  const authenticateUser = async (e) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(e, salt);
    const payload = {email: e, token: hash};
    const res = await axios.post(api_host + '/user/login/authenticateUser', payload, axio_header);
    if(res.data.error === 'false'){
      localStorage.setItem('userType', 'user');
      localStorage.setItem('ggToken', hash);
      history.push('/');
      window.location.reload();
    }
  }

  return(
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
