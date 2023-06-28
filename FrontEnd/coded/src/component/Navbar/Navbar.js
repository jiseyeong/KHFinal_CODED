import React, { Component, useCallback, useEffect, useState } from 'react';
import './Navbar.scss';
import {
  BrowserRouter,
  Route,
  Router,
  Routes,
  useNavigate,
  withRouter,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import SearchBox from '../Search/SearchBox';
import {
  setMember,
  setNonMember,
  setWeekly,
} from '../../modules/Redux/navbarSetting';
import Login from '../../pages/auth/Login/Login';
import SignUp from '../../pages/auth/SignUp/SignUp';
import Logo from './navLogo.png';

function Navbar() {
  const [isOotdBorder, setIsOotdBorder] = useState(true);
  const [isWeeklyBorder, setIsWeeklyBorder] = useState(false);
  const [isListOotdBorder, setListOotdBorder] = useState(1);
  const [isHomeBorder, setIsHomeBorder] = useState(true);
  const accessToken = useSelector((state) => state.member.access);
  const navbarType = useSelector((state) => state.navbarSetting.type);
  const dispatch = useDispatch();
  const onNavbarSetNonMem = useCallback(
    () => dispatch(setNonMember()),
    [dispatch],
  );
  const onNavbarSetMem = useCallback(() => dispatch(setMember()), [dispatch]);
  const onNavbarSetWeekly = useCallback(
    () => dispatch(setWeekly()),
    [dispatch],
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      onNavbarSetMem();
    } else {
      onNavbarSetNonMem();
    }
  }, [accessToken]);

  function handleClickOotd(e) {
    e.preventDefault();
    setIsOotdBorder(true);
    setIsWeeklyBorder(false);

    if (accessToken) {
      onNavbarSetMem();
    } else {
      onNavbarSetNonMem();
    }
    navigate('/');
  }

  function handleClickWeekly(e) {
    e.preventDefault();
    setIsOotdBorder(false);
    setIsWeeklyBorder(true);

    onNavbarSetWeekly();

    navigate('/weekly');
  }

  function loginPage() {
    navigate('/login');
  }

  function myPage() {
    navigate('/profile');
  }

  // 상단 네비의 카테고리 클릭 시 적용
  const handleClickCategory = (e) => {
    e.preventDefault();
    setListOotdBorder(e.target.value);

    if (e.target.value === 1) {
      navigate('/feedList');
    } else if (e.target.value === 2) {
      navigate('/feedPopularList');
    } else if (e.target.value === 3) {
      navigate('/feedFollowingList');
    } else if (e.target.value === 4) {
      navigate('/myPickPage');
    } else if (e.target.value === 5) {
      navigate('/feedPopularList');
    }
  };

  return (
    <>
      <div className="navBarWrapper">
        <nav className="topNavBar">
          <div className="leftNavBar">
            <a className="navLogo" href="/">
              <img src={Logo} className="navLogo" />
              <div>CODED</div>
            </a>
            <div className="leftMenuWrapper">
              <ul className="leftMenuList">
                <li value="feed" className="leftMenu">
                  <span
                    className={
                      isOotdBorder ? 'leftMenuOotdAct' : 'leftMenuOotd'
                    }
                    onClick={handleClickOotd}
                  >
                    #OOTD
                    <hr />
                  </span>
                </li>
                {accessToken && (
                  <li value="feed" className="leftMenu">
                    <span
                      className={
                        isWeeklyBorder ? 'leftMenuWeeklyAct' : 'leftMenuWeekly'
                      }
                      onClick={handleClickWeekly}
                    >
                      #WEEKLY
                      <hr />
                    </span>
                  </li>
                )}
              </ul>
            </div>
          </div>

          {navbarType !== 'Weekly' && (
            // 검색 박스 관련 js와 css는 SearchBox.js로 옮겨 넣었습니다.
            <SearchBox />
          )}

          <div className="rightNavBar">
            <div className="rightMenuWrapper">
              <button onClick={loginPage} className="loginBtn">
                로그인 / 회원가입
              </button>
              {/* <button onClick={myPage} className='mypage'>마이페이지</button> */}
              {/* <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 16 16"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg> */}
            </div>
          </div>
        </nav>
        {navbarType === 'Mem' && (
          <nav className="bottomNavBar">
            <ul className="categories">
              <li
                value="1"
                className={isListOotdBorder === 1 ? 'isListOotdBorder' : ''}
                onClick={handleClickCategory}
              >
                Hot
              </li>
              <li
                value="2"
                className={isListOotdBorder === 2 ? 'isListOotdBorder' : ''}
                onClick={handleClickCategory}
              >
                New
              </li>
              <li
                value="3"
                className={isListOotdBorder === 3 ? 'isListOotdBorder' : ''}
                onClick={handleClickCategory}
              >
                Following
              </li>
              <li
                value="4"
                className={isListOotdBorder === 4 ? 'isListOotdBorder' : ''}
                onClick={handleClickCategory}
              >
                MyPick
              </li>
              <li
                value="5"
                className={isListOotdBorder === 5 ? 'isListOotdBorder' : ''}
                onClick={handleClickCategory}
              >
                Scrap
              </li>
            </ul>
          </nav>
        )}
        {navbarType === 'NonMem' && (
          <nav className="bottomNavBar">
            <ul className="categories">
              <li className={isListOotdBorder ? 'isListOotdBorder' : ''}>
                Hot
              </li>
              <li>New</li>
            </ul>
          </nav>
        )}
        {navbarType === 'Weekly' && (
          <nav className="bottomNavBar">
            <p className={isHomeBorder ? 'isHomeBorder' : ''}>USER'S CODI!</p>
          </nav>
        )}
      </div>
    </>
  );
}

export default Navbar;
