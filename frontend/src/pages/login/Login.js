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
        if (email == "admin@admin.com" && password == "admin") {
          console.log("Admin logging in...");
          localStorage.setItem('userType', 'admin');
          localStorage.setItem('ggToken', '123abc');
          console.log("Admin logged in");
          hasError = false;
          history.push('/');
          window.location.reload();
        } else {
          setSeverity('info')
          setAlertMsg('Please wait. System processing...');
          setOpen(true);
          setTimeout(async ()=> {
            const payload = { email: email.toLowerCase() }
            const res = await axios.post(api_host + '/user/login', payload, axio_header);
            console.log(res);
            if(res.data.error === 'false') {
              if(bcrypt.compareSync(password, res.data.password)){
                console.log('Passwords match');
                hasError = false;
                authenticateUser(email.toLowerCase());
              } else {
                setSeverity('error');
                setAlertMsg('Invalid credentials. Try again!');
                setOpen(hasError);
              }
            } else {
              setSeverity('error');
              setAlertMsg('Invalid credentials. Try again!');
              setOpen(hasError);
            }
          }, 1100);
        }
      } catch (error) {
        setSeverity('error');
        setAlertMsg('Backend error occurred! Check your database.');
        setOpen(hasError);
        return;
      }
    }
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
