import React, { useEffect } from 'react';
import { useHistory } from 'react-router';

import { useOktaAuth } from '@okta/okta-react';

export default function Logout() {
  const { authState, oktaAuth } = useOktaAuth();
  const history = useHistory();

  useEffect(()=>{
    // if(localStorage.getItem('userType') === 'user' || localStorage.getItem('userType') === 'admin') {
    //   localStorage.setItem('userType', '');
    //   localStorage.setItem('ggToken', '');
    //   history.push('/');
    //   window.location.reload();
    // }
    console.log("AUTH STATE = ", authState);

    setTimeout(async ()=>{
      if(authState !== null) {
        if(authState.isAuthenticated) {
          // localStorage.setItem('userType', '');
          console.log("admin signing out")
          await oktaAuth.signOut();
          // history.push('/');
          // window.location.reload();
        }
      }
    },3000);
    

  });

  const style = { textAlign: 'center', margin: '5%', minHeight: '100vh'}

  return (
    authState ? 
    (
      authState.isAuthenticated ?
      ( <h1 style={style}>Logging out ...</h1> ):

      <h1 style={style}>You aren't logged in, so you can't log out!</h1>
    ) :
    <h1 style={style}>Logging out ...</h1>
  );
}
