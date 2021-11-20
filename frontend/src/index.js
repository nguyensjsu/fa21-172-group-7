import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Route, Link, Switch, BrowserRouter as Router } from 'react-router-dom';
// import PrivateRoute from './routes/PrivateRoute';
// import AdminRoute from './routes/AdminRoute';
import Navbar from './components/Navbar';

// Pages
import App from './pages/homepage/App';
import Browse from './pages/browse/Browse';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Payments from './pages/payments/Payments';
import Inventory from './pages/inventory/Inventory';
import Transactions from './pages/transactions/Transactions';
import Accounts from './pages/accounts/Accounts';

//User: register, login, browse, payments
//Admin: inventory, transactions, accounts

const routing = (
  <Router>
    <div>
      <Navbar />
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/browse" component={Browse} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/payments" component={Payments} />
        <Route exact path="/inventory" component={Inventory} />
        <Route exact path="/transactions" component={Transactions} />
        <Route exact path="/accounts" component={Accounts} />
      </Switch>
    </div>
  </Router>
)

ReactDOM.render(
  routing,
  document.getElementById('root')
);
