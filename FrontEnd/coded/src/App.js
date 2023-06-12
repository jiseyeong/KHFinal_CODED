import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RegisterPage from './pages/auth/RegisterPage';
import LoginPage from './pages/auth/LoginPage';
// import MyProfilePage from './pages/user/MyProfilePage';
import FeedList from './pages/feedList/FeedList';
import MyProfilePage from './pages/user/MyProfile/MyProfilePage';
import HomePageTemplate from './pages/main/HomePageTemplate';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* <Route path="/myprofile" element={<MyProfilePage />} /> */}
        <Route path="/FeedList" element={<FeedList />} />
        <Route path="/HomePage" element={<HomePageTemplate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
