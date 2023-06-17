import React, { Component, useState } from 'react';
import './NavbarNonMem.scss';
import { useNavigate, withRouter } from 'react-router-dom';

function NavbarNonMem() {
  const [isOotdBorder, setIsOotdBorder] = useState(true);
  const [isWeeklyBorder, setIsWeeklyBorder] = useState(false);
  const [isListOotdBorder, setListOotdBorder] = useState(true);

  const navigate = useNavigate();

  function handleClickOotd(e) {
    e.preventDefault();
    setIsOotdBorder(true);
    setIsWeeklyBorder(false);
    navigate('/ootd');
  }

  function handleClickWeekly(e) {
    e.preventDefault();
    setIsOotdBorder(false);
    setIsWeeklyBorder(true);
    navigate('/login');
  }

  return (
    <>
      <div className="navBarWrapper">
        <nav className="topNavBar">
          <div className="leftNavBar">
            <a className="navLogo" href="/">
              <img src="/images/navLogo.png" />
              // 로고 사진 이미지
            </a>
          </div>
          <div className="leftMenuWrapper">
            <ul className="leftMenuList">
              <li value="feed" className="leftMenu">
                <span
                  className={isOotdBorder ? 'leftMenuOotdAct' : 'leftMenuOotd'}
                  onClick={handleClickOotd}
                >
                  #OOTD
                </span>
              </li>
              <li value="feed" className="leftMenu">
                <span
                  className={
                    isWeeklyBorder ? 'leftMenuWeeklyAct' : 'leftMenuWeekly'
                  }
                  onClick={handleClickWeekly}
                >
                  WEEKLY
                </span>
              </li>
            </ul>
          </div>

          <form className="searchBar">
            <input
              id="search-keyword"
              name="keyword"
              type="search"
              placeholder="유저와 스타일을 검색해보세요"
            />
          </form>

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
          <ul className="categories">
            <li className={isListOotdBorder ? 'isListOotdBorder' : ''}>Hot</li>
            <li>New</li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default NavbarNonMem;
