import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ChatList from "../components/ChatList.js";
import HomeButton from "../components/HomeButton.js";
import Nav from "../components/Nav.js";
import useDarkMode from "../theme/useDarkMode";
import Board from "./Board.js";


const BoardDetail = () => {
  const [theme, toggleTheme] = useDarkMode();
  const { questionId } = useParams(); // /board/:idx와 동일한 변수명으로 데이터를 꺼낼 수 있습니다.
  const [board, setBoard] = useState({});
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const questionID = questionId;
  const token = localStorage.getItem("login_token");

  const [loading, setLoading] = useState(false);

  //댓글 저장
  const submitCommnet = () => {
    if (content.length < 3) {
      alert("댓글은 3글자 이상 입력하시오");
      return;
    }

    // 요청 데이터 설정
    const requestData = {
      // 요청 본문 데이터를 설정합니다.
      content: content,
    };
    axios
      .post(`/api/comment/${questionId}/save`, requestData, {
        headers: {
          Authorization: `Bearer ${token}`, // Authorization 헤더에 토큰 추가
        },
        validateStatus: false
      },)
      .then((res) => {
        if (res.status === 200) {
          alert("댓글저장 성공");
          window.location.reload();
        } else if (res.status === 404 || res.status === 500) {
          console.log("댓글저장 실패");
        } else if (res.status === 401) {
          alert("로그인하지 않았거나 토큰이 만료되었습니다.");
          navigate("/", { state: {logout : true}})
          return;
        }
      });
  };

  // 댓글 입력하려 할때 로그인 되어있는지 확인
  const checkAuth = () => {
    if (!localStorage.getItem("login")) {
      alert("로그인 해주세요");
      navigate("/login");
      return;
    }
  };

  // 수정 버튼 누르면 지금 게시물 정보를 가지고 editor로 이동
  const handleEditClick = () => {
    // 게시물 정보와 함께 '/edit' 경로로 이동
    navigate(`/QuestionBoardModify`, {
      state: {
        oldTitle: board.title,
        oldContent: board.content,
        oldQuestionId: questionId,
        oldChallengeId: board.challengeId,
      },
    });
  };

  // 게시물 삭제
  const handleDelete = () => {
    const confirmDelete = window.confirm("정말로 삭제하시겠습니까?");
    if (confirmDelete) {
      // 사용자가 확인을 누르면 삭제 요청 보내기
      axios
        .delete(`/api/question/${questionID}`, {
          headers: {
            Authorization: `Bearer ${token}`, // yourTokenHere에 실제 토큰을 넣어주세요
          },
          validateStatus: false
        },)
        .then((res) => {
          if (res.status === 204 || res.status === 200) {
            console.log("게시물 삭제가 완료되었습니다:", res.data);
            navigate("/QuestionBoard");
            // 삭제 완료 후 필요한 작업 수행
          } else if (res.status === 500 || res.status === 404) {
            console.log("에러발생");
          } else if (res.status === 401) {
            alert("로그인하지 않았거나 토큰이 만료되었습니다.");
            navigate("/", { state: {logout : true}})
            return;
          }
        })
        .catch((error) => {
          console.error("게시물 삭제에 실패했습니다:", error);
          // 삭제 실패 시 처리할 작업 수행
        });
    }
  };

  const getBoard = async () => {
    const authToken = localStorage.getItem("login_token");
    try {
      const response = await axios.get(`/api/question/${questionId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        validateStatus: false
      },);

      if (response.status === 401) {
        alert("로그인하지 않았거나 토큰이 만료되었습니다.");
        navigate("/", { state: {logout : true}})
        return;
      }
      console.log(response.data);
      setBoard(response.data);
      setLoading(true);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBoard();
  }, []);

  const isCurrentUserAuthor = () => {
    if (
      localStorage.getItem("nickname") === null ||
      localStorage.getItem("nickname") === undefined
    ) {
      return false;
    }
    const currentUser = localStorage.getItem("nickname"); // 현재 사용자 정보를 가져오는 예시
    return currentUser === board.writer; // 사용자 정보와 게시물 작성자 정보 비교
  };

  return (
    <div className={`container BoardDetail ${theme.dark ? "dark" : "light"}`}>
        <div className={`BoardName ${theme.dark ? "dark" : "light"}`}>
        <Nav></Nav>
        <HomeButton></HomeButton>
        <div className="darkBtn">
          <button onClick={toggleTheme}>
            {theme.dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          </button>
        </div>
        {loading === false ? (
          <h2 className="loading">loading...</h2>
        ) : (
            <Board
              questionId={board.questionId}
              title={board.title}
              contents={board.content}
              createdBy={board.writer}
              challengeId={board.challengeId}
            />
        )}
        <div className="modify_delete">
          {isCurrentUserAuthor() &&
            (board.commentId < 0 ? (
              <button className="delete" onClick={handleDelete}>
                글 삭제
              </button>
            ) : (
              <button className="delete" onClick={handleDelete} disabled>
                글 삭제
              </button>
            ))}
          {isCurrentUserAuthor() &&
            (board.commentId < 0 ? (
              <button className="modify" onClick={handleEditClick}>
                글 수정
              </button>
            ) : (
              <button className="modify" onClick={handleEditClick} disabled>
                글 수정
              </button>
            ))}
        </div>
        <div className={`Comment ${theme.dark ? "dark" : "light"}`}>
          <div className="header">
            <p>write comment here</p>
          </div>
          <div className="content">
            {board.commentId < 0 ? (
              <textarea
                onClick={checkAuth}
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
              ></textarea>
            ) : (
              <textarea
                onClick={checkAuth}
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
                disabled
              ></textarea>
            )}
          </div>
        </div>
        <div class="saveBtn">
          {board.commentId < 0 ? (
            <button className="save" onClick={submitCommnet}>
              댓글 저장
            </button>
          ) : (
            <button className="save" onClick={submitCommnet} disabled>
              댓글 저장
            </button>
          )}
        </div>
        <div className="Comments">
          {Object.keys(board).length > 0 && (
            <ChatList
              list={board.commentList}
              writer={board.writer}
              adoptCommentId={board.commentId}
            />
          )}
        </div>
      </div>
      </div>
  );
};
export default BoardDetail;
