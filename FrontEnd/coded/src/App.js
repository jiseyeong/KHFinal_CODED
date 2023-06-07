import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/auth/RegisterPage";
import LoginPage from "./pages/auth/LoginPage";
import MyProfilePage from "./pages/user/MyProfilePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/myprofile" element={<MyProfilePage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
