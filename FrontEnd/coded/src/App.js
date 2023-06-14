import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RegisterPage from './pages/auth/RegisterPage';
import LoginPage from './pages/auth/LoginPage';
// import MyProfilePage from './pages/user/MyProfilePage';
import FeedList from './pages/feedList/FeedList';
import MyProfilePage from './pages/user/MyProfile/MyProfilePage';
import HomePageTemplate from './pages/main/HomePageTemplate';
import FeedListByIdWithMain from './pages/test/FeedListByIdWithMain';
import FeedListByHashsWithMain from './pages/test/FeedListByHashsWithMain';
import FeedListByNickNameWithMain from './pages/test/FeedListByNickNameWithMain';
import IndexPage from './pages/IndexPage';
import FileUploadTest from './pages/test/FileUploadTest';
import DMPage from './pages/DM/DMPage';
import KakaoCodeCallbackPage from './pages/auth/OAuthKakaoCodeCallback';
import NaverCodeCallbackPage from './pages/auth/OAuthNaverCodeCallback';
import LastCallbackPage from './pages/auth/OAuthLastCallback';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/HomePage" element={<HomePageTemplate />} />
        <Route path="/FeedList" element={<FeedList />} />
        <Route path="/FeedList/id" element={<FeedListByIdWithMain />} />
        <Route path="/FeedList/nick" element={<FeedListByNickNameWithMain />} />
        <Route path="/FeedList/hashs" element={<FeedListByHashsWithMain />} />
        <Route path="/MyProfile" element={<MyProfilePage />} />
        <Route path="/FileUploadTest" element={<FileUploadTest />} />
        <Route path="/login/oauth2/code/kakao" element={<KakaoCodeCallbackPage/>} />
        <Route path="/login/oauth2/callback/kakao" element={<LastCallbackPage/>} />
        <Route path="/login/oauth2/code/naver" element={<NaverCodeCallbackPage/>} />
        <Route path="/login/oauth2/callback/naver" element={<LastCallbackPage/>} />
        <Route path="/DMPage" element={<DMPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
