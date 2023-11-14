import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeButton from "../components/HomeButton";
import Nav from "../components/Nav";
import useDarkMode from "../theme/useDarkMode";

const WriteProblem = () => {
  const [theme, toggleTheme] = useDarkMode();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [files, setFiles] = useState([]);
  const [hint, setHint] = useState("");
  const [memory, setMemory] = useState("");
  const [time, setTime] = useState("");

  const navigate = useNavigate();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleFilesChange = (e) => {
    setFiles(e.target.files);
    const file = e.target.files[0];
  };
  
  const handleHintChange = (e) => {
    setHint(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleMemoryChange = (e) => {
    setMemory(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // FormData 객체를 생성하여 데이터를 담음
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);
    formData.append("time", parseFloat(time));
    formData.append("memory", parseFloat(memory));
    formData.append("hint", hint);
    
    if (files.length > 0) {
      formData.append("files", files[0]);
    }
  
// Log the FormData contents for debugging
for (var pair of formData.entries()) {
  // Check if the current value is a File object
  const value = pair[1] instanceof File ? `[${pair[1].name}]` : pair[1];
  console.log(pair[0] + ', ' + value);
}

    try {
      // 서버에 POST 요청을 보냄
      const response = await axios.post("/api/challenge/save", formData);
  
      // 서버로부터의 응답 확인 및 필요한 작업 수행
      console.log("문제가 성공적으로 등록되었습니다.", response.data);
  
      // 문제 목록 페이지로 이동
      navigate("/problems");
    } catch (error) {
      // 오류 처리
      console.error("문제 등록 중 오류가 발생했습니다.", error);
  
      // Log additional details from AxiosError
      if (error.response) {
        console.error("Response data:", error.response.data);
      }
    }
  };

  return (
    <div className={`container ${theme.dark ? "dark" : "light"}`}>
      <Nav></Nav>
      <HomeButton />
      <div className="darkBtn">
        <button onClick={toggleTheme}>
          {theme.dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>
      </div>
      <div className="seq">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={category}
            onChange={handleCategoryChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">content</label>
          <textarea
            id="content"
            name="content"
            value={content}
            onChange={handleContentChange}
          />
        </div>
        <div className="testCase">
          <div className="form-group">
            <label htmlFor="testCase1Input">Test Case 1 (Input)</label>
            <input
              type="text"
              id="testCase1Input"
              name="testCase1Input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="testCase1Output">Test Case 1 (Output)</label>
            <input
              type="text"
              id="testCase1Output"
              name="testCase1Output"
            />
          </div>
        </div>
        <div className="testCase">
          <div className="form-group">
            <label htmlFor="testCase2Input">Test Case 2 (Input)</label>
            <input
              type="text"
              id="testCase2Input"
              name="testCase2Input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="testCase2Output">Test Case 2 (Output)</label>
            <input
              type="text"
              id="testCase2Output"
              name="testCase2Output"
            />
          </div>
        </div>
        <div className="testCase">
          <div className="form-group">
            <label htmlFor="testCase3Input">Test Case 3 (Input)</label>
            <input
              type="text"
              id="testCase3Input"
              name="testCase3Input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="testCase3Output">Test Case 3 (Output)</label>
            <input
              type="text"
              id="testCase3Output"
              name="testCase3Output"
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="memory">Memory</label>
          <input
            type="text"
            id="memory"
            name="memory"
            value={memory}
            onChange={handleMemoryChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="time">Time Limit</label>
          <input
            type="text"
            id="timeLimit"
            name="timeLimit"
            value={time}
            onChange={handleTimeChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">이미지 첨부</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleFilesChange}
          />
        </div>
        <button type="submit">문제 출제</button>
      </form>
      </div>
    </div>
  );
};

export default WriteProblem;
