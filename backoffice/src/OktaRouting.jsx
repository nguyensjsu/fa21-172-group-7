import React from 'react';
import { Route } from 'react-router-dom';
import { useHistory } from 'react-router-dom';


import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';

// Pages
import App from './pages/homepage/App';
import HomePage from './pages/homepage/Homepage';
import Inventory from './pages/inventory/Inventory';
import Transactions from './pages/transactions/Transactions';
import Accounts from './pages/accounts/Accounts';
import Error from './pages/error/Error';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Logout from './pages/Logout';
import Help from './pages/helpAdmin/Help';

const OktaRouting = () => {
  const history = useHistory();
  const onAuthRequired = () => {
    history.push('/login');
  };

  const oktaAuth = new OktaAuth({
    issuer: 'https://dev-75891639.okta.com',
    clientId: '0oa2xuubevEusmTBg5d7',
    redirectUri: window.location.origin + '/login/callback',
    onAuthRequired: onAuthRequired,
    pkce: true
  });

  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri || '/', window.location.origin))
  };

  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      <Route path='/' exact={true} component={HomePage} />
      <SecureRoute path='/inventory' component={Inventory} />
      <SecureRoute path='/transactions' component={Transactions} />
      <SecureRoute path='/accounts' component={Accounts} />
      <Route path='/login' render={() => <Login />} />
      <Route path='/login/callback' component={LoginCallback} />
    </Security>
  );
};
export default OktaRouting;
