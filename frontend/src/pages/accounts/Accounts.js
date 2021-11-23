import React, {useState, useEffect} from 'react';
import './Accounts.css';
import ColumnGroupingTable from '../../components/ColumnGroupingTable';

import axios from 'axios';
import { api_host, axio_header } from '../proxy_env'

export default function Accounts() {
  // State variables
  const [example, setExample] = useState('EX');
  const [accounts, setAccounts] = useState('EX');

  // Function that is called when page is changed
  useEffect(()=>{
    console.log("View in browser's developer console!");

    // const dbAccounts = axios.get(api_host+'/getUsers', axio_header).then(response=>{
    //   accounts = response.data
    //   console.log('data', response);
    // });

    // dbAccounts.forEach( (acct) => {
    //   rows.push({
    //     username: acct.getUsername(), 
    //     email: acct.getEmail() 
    //   })
    // })

  });

  const columns = [
    {
      id: 'username',
      label: 'Username',
      minWidth: 170,
      align: 'center',
    },
    {
      id: 'email',
      label: 'Email',
      minWidth: 170,
      align: 'center',
    },
  ]

  const rows = [
    {
      username:"userone",
      email:"emailone@gmail.com"
    },
    {
      username:"usertwo",
      email:"emailtwo@gmail.com"
    },
    {
      username:"usertwo",
      email:"emailtwo@gmail.com"
    },
  ]

  return(
    <div className='Accounts'>
      <h1>Accounts</h1>
        <ColumnGroupingTable columns={columns} rows={rows} title="GameGo Accounts" />
    </div>
  );
}
