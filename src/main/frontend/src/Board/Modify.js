import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HomeButton from "../components/HomeButton";
import Nav from "../components/Nav";

const Modify = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { oldTitle, oldContent, oldQuestionId, oldChallengeId } =
    location.state;
  const titleRef = useRef();
  const token = localStorage.getItem("login_token");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [challengeId1, setChallengeId] = useState("");

  const init = () => {
    setTitle(oldTitle);
    setContent(oldContent);
    setChallengeId(oldChallengeId);
  };

  useEffect(() => {
    init();
  }, []);

  const handleInputNum = (e) => {
    // 입력된 값에서 숫자 이외의 문자 제거
    const numericValue = e.target.value.replace(/[^0-9]/g, "");
    setChallengeId(numericValue);
  };

  const handleSubmit = () => {
    if (title.length < 1) {
      titleRef.current.focus();
      return;
    }
    if (challengeId1.length < 1) {
      alert("문제 번호는 1이상입니다");
      return;
    }
    if (content.length < 5) {
      alert("본문은 5글자 이상입니다.");
      setContent("");
      return;
    }

    const challengeId = parseInt(challengeId1, 10);
    const data = {
      challengeId,
      title,
      content,
    };

    axios
      .put(`/api/question/${oldQuestionId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        validateStatus: false
      },)
      .then((response) => {
        if (response.status === 200) {
          console.log("게시물 수정이 완료되었습니다:", response.data);
          alert("수정이 완료되었습니다!");
          navigate(-1);
        } else if (response.status === 500) {
          console.log("게시물이 수정되지 않았습니다");
        } else if (response.status === 401) {
          alert("로그인하지 않았거나 토큰이 만료되었습니다.");
          navigate("/", { state: {logout : true}})
          return;
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
        <div className="num">
          <input
            placeholder="write problem num here"
            value={challengeId1}
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
              수정
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modify;
