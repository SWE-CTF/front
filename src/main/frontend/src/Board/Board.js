import axios from "axios";
import React, { useEffect, useState } from "react";

const Board = ({
  questionId,
  title,
  contents,
  createdBy,
  challengeId,
  chat,
}) => {
  const [text, setText] = useState("");

  const Submit = () => {
    if (text.length < 2) {
      alert("댓글은 2자 이상 작성해주세요");
      setText("");
      return;
    }

    axios
      .post("http://localhost:8080/api/pushChat", {
        questionId: questionId,
        body: text,
        nickname: "yeongi",
      })
      .then(function (response) {
        alert("제출했음");
        setText("");
        window.location.reload();
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const showChat = () => {
    return (
      <div>
        {chat &&
          chat.map((it) => (
            <div className="Chat">
              <h3>닉네임 : {it.nickname}</h3>
              <div>{it.content}</div>
            </div>
          ))}
      </div>
    );
  };

  useEffect(() => {
    showChat();
  }, []);

  return (
    <div className="Board">
      <div className="info">
        <h2>title : {title}</h2>
        <h5 className="writer">작성자 : {createdBy}</h5>
        <h5 className="num">문제 번호 : {challengeId}</h5>
      </div>
      <div className="info2">
        <p className="content">{contents}</p>
        <button>해당 문제 보기</button>
      </div>
    </div>
  );
};

export default Board;
