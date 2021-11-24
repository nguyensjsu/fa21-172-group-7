import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function PublicRoute({
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
        localStorage.getItem('userType') === '' ? (
          <Component {...props} />
        ) : (
          <Redirect to="/error" />
        )
      }
    />
  );
}
