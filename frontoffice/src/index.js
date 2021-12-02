import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer.js';

// Route Types
import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';
import AdminRoute from './routes/AdminRoute';

// Pages
import App from './pages/homepage/App';
import Browse from './pages/browse/Browse';
import Payments from './pages/payments/Payments';
import HomePage from './pages/homepage/Homepage';
import Error from './pages/error/Error';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Logout from './pages/Logout';

//User: register, login, browse, payments
//Admin: inventory, transactions, accounts

const routing = (
  <Router>
    <div>
      <Navbar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/ping" component={App} />
        <Route exact path="/browse" component={Browse} />
        <PrivateRoute exact path="/payments" component={Payments} />
        <Route exact path="/error" component={Error} />
        <PublicRoute exact path="/register" component={Register} />
        <PublicRoute exact path="/login" component={Login} />
        <PrivateRoute exact path="/logout" component={Logout} />
      </Switch>
      <Footer />
    </div>
  </Router>
)

ReactDOM.render(
  routing,
  document.getElementById('root')
);
