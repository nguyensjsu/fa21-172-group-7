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
    })
  }

  function call_PostSpringAPI(){

    const variable = { title: 'Stuffs to Backend' };

    axios.post('http://localhost:8080/ping/test', variable).then(response=>{
      console.log(response)
      setTest(response.data)
    })
  }

  useEffect(()=>{
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
