import { useParams } from "react-router-dom";
import { Component, useEffect, useState } from "react";
import Board from "./Board.js";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Nav from "../components/Nav.js";
import HomeButton from "../components/HomeButton.js";

const BoardDetail = () => {
  const { questionId } = useParams(); // /board/:idx와 동일한 변수명으로 데이터를 꺼낼 수 있습니다.
  const [board, setBoard] = useState({});
  const [comment, setComment] = useState("");
  const navigate = useNavigate();
  const { title } = board;
  const { content } = board;
  const { challengeId } = board;

  // 수정 버튼 누르면 지금 게시물 정보를 가지고 editor로 이동
  const handleEditClick = () => {
    // 게시물 정보와 함께 '/edit' 경로로 이동
    navigate(`/Editor`, { state: { title, content, questionId, challengeId } });
  };

  const handleCommentSave = () => {
    if (comment.length < 2) {
      alert("댓글은 2글자 이상 작성해주세요!");
      setComment("");
      return;
    }
    axios
      .post(`http://localhost:8080/api/comment/${questionId}/save`, { comment })
      .then((res) => {
        alert("댓글이 등록되었습니다!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 게시물 삭제
  const handleDelete = () => {
    const confirmDelete = window.confirm("정말로 삭제하시겠습니까?");

    if (confirmDelete) {
      // 사용자가 확인을 누르면 삭제 요청 보내기
      axios
        .delete(`api/question/${questionId}`)
        .then((response) => {
          console.log("게시물 삭제가 완료되었습니다:", response.data);
          navigate("/");
          // 삭제 완료 후 필요한 작업 수행
        })
        .catch((error) => {
          console.error("게시물 삭제에 실패했습니다:", error);
          // 삭제 실패 시 처리할 작업 수행
        });
    }
  };

  // 상세보기들어오면 해당 게시물 정보 가져오는 함수
  const getBoard = async () => {
    const authToken = localStorage.getItem("login_token");
    axios
      .get(`/api/question/${questionId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`, // Authorization 헤더에 토큰 추가
        },
      })
      .then((res) => {
        console.log(res.data);
        setBoard(res.data);
      })
      .catch((Error) => {
        console.log(Error);
      });
  };
  useEffect(() => {
    getBoard();
  }, []);

  return (
    <div className="BoardDetail">
      <Nav></Nav>
      <HomeButton></HomeButton>
      <Board
        questionId={board.questionId}
        title={board.title}
        contents={board.content}
        createdBy={board.writer}
        challengeId={board.challengeId}
      />
      <div className="modify_delete">
        <button className="delete" onClick={handleDelete}>
          삭제
        </button>
        <button className="modify" onClick={handleEditClick}>
          수정
        </button>
      </div>
      <div className="Comment">
        <h3>댓글</h3>
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></input>
        <button onClick={handleCommentSave}>등록</button>
      </div>
    </div>
  );
};
export default BoardDetail;
