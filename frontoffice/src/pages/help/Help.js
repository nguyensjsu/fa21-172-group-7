import React, {useState, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import AlertCustom from '../../components/AlertCustom';
import axios from 'axios';
import { api_host, axio_header } from '../proxy_env';
import './Help.css';
import { useHistory } from 'react-router';

export default function Help() {
  // State variables
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);
  const [nameHelper, setNameHelper] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailHelper, setEmailHelper] = useState('');
  const [message, setMessage] = useState('');
  const [messageError, setMessageError] = useState(false);
  const [messageHelper, setMessageHelper] = useState('');
  const [open, setOpen] = useState(false);
  const [alertMsg, setAlertMsg]= useState('');
  const [severity, setSeverity] = useState('info');
  const history = useHistory();

  // Function that is called when page is changed
  useEffect(()=>{
  });

  const emailRegex = (e) => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(e);
  }

  const validInputs = () => {
    let valid = true;
    if(name.length === 0) {
      setNameError(true);
      setNameHelper('Name is empty!');
      valid = false;
    }
    if(!emailRegex(email)){
      setEmailError(true);
      setEmailHelper('Email is invalid!')
      valid = false;
    }
    if(message.length === 0) {
      setMessageError(true);
      setMessageHelper('Message is empty!');
      valid = false;
    }
    return valid;
  }

  const handleName = (e) => {
    setName(e.target.value);
    setNameError(false);
    setNameHelper('');
  }

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailError(false);
    setEmailHelper('');
  }

  const handleMessage = (e) => {
    setMessage(e.target.value);
    setMessageError(false);
    setMessageHelper('');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validInputs()) {
      setSeverity('error')
      setAlertMsg('Please check your inputs!');
      setOpen(true);
      return;
    }
    const payload = { name, email, message };
    const res = await axios.post(api_host + '/help/send', payload, axio_header);
    console.log('here', res);
    if(res.data.error === 'false') {
      setSeverity('success')
      setAlertMsg('Message sent!');
      setOpen(true);
      setTimeout(()=>{
        history.push('/');
      }, 1100);
    }
  }

  const sub =
    "If you need assistance, use this form to contact an admin! Please leave your name and email for us to get back to you."

  return(
    <div className='Help'>
      <div className='help-container'>
        <div className='help-label'>
          Help Form
          <div style={{padding:"5px"}}/>
          <div className = "help-sub">
            {sub}
          </div>
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
            style={{width: '100%', fontSize: '16px'}}
            error={nameError}
            label='Name'
            helperText={nameHelper ? nameHelper : ''}
            onChange={handleName}
          />
          <div className='spacer'/>
          <TextField
            style={{width: '100%'}}
            error={emailError}
            label={'Email Address'}
            helperText={emailHelper ? emailHelper : ''}
            onChange={handleEmail}
          />
          <div className='spacer'/>
          <TextField
            id="outlined-multiline-static"
            style={{width: '100%', fontSize: '16px'}}
            error={messageError}
            label='Message'
            helperText={messageHelper ? messageHelper : ''}
            onChange={handleMessage}
            rows={3}
            multiline
          />
          <button className='help-btn' onClick={handleSubmit}>Send Help</button>
        </form>
      </div>
    </div>
  );
}
