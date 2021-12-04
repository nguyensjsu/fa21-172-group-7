import React, { Component } from "react";
import './Navbar.css';
import Input from "./Input";
import NavbarUserButton from "./NavbarUserButton";

import { useOktaAuth } from '@okta/okta-react';

export default function NotLoggedInNavbar() {

  const notLoginOptions = (
    <div className="navbar-options">
      <a href="/login" className="options-text">
        Login
      </a>
    </div>
  )


  return (
    <div className="navbar-container">
      <div className="navbar-logo">
        <a href="/" className="options-text">
          GameGo
        </a>
      </div>
      <Input
        type="navbar-search"
        placeholder="Search"
      />

      {notLoginOptions}

    </div>
      
  )

}





