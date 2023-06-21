import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

class Footer extends Component {
  render() {
    return (
      <div className="Footer">
        <div className="footerContainer">
            <div className="left">
              <Link>
                <p>회원 탈퇴</p>
              </Link>
            </div>
            <div className="middle">
              <div className="title">
                <p>소개 및 약관 내용</p>
              </div>
              <div className="descList">
                <Link>
                  <p>소개</p>
                </Link>
                <Link>
                  <p>이용 약관</p>
                </Link>
                <Link>
                  <p>개인정보 취급방침</p>
                </Link>
              </div>
            </div>

          <div className="right">
            <p>
              © 2023 CODED 
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
