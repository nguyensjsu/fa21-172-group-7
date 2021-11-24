import React, {useState, useEffect} from 'react';
import './Accounts.css';
import ColumnGroupingTable from '../../components/ColumnGroupingTable';

import axios from 'axios';
import { api_host, axio_header } from '../proxy_env'

export default function Accounts() {
  // State variables
  const [example, setExample] = useState('EX');
  const [users, setUsers] = useState([]);

  // ** UNCOMMENT AFTER User API is made
  // const [rows, setRows] = useState([]);


  // Function that is called when page is changed
  useEffect(()=>{
    console.log("View in browser's developer console!");

    getUsers();

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

  useEffect(()=>{
    console.log("View in browser's developer console!");

    // ** UNCOMMENT AFTER User API is made
    // getUsers();
  }, []);


  // ** FIX AFTER User API is made
  const getUsers = async() => {
    try {
      const response = await axios.get(api_host+'/users', axio_header);
      setUsers(response.data);
      let tableRows = []
      response.data.map((user) => {
        tableRows.push({
          username: user.username,
          email: user.email,
        })
      })
      // ** UNCOMMENT AFTER User API is made
      // setRows(tableRows);
    } catch (error) {
      console.log("Couldn't get users");
    }
  }


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

  // ** DELETE AFTER User API is made
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
