import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import IndexPage from './IndexPage';
import Login from './pages/auth/Login/Login';
import SignUp from './pages/auth/SignUp/SignUp';
import Profile from './component/Profile/Profile';
import FeedList from './component/FeedList/FeedList';
import FeedPostDetail from './component/FeedPostDetail/FeedPostDetail';
import Search from './component/Search/Search';
import Ootd from './pages/ootd/Main/Main';
import FeedListByIdWithMain from './test/FeedListByIdWithMain';
import FeedListByHashsWithMain from './test/FeedListByHashsWithMain';
import FeedListByNickNameWithMain from './test/FeedListByNickNameWithMain';
import FileUploadTest from './test/FileUploadTest';
import KakaoCodeCallbackPage from './pages/auth/Login/OAuthKakaoCodeCallback';
import LastCallbackPage from './pages/auth/Login/OAuthLastCallback';
import NaverCodeCallbackPage from './pages/auth/Login/OAuthNaverCodeCallback';
import DMPage from './pages/DM/DMPage';
import HomePageTemplate from './pages/HomePageTemplate';
import IdSearch from './pages/auth/Login/IdSearch';
import PwSearch from './pages/auth/Login/PwSearch';
import GoogleCodeCallbackPage from './pages/auth/Login/OAuthGoogleCodeCallback';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/HomePageTemplate" element={<HomePageTemplate />} />
          <Route path="/feed" element={<FeedList />} />
          <Route path="/feed/id" element={<FeedListByIdWithMain />} />
          <Route path="/feed/nick" element={<FeedListByNickNameWithMain />} />
          <Route path="/feed/hashs" element={<FeedListByHashsWithMain />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/FileUploadTest" element={<FileUploadTest />} />
          <Route path="/DMPage" element={<DMPage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/ootd" element={<Ootd />} />
          <Route path="/idSearch" element={<IdSearch/>} />
          <Route path="/pwSearch" element={<PwSearch/>} />

          <Route
            path="/login/oauth2/code/kakao"
            element={<KakaoCodeCallbackPage />}
          />
          <Route
            path="/login/oauth2/callback/kakao"
            element={<LastCallbackPage />}
          />
          <Route
            path="/login/oauth2/code/naver"
            element={<NaverCodeCallbackPage />}
          />
          <Route
            path="/login/oauth2/callback/naver"
            element={<LastCallbackPage />}
          />
          <Route
            path="/login/oauth2/code/google"
            element={<GoogleCodeCallbackPage/>}
          />
          <Route
            path="/login/oauth2/callback/google"
            element={<LastCallbackPage/>}
          />
        </Routes>
      </BrowserRouter>
    );
  }
}
export default App;
