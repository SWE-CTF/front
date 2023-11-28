import React from "react";
import Modal from "react-modal";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AnnounceDetail from "./Announcement.js/AnnounceDetail";
import Announcement from "./Announcement.js/Announcement";
import AnnouncementEdit from "./Announcement.js/AnnouncementEdit";
import AnnouncementModify from "./Announcement.js/AnnouncementModify";
import "./App.css";
import BoardDetail from "./Board/BoardDetail";
import BoardMain from "./Board/BoardMain";
import Edit from "./Board/Edit";
import Modify from "./Board/Modify";
import Challenges from "./pages/Challenges";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MyPage from "./pages/MyPage";
import Problem from "./pages/Problem";
import Rank from "./pages/Rank";
import Results from "./pages/Results";
import ShowHistory from "./pages/ShowHistoy";
import Signup from "./pages/Signup";
import WriteBoard from "./pages/WriteBoard";

function App() {
  Modal.setAppElement('#root');
  return (
    <Router>
      <div className="container">
        {/* 페이지 라우팅을 설정 */}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/Login" element={<Login />} />
          <Route exact path="/Signup" element={<Signup />} />
          <Route exact path="/Problem" element={<Problem />} />
          <Route exact path="/Results" element={<Results />} />
          <Route exact path="/WriteBoard" element={<WriteBoard />} />
          <Route path="/pages/:postId" element={<Challenges />} />
          <Route path="/MyImpormation" element={<MyPage />} />
          <Route path="/api/MyPage/:item" element={<ShowHistory />} />
          <Route path="/Announcement" element={<Announcement />} />
          <Route path="/QuestionBoard" element={<BoardMain />} />
          <Route path="/QuestionBoardEdit" element={<Edit />} />
          <Route path="/api/question/:questionId" element={<BoardDetail />} />
          <Route path="/QuestionBoardModify" element={<Modify />} />
          <Route
            path="/AnnouncementEdit"
            element={<AnnouncementEdit />}
          ></Route>
          <Route path="/Rank" element={<Rank />} />
          <Route path="/api/notice/:noticeId" element={<AnnounceDetail />} />
          <Route path="/AnnouncementModify" element={<AnnouncementModify />} />
          {/* <Route exact path="/Scoreboard" element={<Scoreboard />} /> */}
          {/* Challenges 컴포넌트로 수정 */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
