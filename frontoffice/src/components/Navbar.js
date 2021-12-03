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

  handleSwitch = () => {
    if(this.state.userType === 'user'){
      this.setState({userType: 'admin'});
    } else {
      this.setState({userType: 'user'});
    }   
  }

  render() {
    let userType = ''
    if(window.localStorage){
      userType = localStorage.getItem('userType');
    }
    const userNavbarOptions = userType === '' ?
      (
        <div className="navbar-options">
          <a href="/browse" className="options-text">
            Browse
          </a>
          <a href="/Payments" className="options-text">
            Payments
          </a>
          <a href="/help" className="options-text">
            Help
          </a>
          <a href="/register" className="options-text">
            Register
          </a>
          <a href="/login" className="options-text">
            Login
          </a>
        </div>
      )
      :
      (
        <div className="navbar-options">
          <a href="/browse" className="options-text">
            Browse
          </a>
          <a href="/Payments" className="options-text">
            Payments
          </a>
          <a href="/help" className="options-text">
            Help
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
        { 
          userNavbarOptions
        }
        <NavbarUserButton />
      </div>
    );
  }
}
