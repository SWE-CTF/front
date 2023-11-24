import Nav from "../components/Nav";
import HomeButton from "../components/HomeButton";
import React, { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Ex = () => {
  const navigate = useNavigate();

  const titleRef = useRef();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [questionId, setQuestionId] = useState("");

  const handleInputNum = (e) => {
    // 입력된 값에서 숫자 이외의 문자 제거
    const numericValue = e.target.value.replace(/[^0-9]/g, "");
    setQuestionId(numericValue);
  };

  const handleSubmit = () => {
    if (title.length < 1) {
      titleRef.current.focus();
      return;
    }
    if (questionId.length < 1) {
      alert("문제 번호는 1이상입니다");
      return;
    }
    if (content.length < 5) {
      alert("본문은 5글자 이상입니다.");
      setContent("");
      return;
    }
    console.log(`Bearer ${localStorage.getItem("login_token")}`);
    const challengeId = parseInt(questionId, 10);
    const data = {
      challengeId,
      title,
      content,
    };

    axios
      .post(
        "/api/question/save",
        {
          challengeId: challengeId,
          title: title,
          content: content,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("login_token")}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          alert("저장 성공!");
          navigate("/QuestionBoard", { replace: true });
          console.log(`Bearer ${localStorage.getItem("login_token")}`);
          return;
        } else if (res.status === 500 || res.status === 404) {
          alert("업로드 실패.");
          console.log(`Bearer ${localStorage.getItem("login_token")}`);
          return;
        }
      });
  };

  return (
    <div className="Ex">
      <Nav></Nav>
      <HomeButton></HomeButton>
      <div className="Body">
        <div className="title">
          <input
            placeholder="write qeustion title here"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            ref={titleRef}
          ></input>
        </div>
        <div className="num">
          <input
            placeholder="write problem num here"
            value={questionId}
            onChange={handleInputNum}
          ></input>
        </div>
        <div className="content">
          <textarea
            placeholder="write question content here"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          ></textarea>
        </div>
        <div className="button">
          <div>
            <button
              className="cancle"
              onClick={() => navigate(-1, { replace: true })}
            >
              취소
            </button>
          </div>
          <div>
            <button className="save" onClick={handleSubmit}>
              저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ex;
