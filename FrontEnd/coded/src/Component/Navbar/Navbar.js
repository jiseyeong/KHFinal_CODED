import React, { Component, useCallback, useEffect, useState } from 'react';
import './NavbarNonMem.scss';
import { useNavigate, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import SearchBox from '../Search/SearchBox';
import {
  setMember,
  setNonMember,
  setWeekly,
} from '../../modules/Redux/navbarSetting';

//font awsome
const weatherIcons = {
  cloud: (
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512">
      <path d="M0 336c0 79.5 64.5 144 144 144H512c70.7 0 128-57.3 128-128c0-61.9-44-113.6-102.4-125.4c4.1-10.7 6.4-22.4 6.4-34.6c0-53-43-96-96-96c-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32C167.6 32 96 103.6 96 192c0 2.7 .1 5.4 .2 8.1C40.2 219.8 0 273.2 0 336z" />
    </svg>
  ),
  sun: (
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
      <path d="M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM160 256a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zm224 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0z" />
    </svg>
  ),
  rain: (
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
      <path d="M96 320c-53 0-96-43-96-96c0-42.5 27.6-78.6 65.9-91.2C64.7 126.1 64 119.1 64 112C64 50.1 114.1 0 176 0c43.1 0 80.5 24.3 99.2 60c14.7-17.1 36.5-28 60.8-28c44.2 0 80 35.8 80 80c0 5.5-.6 10.8-1.6 16c.5 0 1.1 0 1.6 0c53 0 96 43 96 96s-43 96-96 96H96zm-6.8 52c1.3-2.5 3.9-4 6.8-4s5.4 1.5 6.8 4l35.1 64.6c4.1 7.5 6.2 15.8 6.2 24.3v3c0 26.5-21.5 48-48 48s-48-21.5-48-48v-3c0-8.5 2.1-16.9 6.2-24.3L89.2 372zm160 0c1.3-2.5 3.9-4 6.8-4s5.4 1.5 6.8 4l35.1 64.6c4.1 7.5 6.2 15.8 6.2 24.3v3c0 26.5-21.5 48-48 48s-48-21.5-48-48v-3c0-8.5 2.1-16.9 6.2-24.3L249.2 372zm124.9 64.6L409.2 372c1.3-2.5 3.9-4 6.8-4s5.4 1.5 6.8 4l35.1 64.6c4.1 7.5 6.2 15.8 6.2 24.3v3c0 26.5-21.5 48-48 48s-48-21.5-48-48v-3c0-8.5 2.1-16.9 6.2-24.3z" />
    </svg>
  ),
  heavyRain: (
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
      <path d="M96 320c-53 0-96-43-96-96c0-42.5 27.6-78.6 65.9-91.2C64.7 126.1 64 119.1 64 112C64 50.1 114.1 0 176 0c43.1 0 80.5 24.3 99.2 60c14.7-17.1 36.5-28 60.8-28c44.2 0 80 35.8 80 80c0 5.5-.6 10.8-1.6 16c.5 0 1.1 0 1.6 0c53 0 96 43 96 96s-43 96-96 96H96zM81.5 353.9c12.2 5.2 17.8 19.3 12.6 31.5l-48 112c-5.2 12.2-19.3 17.8-31.5 12.6S-3.3 490.7 1.9 478.5l48-112c5.2-12.2 19.3-17.8 31.5-12.6zm120 0c12.2 5.2 17.8 19.3 12.6 31.5l-48 112c-5.2 12.2-19.3 17.8-31.5 12.6s-17.8-19.3-12.6-31.5l48-112c5.2-12.2 19.3-17.8 31.5-12.6zm244.6 31.5l-48 112c-5.2 12.2-19.3 17.8-31.5 12.6s-17.8-19.3-12.6-31.5l48-112c5.2-12.2 19.3-17.8 31.5-12.6s17.8 19.3 12.6 31.5zM313.5 353.9c12.2 5.2 17.8 19.3 12.6 31.5l-48 112c-5.2 12.2-19.3 17.8-31.5 12.6s-17.8-19.3-12.6-31.5l48-112c5.2-12.2 19.3-17.8 31.5-12.6z" />
    </svg>
  ),
  snow: (
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
      <path d="M224 0c13.3 0 24 10.7 24 24V70.1l23-23c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-57 57v76.5l66.2-38.2 20.9-77.8c3.4-12.8 16.6-20.4 29.4-17s20.4 16.6 17 29.4L373 142.2l37.1-21.4c11.5-6.6 26.2-2.7 32.8 8.8s2.7 26.2-8.8 32.8L397 183.8l31.5 8.4c12.8 3.4 20.4 16.6 17 29.4s-16.6 20.4-29.4 17l-77.8-20.9L272 256l66.2 38.2 77.8-20.9c12.8-3.4 26 4.2 29.4 17s-4.2 26-17 29.4L397 328.2l37.1 21.4c11.5 6.6 15.4 21.3 8.8 32.8s-21.3 15.4-32.8 8.8L373 369.8l8.4 31.5c3.4 12.8-4.2 26-17 29.4s-26-4.2-29.4-17l-20.9-77.8L248 297.6v76.5l57 57c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-23-23V488c0 13.3-10.7 24-24 24s-24-10.7-24-24V441.9l-23 23c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l57-57V297.6l-66.2 38.2-20.9 77.8c-3.4 12.8-16.6 20.4-29.4 17s-20.4-16.6-17-29.4L75 369.8 37.9 391.2c-11.5 6.6-26.2 2.7-32.8-8.8s-2.7-26.2 8.8-32.8L51 328.2l-31.5-8.4c-12.8-3.4-20.4-16.6-17-29.4s16.6-20.4 29.4-17l77.8 20.9L176 256l-66.2-38.2L31.9 238.6c-12.8 3.4-26-4.2-29.4-17s4.2-26 17-29.4L51 183.8 13.9 162.4c-11.5-6.6-15.4-21.3-8.8-32.8s21.3-15.4 32.8-8.8L75 142.2l-8.4-31.5c-3.4-12.8 4.2-26 17-29.4s26 4.2 29.4 17l20.9 77.8L200 214.4V137.9L143 81c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l23 23V24c0-13.3 10.7-24 24-24z" />
    </svg>
  ),
};

function Navbar() {
  const [isOotdBorder, setIsOotdBorder] = useState(true);
  const [isWeeklyBorder, setIsWeeklyBorder] = useState(false);
  const [isListOotdBorder, setListOotdBorder] = useState(true);
  const [isHomeBorder, setIsHomeBorder] = useState(true);
  const [weatherIcon, setWeatherIcon] = useState('');
  const [weatherMessage, setWeatherMessage] = useState('');
  const [minTemp, setMinTemp] = useState(0);
  const [maxTemp, setMaxTemp] = useState(0);
  const [recentTemp, setRecentTemp] = useState(0);
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
    if (accessToken !== '') {
      onNavbarSetMem();
      axios({
        method: 'get',
        url: '/auth/userDTO',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => {
          axios({
            method: 'get',
            url: '/weather/today',
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            params: {
              address1: response.data.address1,
              address2: response.data.address2,
              time: new Date().getTime(),
            },
          }).then((response) => {
            setWeatherMessage(response.data.message);
            setRecentTemp(response.data.today.recent);
            setMinTemp(response.data.today.min);
            setMaxTemp(response.data.today.max);
            if (
              response.data.today.ptyCode == 1 ||
              response.data.today.ptyCode == 2
            ) {
              setWeatherIcon(weatherIcons.rain);
            } else if (response.data.today.ptyCode == 3) {
              setWeatherIcon(weatherIcons.snow);
            } else if (response.data.today.ptyCode == 4) {
              setWeatherIcon(weatherIcons.heavyRain);
            } else {
              if (response.data.today.skyCode == 1) {
                setWeatherIcon(weatherIcons.sun);
              } else {
                setWeatherIcon(weatherIcons.cloud);
              }
            }
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      onNavbarSetNonMem();
    }
  }, [accessToken]);

  function handleClickOotd(e) {
    e.preventDefault();
    setIsOotdBorder(true);
    setIsWeeklyBorder(false);

    if (accessToken !== '') {
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

  return (
    <>
      {navbarType !== 'NonMem' && (
        <div>
          <div>{weatherIcon}</div>
          <div>{recentTemp}</div>
          <div>H:{maxTemp}</div>
          <div>L:{minTemp}</div>
          <div>{'>' + weatherMessage}</div>
        </div>
      )}

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
          </div>

          {navbarType !== 'Weekly' && (
            // 검색 박스 관련 js와 css는 SearchBox.js로 옮겨 넣었습니다.
            <SearchBox />
          )}

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
        {navbarType === 'Mem' && (
          <nav className="bottomNavBar">
            <ul className="categories">
              <li className={isListOotdBorder ? 'isListOotdBorder' : ''}>
                Hot
              </li>
              <li>New</li>
              <li>Following</li>
              <li>MyPick</li>
              <li>Scrap</li>
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
            <p className={isHomeBorder ? 'isHomeBorder' : ''}>User's Choice!</p>
          </nav>
        )}
      </div>
    </>
  );
}

export default Navbar;
