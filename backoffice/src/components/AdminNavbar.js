import React, { Component } from "react";
import './Navbar.css';
import Input from "./Input";
import NavbarUserButton from "./NavbarUserButton";

import { useOktaAuth } from '@okta/okta-react';

export default function AdminNavbar(props) {
  // State variables
  // const { authState } = useOktaAuth();



  const adminNavbarOptions = (
    <div className="navbar-options">
      <a href="/inventory" className="options-text">
        Inventory
      </a>
      <a href="/transactions" className="options-text">
        Transactions
      </a>
      <a href="/accounts" className="options-text">
        Accounts
      </a>
      <a href="/help" className="options-text">
        Help
      </a>
      <a href="/logout" className="options-text">
        Log Out
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

      {adminNavbarOptions}

    </div>
  )

}





