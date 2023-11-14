import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeButton from "../components/HomeButton";
import Nav from "../components/Nav";
import useDarkMode from "../theme/useDarkMode";

const WriteBoard = () => {
  const [theme, toggleTheme] = useDarkMode();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [files, setFiles] = useState([]);
  const [hint, setHint] = useState("");
  const [memory, setMemory] = useState("");
  const [time, setTime] = useState("");
  const [input1, setInput1] = useState("");
  const [output1, setOutput1] = useState("");
  const [input2, setInput2] = useState("");
  const [output2, setOutput2] = useState("");
  const [input3, setInput3] = useState("");
  const [output3, setOutput3] = useState("");

  const navigate = useNavigate();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleFilesChange = (e) => {
    setFiles(e.target.files);
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

  const handleInputOutputChange = (testCase, e) => {
    const value = e.target.value;
    switch (testCase) {
      case 1:
        setInput1(value);
        break;
      case 2:
        setInput2(value);
        break;
      case 3:
        setInput3(value);
        break;
      default:
        break;
    }
  };

  const handleOutputChange = (testCase, e) => {
    const value = e.target.value;
    switch (testCase) {
      case 1:
        setOutput1(value);
        break;
      case 2:
        setOutput2(value);
        break;
      case 3:
        setOutput3(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const data = {
    title: title,
    content: content,
    categoryId: category,
    time: time,
    memory: memory,
    hint: hint,
    input1: input1,
    output1: output1,
    input2: input2,
    output2: output2,
    input3: input3,
    output3: output3,
  };

  const formData = new FormData();
  formData.append("json", JSON.stringify(data));

  if (files.length > 0) {
    formData.append("image", files[0]);
    console.log("파일 이름:", files[0].name);
  }

  console.log("제목:", title);
  console.log("카테고리:", category);
  console.log("내용:", content);
  console.log("힌트:", hint);
  console.log("메모리 제한:", memory);
  console.log("시간 제한:", time);
  console.log("Test Case 1 (Input):", input1);
  console.log("Test Case 1 (Output):", output1);
  console.log("Test Case 2 (Input):", input2);
  console.log("Test Case 2 (Output):", output2);
  console.log("Test Case 3 (Input):", input3);
  console.log("Test Case 3 (Output):", output3);


  try {
    const response = await axios.post("/api/challenge/save", formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login_token")}`,
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("문제가 성공적으로 등록되었습니다.", response.data);

    navigate("/problems");
  } catch (error) {
    console.error("문제 등록 중 오류가 발생했습니다.", error);

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
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={handleTitleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={category}
              onChange={handleCategoryChange}
            >
              <option value="1">Category 1</option>
              <option value="2">Category 2</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="content">Content</label>
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
                value={input1}
                onChange={(e) => handleInputOutputChange(1, e)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="testCase1Output">Test Case 1 (Output)</label>
              <input
                type="text"
                id="testCase1Output"
                name="testCase1Output"
                value={output1}
                onChange={(e) => handleOutputChange(1, e)}
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
                value={input2}
                onChange={(e) => handleInputOutputChange(2, e)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="testCase2Output">Test Case 2 (Output)</label>
              <input
                type="text"
                id="testCase2Output"
                name="testCase2Output"
                value={output2}
                onChange={(e) => handleOutputChange(2, e)}
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
                value={input3}
                onChange={(e) => handleInputOutputChange(3, e)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="testCase3Output">Test Case 3 (Output)</label>
              <input
                type="text"
                id="testCase3Output"
                name="testCase3Output"
                value={output3}
                onChange={(e) => handleOutputChange(3, e)}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="memory">Memory</label>
            <input
              type="number"
              id="memory"
              name="memory"
              value={memory}
              onChange={handleMemoryChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="timeLimit">Time Limit</label>
            <input
              type="number"
              id="timeLimit"
              name="timeLimit"
              value={time}
              onChange={handleTimeChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">image</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleFilesChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="hint">hint</label>
            <input
              type="text"
              id="hint"
              name="hint"
              value={hint}
              onChange={handleHintChange}
            />
          </div>
          <button type="submit">문제 출제</button>
        </form>
      </div>
    </div>
  );
};

export default WriteBoard;
