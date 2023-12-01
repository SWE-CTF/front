import axios from "axios";
import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HomeButton from "../components/HomeButton";
import Nav from "../components/Nav";


const AnnouncementEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const titleRef = useRef();
  const { oldTitle, oldContent, oldQuestionId } = location.state || {}; // 게시물 수정할때 받아온 값
  const initialTitle = oldTitle || ""; // null이면 빈 문자열로 세팅
  const initialContent = oldContent || "";
  const initialQuestionId = oldQuestionId || "";
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  const handleSubmit = () => {
    if (title.length < 1) {
      titleRef.current.focus();
      return;
    }
    if (content.length < 5) {
      alert("본문은 5글자 이상입니다.");
      setContent("");
      return;
    }
    alert("버튼 누름");
    axios
      .post(
        `/api/notice/save`,
        {
          title: title,
          content: content,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("login_token")}`,
          },
        },
        { validateStatus: false}
      )
      .then((res) => {
        if (res.status === 401) {
          alert("로그인하지 않았거나 토큰이 만료되었습니다.");
          navigate("/", { state: { logout: true } })
          return;
        }
        alert("저장 성공!");
        navigate("/Announcement", { replace: true });
        return;
      })
      .catch((error) => {
        // Handle the error here
        console.error("Axios request error:", error);
      });
  };

  return (
    <div className="Ex">
      <Nav></Nav>
      <HomeButton></HomeButton>
      <div className="Body">
        <div className="title">
          <input
            placeholder="write title here"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            ref={titleRef}
          ></input>
        </div>
        <div className="content">
          <textarea
            placeholder="write content here"
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

export default AnnouncementEdit;
