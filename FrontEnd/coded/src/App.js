import React, { useCallback, useEffect } from 'react';
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
import { useDispatch } from 'react-redux';
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
import FeedInsert from './test/FeedInsert';
import DMList from './pages/DM/DMList';
import FeedCommentList from './component/FeedPostDetail/FeedCommentList';

import CaroselTest from './test/CaroselTest';
import FeedInsertTest from './test/FeedInsertTest';

function App() {
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
        onLogout();
        console.log(error);
      });
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/feedList" element={<FeedList />} />
        <Route path="/feedList/search" element={<SearchedFeedList />} />
        {/* <Route path="/feed/search/:keyword" element={<SearchedFeedList />} /> */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/DMPage" element={<DMPage />} />
        <Route path="/DMList" element={<DMList />} />
        <Route path="/ootd" element={<Ootd />} />
        <Route path="/idSearch" element={<IdSearch />} />
        <Route path="/pwSearch" element={<PwSearch />} />
        <Route path="/weekly" element={<WeeklyPage />} />

        <Route path="/testComponent" element={<TestComponent />} />
        <Route path="/imageUpload" element={<ImageUpload />} />
        <Route path="/searchLabelSelect" element={<SearchLabelSelect />} />
        <Route path="/searchBox" element={<SearchBox />} />

        <Route path="/caroselTest" element={<CaroselTest />} />
        <Route path="/feedInsertTest" element={<FeedInsertTest />} />

        <Route
          path="/test/feedComment"
          element={<FeedCommentList feedPostId={295} depth={0} parentId={0} />}
        />
        <Route path="/test/FeedInsert" element={<FeedInsert />} />

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
      <Footer />
    </BrowserRouter>
  );
}
export default App;
