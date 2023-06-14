import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import IndexPage from './IndexPage';
import Login from './component/Login/Login';
import SignUp from './component/SignUp/SignUp';
import Profile from './component/Profile/Profile';
import FeedList from './component/FeedList/FeedList';
import FeedPostDetail from './component/FeedPostDetail/FeedPostDetail';
import Search from './component/Search/Search';
import Ootd from './pages/ootd/Main/Main';
import FeedListByIdWithMain from './test/FeedListByIdWithMain';
import FeedListByHashsWithMain from './test/FeedListByHashsWithMain';
import FeedListByNickNameWithMain from './test/FeedListByNickNameWithMain';
import FileUploadTest from './test/FileUploadTest';
import KakaoCodeCallbackPage from './pages/auth/OAuthKakaoCodeCallback';
import LastCallbackPage from './pages/auth/OAuthLastCallback';
import NaverCodeCallbackPage from './pages/auth/OAuthNaverCodeCallback';
import DMPage from './pages/DM/DMPage';
import HomePageTemplate from './pages/HomePageTemplate';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<IndexPage />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/feed" element={<FeedList />} />
          <Route exact path="/post" element={<FeedPostDetail />} />
          <Route exact path="/search" element={<Search />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/ootd" element={<Ootd />} />
          <Route exact path="/FeedList" element={<FeedList />} />
          <Route exact path="/FeedList/id" element={<FeedListByIdWithMain />} />
          <Route
            exact
            path="/HomePageTemplate"
            element={<HomePageTemplate />}
          ></Route>
          <Route
            exact
            path="/FeedList/nick"
            element={<FeedListByNickNameWithMain />}
          />
          <Route
            exact
            path="/FeedList/hashs"
            element={<FeedListByHashsWithMain />}
          />

          <Route path="/FileUploadTest" element={<FileUploadTest />} />
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
          <Route path="/DMPage" element={<DMPage />} />
        </Routes>
      </BrowserRouter>
    );
  }
}
export default App;
