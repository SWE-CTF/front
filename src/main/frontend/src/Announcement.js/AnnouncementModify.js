import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HomeButton from "../components/HomeButton";
import Nav from "../components/Nav";

const AnnouncementModify = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { oldTitle, oldContent, oldNoticeId } = location.state;
  const titleRef = useRef();
  const token = localStorage.getItem("login_token");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [challengeId1, setChallengeId] = useState("");

  const init = () => {
    setTitle(oldTitle);
    setContent(oldContent);
    console.log(oldNoticeId);
  };

  useEffect(() => {
    init();
  }, []);

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

    const data = {
      title,
      content,
    };

    axios
      .put(`/api/notice/${oldNoticeId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          validateStatus: false
        },
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("게시물 수정이 완료되었습니다:", response.data);
          alert("수정이 완료되었습니다!");
          navigate(-1);
        } else if (response.status === 500) {
          console.log("게시물이 수정되지 않았습니다");
        } else if (res.status === 401) {
          alert("토큰이 만료되었거나 로그인하지 않은 사용자입니다.");
          navigate("/", {
            state: {
              logout: true
            }
          });
        }
        // 수정 완료 후 필요한 작업 수행
      })
      .catch((error) => {
        console.error("게시물 수정에 실패했습니다:", error);
        // 수정 실패 시 처리할 작업 수행
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
              수정
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementModify;
