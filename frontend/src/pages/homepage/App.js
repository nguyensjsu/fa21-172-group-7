import React from 'react';
import {useState, useEffect} from 'react'
import './App.css';
import axios from 'axios'
import { api_host, axio_header } from '../proxy_env'

function App() {

  const [ping, setPing] = useState("No connection to Backend, please START spring server")
  const [test, setTest] = useState(null)

  function call_SpringAPI() {
    axios.get(api_host+'/ping', axio_header).then(response=>{
      let data = response.data
      console.log('data', response);
      if (data && data.test) setPing(data.test)
      else setPing("No connection to Backend, please START spring server")
    });
  }

  function call_PostSpringAPI(){
    const variable = { title: 'Stuffs to Backend' };

    axios.post(api_host+'/ping/test', variable, axio_header).then(response=>{
      console.log(response)
      setTest(response.data)
    })
  }

  function call_UserAPI() {
    axios.get(api_host+'/user', axio_header).then(response=>{
      let data = response.data;
      console.log('user data', response);
      if(data.length <= 0) localStorage.clear()
      if(!localStorage.getItem('userType')){
        localStorage.setItem('userType', '');
        localStorage.setItem('ggToken', '');
      }
    })
  }

  useEffect(()=>{
    call_UserAPI()
    call_SpringAPI()
    call_PostSpringAPI()
  },[])

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>

        <p>
          Backend : {ping}
        </p>

        <p>
          POST Request-response : {test?`Success sending POST-request to Backend`: `Failed to send POST-request to backend`}
        </p>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

      </header>
    </div>
  );
}

export default App;
