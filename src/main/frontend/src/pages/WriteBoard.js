import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeButton from "../components/HomeButton";
import useDarkMode from "../theme/useDarkMode";

function WriteBoard() {
  const [theme, toggleTheme] = useDarkMode();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    console.log("Title:", e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
    console.log("Content:", e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = {
      username: "사용자명", // 사용자명
      id: "사용자 아이디", // 사용자 아이디
      title: title,
      body: content, // 내용을 body로 변경
    };
  
    try {
      // 서버에 POST 요청을 보냅니다.
      const response = await axios.post("/api/challenge", postData);
  
      // 서버로부터의 응답을 확인하고 필요한 작업을 수행합니다.
      console.log("글이 성공적으로 게시되었습니다.", response.data);
  
      // 게시판 페이지로 이동합니다.
      navigate("/scoreboard");
    } catch (error) {
      // 오류 처리
      console.error("글 게시 중 오류가 발생했습니다.", error);
    }
  };
  

  return (
    <div className={`container ${theme.dark ? "dark" : "light"}`}>
      <HomeButton />
      <div className="darkBtn">
        <button onClick={toggleTheme}>
          {theme.dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>
      </div>
      <h2>글 쓰기</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">제목</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">내용</label>
          <textarea
            id="content"
            name="content"
            value={content}
            onChange={handleContentChange}
          />
        </div>
        <button type="submit">글 쓰기</button>
      </form>
    </div>
  );
}

export default WriteBoard;
