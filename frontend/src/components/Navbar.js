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
    const userNavbarOptions = (
      <div className="navbar-options">
        <a href="/browse" className="options-text">
          Browse
        </a>
        <a href="/Payments" className="options-text">
          Payments
        </a>
        <a href="/register" className="options-text">
          Register
        </a>
        <a href="/login" className="options-text">
          Login
        </a>
      </div>
    );

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
        <a href="/register" className="options-text">
          Register
        </a>
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
          placeholder="Search (We can remove this later if needed)"
        />
        <button onClick={this.handleSwitch}>
          Switch Navbars
        </button>
        { this.state.userType === 'admin'
          ? adminNavbarOptions 
          : userNavbarOptions
        }
        <NavbarUserButton />
      </div>
    );
  }
}
