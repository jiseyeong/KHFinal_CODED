import React from 'react';
import FeedList from './Component/FeedList/FeedList';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import IndexPage from './IndexPage';
import Login from './Component/Login/Login';
import SignUp from './Component/SignUp/SignUp';
import Profile from './Component/Profile/Profile';
import FeedList from './Component/FeedList/FeedList';
import PostDetail from './Component/FeedPostDetail/FeedPostDetail';
import Search from './Component/Search/Search';
import Ootd from './Pages/Ootd/Main/Main';
import Weekly from './Pages/Weekly/Home/Home';

import FeedListByIdWithMain from './test/FeedListByIdWithMain';
import FeedListByHashsWithMain from './test/FeedListByHashsWithMain';
import FeedListByNickNameWithMain from './test/FeedListByNickNameWithMain';
import FileUploadTest from './test/FileUploadTest';
import KakaoCodeCallbackPage from './pages/auth/OAuthKakaoCodeCallback';
import LastCallbackPage from './pages/auth/OAuthLastCallback';
import NaverCodeCallbackPage from './pages/auth/OAuthNaverCodeCallback';

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route exact path="/" element={<IndexPage />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/feed" element={<FeedList />} />
          <Route exact path="/post" element={<PostDetail />} />
          <Route exact path="/search" element={<Search />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/ootd" element={<Ootd />} />
          <Route exact path="/FeedList" element={<FeedList />} />
          <Route exact path="/FeedList/id" element={<FeedListByIdWithMain />} />
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
      </Router>
    );
  }
}
export default Routes;
