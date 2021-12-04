import React, { Component } from "react";
import './Navbar.css';
import Input from "./Input";
import NavbarUserButton from "./NavbarUserButton";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state= {
      userType: localStorage.getItem('userType')
    }
  }

  // handleSwitch = () => {
  //   if(this.state.userType === 'user'){
  //     this.setState({userType: 'admin'});
  //   } else {
  //     this.setState({userType: 'user'});
  //   }   
  // }


  // For the second part of adminNavbarOptions
  // <a href="/register" className="options-text">
  //   Register
  // </a>

  render() {
    let userType = ''
    if(window.localStorage){
      userType = localStorage.getItem('userType');
    }
    

    const adminNavbarOptions = userType === 'admin' ? 
      (
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
      :
      (
        <div className="navbar-options">
          
          <a href="/login" className="options-text">
            Login
          </a>
        </div>
      );

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

        <NavbarUserButton />
      </div>
    );
  }
}
