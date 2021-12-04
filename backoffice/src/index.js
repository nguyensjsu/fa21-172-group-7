import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Footer from './components/Footer';

// Pages
import OktaRouting from './OktaRouting';


const routing = (
  <Router>
    <div>
      <OktaRouting />
      <Footer />
    </div>
  </Router>
)

ReactDOM.render(
  routing,
  document.getElementById('root')
);
