import React, { Component, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Footer.scss';
import { useSelector } from 'react-redux';

class Footer extends Component {
  render() {
    
    // const [isLogintrue,setIsLogintrue] =useState(false);
    // const navigate = useNavigate();
    // const accessToken = useSelector((state) => state.member.access);
    // const checkToken = () => {
    //  if (accessToken) {
    //   axios({
    //     method: 'get',
    //     url: '/deleteAccount',
    //     headers: {
    //       Authorization: `Bearer ${accessToken}`,
    //     },
    //     params: {
    //       commentId: commentInfo.feedCommentId,
    //     },
    //   })
    //     .then((response) => {
    //       setIsLike(response.data);
    //     })
    //     .catch((error) => {
    //       if (error.request.status === 400) {
    //         console.log('Login First!');
    //       } else {
    //         console.log(error);
    //       }
    //     });
    // }

    return (
      <div className="Footer">
        <div className="footerContainer">
          <div className="left">
            <div className="title">
              <p>members.</p>
            </div>
            <div className="descList">
              <div className="deleteAccountWrapper">
             Delete Account
              </div>
            </div>
          </div>
          <div className="middle">
            <div className="title">
              <p>us.</p>
            </div>
            <div className="descList">
              <Link to="/terms">Terms of Use</Link>
            </div>
            <div className="descList">
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