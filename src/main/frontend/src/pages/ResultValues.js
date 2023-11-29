import React, { useState } from "react";
import Modal from "react-modal";

const Posts = ({ className, posts, loading }) => {
    console.log("H", posts);

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const newlineText = (content) => {
        return content.split('\n').map(str => <p>{str}</p>);
    }
    const resturnCodeState = (codeState) => {
        if (codeState == "SUCCESS") {
            return "성공";
        }
        if (codeState == "FAIL") {
            return "실패";
        }
        if (codeState == "TIME") {
            return "시간 초과";
        }
        if (codeState == "MEMORY") {
            return "메모리 초과";
        }
        if (codeState == "ERROR") {
            return "에러";
        }
    }

    return (
        <>
            {loading && <div> loading... </div>}
            <ul >
                {posts.map((post, index) => (
                    // <li key={post.challengeId}>
                    <div>
                        <div>
                            {post.challengeId}
                        </div>
                        <button onClick={() => setModalIsOpen(true)}>코드 보기</button>
                        <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                            {newlineText(post.code)}
                            <button onClick={() => setModalIsOpen(false)}>close</button>
                        </Modal>
                        <div>
                            {resturnCodeState(post.codeStatus)}
                        </div>
                    </div>
                ))}
            </ul >
        </>
    );
};

export default Posts;
