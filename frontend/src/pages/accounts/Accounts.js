import React, {useState, useEffect} from 'react';
import './Accounts.css';
import ColumnGroupingTable from '../../components/ColumnGroupingTable';

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
        tableRows.push({
          email: user.email,
        })
      })
      setRows(tableRows);
    } catch (error) {
      console.log("Couldn't get users");
    }
  }


  const columns = [
    {
      id: 'email',
      label: 'Email',
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
