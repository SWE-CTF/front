import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const Modify = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    title: myTitle,
    content: myContent,
    questionID,
    challengeId: myChallenge,
  } = location.state;
  const titleRef = useRef();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [challengeId1, setChallengeId] = useState("");

  const init = () => {
    setTitle(myTitle);
    setContent(myContent);
    setChallengeId(myChallenge);
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
      .put(`http://localhost:8080/api/question/${questionID}`, data)
      .then((response) => {
        console.log("게시물 수정이 완료되었습니다:", response.data);
        alert("수정이 완료되었습니다!");
        navigate(-1);
        // 수정 완료 후 필요한 작업 수행
      })
      .catch((error) => {
        console.error("게시물 수정에 실패했습니다:", error);
        // 수정 실패 시 처리할 작업 수행
      });
  };

  return (
    <div className="Editor">
      <div className="Input">
        <section>
          <div className="title-wrapper">
            제목 :{" "}
            <input
              className="input-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력하세요"
              ref={titleRef}
            />
            번호 :
            <input
              className="input-id"
              value={challengeId1}
              onChange={handleInputNum}
              placeholder="문제 번호"
            />
          </div>
        </section>
        <section>
          <textarea
            placeholder="본문을 입력하세요"
            className="content"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          ></textarea>
        </section>
      </div>
      <section>
        <div className="control-box">
          <div className="cancel-btn-wrapper">
            <button
              className="cancle"
              onClick={() => navigate(-1, { replace: true })}
            >
              취소
            </button>
          </div>
          <div className="submit-btn-wrapper">
            <button className="submit" onClick={handleSubmit}>
              완료
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Modify;
