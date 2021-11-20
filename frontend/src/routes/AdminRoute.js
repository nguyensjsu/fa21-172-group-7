import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function AdminRoute({
  component: Component,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) => // TO-DO: replace '' with 'admin'
        localStorage.getItem('userType') === '' ? (
          <Component {...props} />
        ) : (
          <Redirect to="/error" />
        )
      }
    />
  );
}
