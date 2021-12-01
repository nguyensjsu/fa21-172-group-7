import React, { Component } from "react";
import "./Footer.css";

function Footer() {
  return (
    <div className="main-footer">
      <div className="container">
        <div className="row">
          {/* Column1 */}
          <div className="column">
            <h2>CMPE 172 Group 7</h2>
            <h4 className="list-unstyled">
              <li>Thai Quach</li>
              <li>Shana Nguyen</li>
              <li>Justin Zhu</li>
              <li>Isla Shi</li>
            </h4>
          </div>
        </div>
        <hr />
        <div className="row">
          <p className="col-sm">
            &copy;{new Date().getFullYear()} Group 7 | All rights reserved |
            Terms Of Service | Privacy
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;