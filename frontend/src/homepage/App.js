import React from 'react';
import {useState, useEffect} from 'react'
import './App.css';
import axios from 'axios'

function App() {

  const [ping, setPing] = useState("No connection to Backend, please START spring server")
  const [test, setTest] = useState(null)

  function call_SpringAPI(){
    axios.get('http://localhost:8080/ping').then(response=>{
      let data = response.data
      if (data && data.test) setPing(data.test)
      else setPing("No connection to Backend, please START spring server")
    });
  }

  function call_PostSpringAPI(){

    const variable = { title: 'Stuffs to Backend' };

    axios.post('http://localhost:8080/ping/test', variable).then(response=>{
      console.log(response)
      setTest(response.data)
    })
  }

  function call_SpringAPI_Kong() {
    axios.get('http://localhost/api/ping', {headers: {apikey: '2H3fONTa8ugl1IcVS7CjLPnPIS2Hp9dJ'}}).then(response=>{
      let data = response.data
      console.log('data', response);
      if (data && data.test) setPing(data.test)
      else setPing("No connection to Backend, please START spring server")
    });
  }

  function call_PostSpringAPI_Kong(){

    const variable = { title: 'Stuffs to Backend' };

    axios.post('http://localhost/api/ping/test', variable, {headers: {apikey: '2H3fONTa8ugl1IcVS7CjLPnPIS2Hp9dJ'}}).then(response=>{
      console.log(response)
      setTest(response.data)
    })
  }

  useEffect(()=>{
    // For non-Docker
    // call_SpringAPI()
    // call_PostSpringAPI()

    // For when Kong is being used (Give it 20 seconds to receive a response)
    call_SpringAPI_Kong();
    call_PostSpringAPI_Kong();
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
