import React, { Component } from "react";
import "./Footer.css";

function Footer() {
  return (
    <div className="main-footer" >
      <div className="container">
        <div className="row">
          {/* Column1 */}
          <div className="column" style={{padding: '16px'}}>
            <h4>CMPE 172 Group 7</h4>
            <h4 className="list-unstyled">
              <li><a href="https://github.com/ThaiQ">Thai Quach</a></li>
              <li><a href="https://github.com/nguyenshana">Shana Nguyen</a></li>
              <li><a href="https://github.com/justin-zhu1018">Justin Zhu</a></li>
              <li><a href="https://github.com/islayshi">Isla Shi</a></li>
            </h4>
          </div>
        </div>
        <hr />
        <div className="row">
          <p className="col-sm" style={{marginBottom: '0px', padding: '16px', paddingTop: '0'}}>
            &copy;{new Date().getFullYear()} Group 7 | All rights reserved |
            Terms Of Service | Privacy
          </p>
        </div>
      </div>
      
    </div>
  );
}

export default Footer;