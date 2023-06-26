import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

class Footer extends Component {
  render() {
    return (
      <div className="Footer">
        <div className="footerContainer">
          <div className="left">
            <div className="title">
              <p>members.</p>
            </div>
            <Link to="/deleteMember">Delete Account</Link>
          </div>
          <div className="middle">
            <div className="title">
              <p>us.</p>
            </div>
            <div className="descList">
            <Link to="/terms">Terms of Use</Link>
            <br />
            <Link to="/privacyPolicy">Privacy Policy</Link>
            </div>
          </div>

          <div className="right">
            <div className="title">
              <p>contact.</p>
            </div>
            <div className="descList">
              <p>coded@official.com</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
