import React, { useCallback, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import IndexPage from './IndexPage';
import Login from './pages/auth/Login/Login';
import SignUp from './pages/auth/SignUp/SignUp';
import Profile from './component/Profile/Profile';
import FeedList from './component/FeedList/FeedList';

import Ootd from './pages/Ootd/Main/Main';
import KakaoCodeCallbackPage from './pages/auth/Login/OAuthKakaoCodeCallback';
import LastCallbackPage from './pages/auth/Login/OAuthLastCallback';
import NaverCodeCallbackPage from './pages/auth/Login/OAuthNaverCodeCallback';
import DMPage from './pages/DM/DMPage';
import IdSearch from './pages/auth/Login/IdSearch';
import PwSearch from './pages/auth/Login/PwSearch';
import GoogleCodeCallbackPage from './pages/auth/Login/OAuthGoogleCodeCallback';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, setRefresh } from './modules/Redux/members';
import cookie from 'react-cookies';
import axios from 'axios';
import WeeklyPage from './pages/Weekly/Main/Weekly';
import ImageUpload from './test/ImageUpload';
import TestComponent from './test/TestComponent';
import SearchLabelSelect from './test/SearchLabelSelect';
import SearchBox from './component/Search/SearchBox';
import Navbar from './component/Navbar/Navbar';
import Footer from './component/Footer/Footer';
import SearchedFeedList from './component/FeedList/SearchedFeedList';
import FeedInsert from './pages/Feed/Main/FeedInsert';
import DMList from './pages/DM/DMList';
import FeedCommentList from './component/FeedPostDetail/FeedCommentList';

import CaroselTest from './test/CaroselTest';
import FeedInsertTest from './test/FeedInsertTest';

import ImageSlide from './test/ImageSlide';
import MyPickPage from './pages/myPickPage/MyPickPage';
import { styled } from 'styled-components';
import DeleteAccount from './component/Footer/Component/DeleteAccount/DeleteAccount';
import TodayWeather from './component/TodayWeather/TodayWeather';
import Follow from './component/FollowList/Follow';

const ButtonContainer = styled.div`
  position: fixed;
  right: 5%;
  bottom: 5%;
  z-index: 1;
`;

const TopButton = styled.button`
  padding: 10px;
  background-color: #f2f2f2;
  border: none;
  border-radius: 50%;
  outline: none;
  cursor: pointer;
`;

function App() {
  // Modal.setAppElement('#root');

  const dispatch = useDispatch();
  const onLogin = useCallback(
    (accessToken, userId, userNo) =>
      dispatch(login(accessToken, userId, userNo)),
    [dispatch],
  );
  const onLogout = useCallback(() => dispatch(logout(), [dispatch]));
  const onSetRefresh = useCallback(
    (refreshToken) => dispatch(setRefresh(refreshToken)),
    [dispatch],
  );
  const accessToken = useSelector((state) => state.member.access);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    axios({
      method: 'get',
      url: '/auth/refresh',
    })
      .then((response) => {
        let refreshToken = cookie.load('CodedRefreshToken');
        refreshToken = refreshToken.substr(
          'Bearer '.length,
          refreshToken.length,
        );
        onLogin(
          response.data.accessToken,
          response.data.userId,
          response.data.userNo,
        );
        onSetRefresh(refreshToken);
      })
      .catch((error) => {
        if (accessToken) {
          onLogout();
        }
        console.log(error);
      });

    window.addEventListener('scroll', handleShowTop);
    return () => {
      window.removeEventListener('scroll', handleShowTop);
    };
  }, []);

  function toTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // or auto
    });
  }
  function handleShowTop() {
    if (window.scrollY > 500) {
      setShowTop(true);
    } else {
      setShowTop(false);
    }
  }

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/feedList" element={<FeedList type="recent" key={1} />} />
        <Route
          path="/feedPopularList"
          element={<FeedList type="popular" key={2} />}
        />
        <Route
          path="/feedFollowingList"
          element={<FeedList type="following" key={3} />}
        />
        <Route path="/myPickPage/" element={<MyPickPage />} key={4} />
        <Route
          path="/feedScrapList"
          element={<FeedList type="scrap" key={5} />}
        />
        <Route path="/feedList/search" element={<SearchedFeedList />} />
        {/* <Route path="/feed/search/:keyword" element={<SearchedFeedList />} /> */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/DMPage" element={<DMPage />} />
        <Route path="/DMList" element={<DMList />} />
        <Route path="/ootd" element={<Ootd />} />
        <Route path="/idSearch" element={<IdSearch />} />
        <Route path="/pwSearch" element={<PwSearch />} />
        <Route path="/weekly" element={<WeeklyPage />} />
        <Route path="/deleteAccount" element={<DeleteAccount />} />

        <Route path="/testComponent" element={<TestComponent />} />
        <Route path="/imageUpload" element={<ImageUpload />} />
        <Route path="/searchLabelSelect" element={<SearchLabelSelect />} />
        <Route path="/searchBox" element={<SearchBox />} />

        <Route path="/caroselTest" element={<CaroselTest />} />
        <Route path="/feedInsertTest" element={<FeedInsertTest />} />
        <Route path="/followList" element={<Follow />} />
        <Route path="/imageSlide" element={<ImageSlide />} />

        <Route
          path="/test/feedComment"
          element={<FeedCommentList feedPostId={295} depth={0} parentId={0} />}
        />
        <Route path="/FeedInsert" element={<FeedInsert />} />
        <Route path="/todayWeather" element={<TodayWeather />} />

        <Route
          path="/login/oauth2/code/kakao"
          element={<KakaoCodeCallbackPage />}
        />
        <Route
          path="/login/oauth2/code/naver"
          element={<NaverCodeCallbackPage />}
        />
        <Route
          path="/login/oauth2/code/google"
          element={<GoogleCodeCallbackPage />}
        />
        <Route path="/login/oauth2/callback" element={<LastCallbackPage />} />
        {/* <Route path="/likepeed" element={<Likepeed/>} />
        <Route path="/newpeed"  element={<Newpeed/>} /> */}
      </Routes>
      {showTop && (
        <ButtonContainer>
          <TopButton onClick={toTop}>
            <svg
              height="20"
              viewBox="0 0 20 20"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.14708 12.3544C3.95147 12.1594 3.9509 11.8429 4.14582 11.6472L9.6108 6.16276C9.82574 5.94705 10.1751 5.94705 10.39 6.16276L15.855 11.6472C16.0499 11.8429 16.0493 12.1594 15.8537 12.3544C15.6581 12.5493 15.3415 12.5487 15.1466 12.3531L10.0004 7.18851L4.85418 12.3531C4.65927 12.5487 4.34269 12.5493 4.14708 12.3544Z"
                fill="#222"
              />
            </svg>
          </TopButton>
        </ButtonContainer>
      )}
      <Footer />
    </BrowserRouter>
  );
}
export default App;
