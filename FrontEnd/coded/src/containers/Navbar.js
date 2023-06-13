// import React from 'react';
// import style from './Navbar.module.css';

// const Navbar = () => {
//   return <div className={style.navbarLayout}></div>;
// };

// export default Navbar;

/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import './Navbar.module.scss';
import { withRouter } from 'react-router-dom';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOotdBorder: true,
      isWeeklyBorder: false,
      isListOotdBorder: true,
    }
  }

  handleClickOotd = (e) => {
      this.setState({
        isOotdBorder: true,
        isWeeklyBorder: false,
      })
      this.props.history.push('/');
  }

  handleClickWeekly = (e) => {
      this.setState({
        isOotdBorder: false,
        isWeeklyBorder: true,
      })
      this.props.history.push('/weekly');
  }

  render() {
    const { isOotdBorder, isWeeklyBorder, isListOotdBorder } = this.state;
    return (
      <>
      <div className="navBarWrapper">
        <nav className="topNavBar">
          <div className="leftNavBar">
            <a className="navLogo" href="/">
              <img src='/images/navLogo.png' />
            // 로고 사진 이미지
            </a>
            <div className="leftMenuWrapper">
              <ul className="leftMenuList">
                <li value="feed"
                    className="leftMenu">
                  <span  className={isOotdBorder ? "leftMenuOotdAct":"leftMenuOotd"} onClick={this.handleClickOotd}>#OOTD</span>
                </li>
                <li value="feed"
                    className="leftMenu">
                  <span className={isWeeklyBorder ? "leftMenuStoreAct":"leftMenuStore"} onClick={this.handleClickWeekly}>#WEEKLY</span>
                </li>
              </ul>
            </div>
          </div>

          <form className="searchBar">
            <input
            id="search-keyword"
            name="keyword"
            type="search"
            placeholder="유저와 스타일을 검색해보세요"
             />
          </form>
        </nav>
        
        <nav className="bottomNavBar">
          <ul className="categories">
            <li>Hot</li>
            <li className={isListOotdBorder ? "isListOotdBorder":""}>OOTD</li>
            <li>New</li>
            <li>Following</li>
            <li>MyPick</li>
            <li>Scrap</li>
          </ul>
        </nav>
      </div>
    </>

    );
  }
}

export default withRouter(Navbar);