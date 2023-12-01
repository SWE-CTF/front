import React, { useState } from "react";
import Modal from "react-modal";

const Posts = ({ className, posts, loading }) => {
  console.log("H", posts);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const newlineText = (content) => {
    return content.split("\n").map((str) => <p>{str}</p>);
  };
  const resturnCodeState = (codeState) => {
    if (codeState === "SUCCESS") {
      return <span style={{ color: 'green' }}>성공</span>;
    }
    if (codeState === "FAIL" || codeState === "TIME" || codeState === "MEMORY" || codeState === "ERROR") {
      return <span style={{ color: 'red' }}>{codeState === "FAIL" ? "실패" : codeState === "TIME" ? "시간 초과" : codeState === "MEMORY" ? "메모리 초과" : "에러"}</span>;
    }
  };

  return (
    <>
      {loading && <div> loading... </div>}
      <ul>
        {posts.map((post, index) => (
          // <li key={post.challengeId}>
          <div className="Code">
            <div className="id">{post.challengeId}</div>
            <div className="watch">
              <button onClick={() => setModalIsOpen(true)}>코드 보기</button>
            </div>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={() => setModalIsOpen(false)}
            >
              {newlineText(post.code)}
              <button onClick={() => setModalIsOpen(false)}>close</button>
            </Modal>
            <div className="result">{resturnCodeState(post.codeStatus)}</div>
          </div>
        ))}
      </ul>
    </>
  );
};

export default Posts;
