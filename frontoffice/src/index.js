import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';

// Route Types
import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';
import AdminRoute from './routes/AdminRoute';

// Pages
import App from './pages/homepage/App';
import Browse from './pages/browse/Browse';
import Payments from './pages/payments/Payments';
import Inventory from './pages/inventory/Inventory';
import Transactions from './pages/transactions/Transactions';
import Accounts from './pages/accounts/Accounts';
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
        <PublicRoute exact path="/" component={Login} />

        <Route exact path="/ping" component={App} />
        <Route exact path="/browse" component={Browse} />
        <PrivateRoute exact path="/payments" component={Payments} />
        <Route exact path="/error" component={Error} />
        <PublicRoute exact path="/register" component={Register} />
        
        <PrivateRoute exact path="/logout" component={Logout} />
      </Switch>
    </div>
  </Router>
)

ReactDOM.render(
  routing,
  document.getElementById('root')
);
