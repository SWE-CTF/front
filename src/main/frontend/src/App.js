import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Challenges from "./pages/Challenges";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Scoreboard from "./pages/Scoreboard";
import Signup from "./pages/Signup";
import WriteBoard from "./pages/WriteBoard";

function App() {
  return (
    <Router>
      <div className="container">
        {/* 페이지 라우팅을 설정 */}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/Login" element={<Login />} />
          <Route exact path="/Signup" element={<Signup />} />
          <Route exact path="/Scoreboard" element={<Scoreboard />} />
          <Route exact path="/WriteBoard" element={<WriteBoard />} />
          <Route path="/pages/:postId" element={<Challenges />} /> {/* Challenges 컴포넌트로 수정 */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
