import axios from "axios";
import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HomeButton from "../components/HomeButton";
import Nav from "../components/Nav";
import useDarkMode from "../theme/useDarkMode";

const Ex = () => {
  const [theme, toggleTheme] = useDarkMode();
  const navigate = useNavigate();
  const location = useLocation();
  const titleRef = useRef();
  const { oldTitle, oldContent, oldQuestionId } = location.state || {}; // 게시물 수정할때 받아온 값
  const initialTitle = oldTitle || ""; // null이면 빈 문자열로 세팅
  const initialContent = oldContent || "";
  const initialQuestionId = oldQuestionId || "";
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [questionId, setQuestionId] = useState(initialQuestionId);

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
        `/api/question/save`,
        {
          challengeId: challengeId,
          title: title,
          content: content,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("login_token")}`,
          },
          validateStatus: false
        },
      )
      .then((res) => {
        // if (res.statusCode === 200 || res.statusCode === 404) {
        //   alert("저장 성공!");
        //   navigate("/QuestionBoard", { replace: true });
        //   return;
        // } else if (res.status === 500) {
        //   alert("업로드 실패.");
        //   return;
        // }
        if (res.status === 401) {
          alert("로그인하지 않았거나 토큰이 만료되었습니다.");
          navigate("/", { state: {logout : true}})
          return;
        }
        alert("저장 성공!");
        navigate("/QuestionBoard", { replace: true });
        return;
      })
      .catch((error) => {
        // Handle the error here
        alert("문제 번호가 존재하지않습니다!");
        console.error("Axios request error:", error);
      });
  };

  return (
    <div className={`Ex container ${theme.dark ? "dark" : "light"}`}>
      <Nav></Nav>
      <HomeButton></HomeButton>
      <div className="darkBtn">
        <button onClick={toggleTheme}>
          {theme.dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>
      </div>
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
