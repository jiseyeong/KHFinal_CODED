import React, { Component } from 'react';
import './NavbarWeekly.scss';
import { withRouter, Link } from 'react-router-dom';

class NavbarWeekly extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOotdBorder: false,
      isWeeklyBorder: true,
      isHomeBorder: true,
    };
  }

  handleClickOotd = (e) => {
    this.setState({
      isOotdBorder: true,
      isWeeklyBorder: false,
    });
    e.preventDefault();
    this.props.history.push('/ootd');
  };

  handleClickWeekly = (e) => {
    this.setState({
      isOotdBorder: false,
      isWeeklyBorder: true,
    });
    e.preventDefault();
    this.props.history.push('/weekly');
  };

  render() {
    const { isOotdBorder, isWeeklyBorder, isHomeBorder } = this.state;
    return (
      <>
        <div className="navBarWrapper">
          <nav className="topNavBar">
            <div className="leftNavBar">
              <a className="navLogo" href="/">
                <img src="/images/navLogo.png" />
                // 로고 사진 이미지
              </a>
              <div className="leftMenuWrapper">
                <ul className="leftMenuList">
                  <li value="feed" className="leftMenu">
                    <span
                      className={
                        isOotdBorder ? 'leftMenuOotdAct' : 'leftMenuOotd'
                      }
                      onClick={this.handleClickOotd}
                    >
                      #OOTD
                    </span>
                  </li>
                  <li value="feed" className="leftMenu">
                    <span
                      className={
                        isWeeklyBorder ? 'leftMenuWeeklyAct' : 'leftMenuWeekly'
                      }
                      onClick={this.handleClickWeekly}
                    >
                      WEEKLY
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="rightNavBar">
              <div className="rightMenuWrapper">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 16 16"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
              </div>
            </div>
          </nav>
          <nav className="bottomNavBar">
            <p className={isHomeBorder ? 'isHomeBorder' : ''}>User's Choice!</p>
          </nav>
        </div>
      </>
    );
  }
}

export default withRouter(NavbarStore);
