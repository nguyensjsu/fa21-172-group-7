import React, {useState, useEffect} from 'react';
import './Transactions.css';

import ColumnGroupingTable from '../../components/ColumnGroupingTable';

import axios from 'axios';
import { api_host, axio_header } from '../proxy_env'

export default function Transactions() {
  // State variables
  const [payments, setPayments] = useState('EX');
  const [rows, setRows] = useState([]);

  // Function that is called when page is changed
  useEffect(()=>{
    console.log("View in browser's developer console!");

    // const dbPayments = axios.get(api_host+'/payments', axio_header).then(response=>{
    //   games = response.data
    //   console.log('data', response);
    // });

    // dbPayments.forEach( (payment) => {
    //   rows.push({
    //     firstname: payment.getFirstname(), 
    //     lastname: payment.getLastname(), 
    //     email: payment.getEmail(), 
    //     amount: payment.getAmount() 
    //   })
    // })

  });

  useEffect(()=>{
    console.log("View in browser's developer console!");
    getPayments();
  }, []);


  const getPayments = async() => {
    try {
      const response = await axios.get(api_host+'/payments', axio_header);
      setPayments(response.data);
      let tableRows = []
      response.data.map((payment) => {
        tableRows.push({
          firstname: payment.firstname,
          lastname: payment.lastname,
          email: payment.email,
          amount: payment.amount
        })
      })
      setRows(tableRows);
    } catch (error) {
      console.log("Couldn't fetch payments :(");
    }
  }


  // Add game to Payments
  const columns = [
    {
      id: 'firstname',
      label: 'First Name',
      minWidth: 170,
      align: 'center',
    },
    {
      id: 'lastname',
      label: 'Last Name',
      minWidth: 170,
      align: 'center',
    },
    {
      id: 'email',
      label: 'Email',
      minWidth: 170,
      align: 'center',
    },
    {
      id: 'amount',
      label: 'Amount',
      minWidth: 170,
      align: 'center',
    },
  ]

  // const rows = [
  //   {
  //     firstname: 'Bob',
  //     lastname: 'Dylan',
  //     email: 'bobd@gmail.com',
  //     amount: '55',
  //   },
  //   {
  //     firstname: 'Duke',
  //     lastname: 'Ellington',
  //     email: 'dukee@gmail.com',
  //     amount: '30',
  //   },
  // ]

  return(
    <div className='Transactions'>
      <h1>Transactions</h1>
      <ColumnGroupingTable columns={columns} rows={rows} title="GameGo Transactions" />
    </div>
  );
}
