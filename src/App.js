import logo from "./cherry.png";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"; // 수정된 import 구문
import axios from "axios";
import "./App.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import MyPage from "./pages/MyPage";

function App() {
  return (
    <Router>
      <div className="container">
        {/* 페이지 라우팅을 설정 */}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/Login" element={<Login />} />
          <Route exact path="/register" element={<Signup />} />
          <Route exact path="/MyPage" element={<MyPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
