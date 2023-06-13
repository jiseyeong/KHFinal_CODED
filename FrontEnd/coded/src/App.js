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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* <Route path="/myprofile" element={<MyProfilePage />} /> */}
        <Route path="/HomePage" element={<HomePageTemplate />} />
        <Route path="/FeedList" element={<FeedList />} />
        <Route path="/FeedList/id" element={<FeedListByIdWithMain />} />
        <Route path="/FeedList/nick" element={<FeedListByNickNameWithMain />} />
        <Route path="/FeedList/hashs" element={<FeedListByHashsWithMain />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
