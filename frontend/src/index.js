import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './homepage/App';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom' //import routing

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={App} />
    </div>
  </Router>
)

ReactDOM.render(
  routing,
  document.getElementById('root')
);
