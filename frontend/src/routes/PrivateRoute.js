import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function PrivateRoute({
  component: Component,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) => // TO-DO: replace '' with 'user'
        localStorage.getItem('userType') === '' ? (
          <Component {...props} />
        ) : (
          <Redirect to="/error" />
        )
      }
    />
  );
}
