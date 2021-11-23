import React, { useEffect } from 'react';
import { useHistory } from 'react-router';

export default function Logout(props) {
  const history = useHistory();

  useEffect(()=>{
    if(localStorage.getItem('userType') === ('user' || 'admin')) {
      localStorage.setItem('userType', '');
      localStorage.setItem('ggToken', '');
      history.push('/');
      window.location.reload();
    }
  });

  return(
    <></>
  );
}
