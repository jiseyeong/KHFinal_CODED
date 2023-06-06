import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
//import logo from './logo.svg';
//import './App.css';
import Main from "./component/main/Main";
import RegisterPage from "./pages/auth/RegisterPage";
import LoginPage from "./pages/auth/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
