import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function PrivateRoute({
  component: Component,
  ...rest
}) {
  useEffect(()=>{
    console.log(localStorage.getItem('userType'));
  })
  return (
    <Route
      {...rest}
      render={(props) =>
        (localStorage.getItem('userType') === 'user' || localStorage.getItem('userType') === 'admin') ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )

      }
    />
  );
}
