import React, {useState, useEffect} from 'react';
import './Help.css';
import ColumnGroupingTable from '../../components/ColumnGroupingTable';
import Button from '@mui/material/Button';
import axios from 'axios';
import { api_host, axio_header } from '../proxy_env'

export default function Help() {
  const [requests, setRequests] = useState([]);

  const [rows, setRows] = useState([]);


  useEffect(()=>{
    console.log("View in browser's developer console!");
    getRequests();
  }, []);

  const getRequests = async() => {
    try {
      const response = await axios.get(api_host+'/help', axio_header);
      setRequests(response.data);
      let tableRows = []
      response.data.map((request) => {
        console.log(request);
        const button = 
          <Button
            variant="contained"
            onClick={()=>{removeRequest(request.id)}}
          >
            Remove
          </Button>
        tableRows.push({
          name: request.name,
          email: request.email,
          message: request.message,
          remove: button
        })
      })
      setRows(tableRows);
    } catch (error) {
      console.log("Couldn't get requests");
    }
  }

  const removeRequest = async (e) => {
    console.log('e', e);
    const payload = {id: e};
    const res = await axios.post(api_host + '/help/delete', payload, axio_header);
    console.log(res);
    if(res.data.error === 'false') {
      getRequests();
    }
  }


  const columns = [
    {
      id: 'name',
      label: 'Name',
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
      id: 'message',
      label: 'Message',
      minWidth: 170,
      align: 'center',
    },
    {
      id: 'remove',
      label: 'A Cool Button',
      minWidth: 170,
      align: 'center',
    },
  ]

  return(
    <div className='Accounts'>
      <h1>Help</h1>
      <ColumnGroupingTable columns={columns} rows={rows} title="User Help Requests" />
    </div>
  );
}
