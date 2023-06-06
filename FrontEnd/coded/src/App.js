import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
//import logo from './logo.svg';
//import './App.css';
import Join from "./component/auth/Join";
import Main from "./component/main/Main";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/join" element={<Join />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
