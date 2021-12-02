import React, {useState, useEffect} from 'react';
import './Accounts.css';
import ColumnGroupingTable from '../../components/ColumnGroupingTable';
import Button from '@mui/material/Button';
import axios from 'axios';
import { api_host, axio_header } from '../proxy_env'

export default function Accounts() {
  // State variables
  const [example, setExample] = useState('EX');
  const [users, setUsers] = useState([]);

  const [rows, setRows] = useState([]);


  useEffect(()=>{
    console.log("View in browser's developer console!");
    getUsers();
  }, []);

  const getUsers = async() => {
    try {
      const response = await axios.get(api_host+'/user', axio_header);
      setUsers(response.data);
      let tableRows = []
      response.data.map((user) => {
        console.log(user);
        const button = 
          <Button
            variant="contained"
            onClick={()=>{unlockUser(user.email)}}
            disabled={user.attempts < 1 ? true : false}
          >
            Unlock
          </Button>
        tableRows.push({
          email: user.email,
          attempts: user.attempts,
          unlock: button
        })
      })
      setRows(tableRows);
    } catch (error) {
      console.log("Couldn't get users");
    }
  }

  const unlockUser = async (e) => {
    const payload = {email: e};
    const res = await axios.post(api_host + '/user/login/unlock', payload, axio_header);
    console.log(res);
    if(res.data.error === 'false') {
      window.location.reload();
    }
  }


  const columns = [
    {
      id: 'email',
      label: 'Email',
      minWidth: 170,
      align: 'center',
    },
    {
      id: 'attempts',
      label: 'Attempts',
      minWidth: 170,
      align: 'center',
    },
    {
      id: 'unlock',
      label: 'A Cool Button',
      minWidth: 170,
      align: 'center',
    },
  ]


  return(
    <div className='Accounts'>
      <h1>Accounts</h1>
        <ColumnGroupingTable columns={columns} rows={rows} title="GameGo Accounts" />
    </div>
  );
}
