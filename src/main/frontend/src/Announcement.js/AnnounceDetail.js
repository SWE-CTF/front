import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HomeButton from "../components/HomeButton.js";
import Nav from "../components/Nav.js";
import useDarkMode from "../theme/useDarkMode";
import Board from "./Board.js";


const AnnounceDetail = () => {
  const [theme, toggleTheme] = useDarkMode();
  const { noticeId } = useParams(); // /board/:idx와 동일한 변수명으로 데이터를 꺼낼 수 있습니다.
  const [board, setBoard] = useState({});
  const [content, setContent] = useState("");
  const [admin, setAdmin] = useState(false);
  const navigate = useNavigate();
  const noticeID = noticeId;
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("login_token");

  // 수정 버튼 누르면 지금 게시물 정보를 가지고 editor로 이동
  const handleEditClick = () => {
    // 게시물 정보와 함께 '/edit' 경로로 이동
    navigate(`/AnnouncementModify`, {
      state: {
        oldTitle: board.title,
        oldContent: board.content,
        oldNoticeId: noticeId,
      },
    });
  };

  // 게시물 삭제
  const handleDelete = () => {
    const confirmDelete = window.confirm("정말로 삭제하시겠습니까?");
    if (confirmDelete) {
      // 사용자가 확인을 누르면 삭제 요청 보내기
      axios
        .delete(`/api/notice/${noticeId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // yourTokenHere에 실제 토큰을 넣어주세요
          },
        })
        .then((res) => {
          if (res.status === 204 || res.status === 200) {
            console.log("게시물 삭제가 완료되었습니다:", res.data);
            navigate("/Announcement");
            // 삭제 완료 후 필요한 작업 수행
          } else if (res.status === 500 || res.status === 404) {
            console.log("에러발생");
          }
        })
        .catch((error) => {
          console.error("게시물 삭제에 실패했습니다:", error);
          // 삭제 실패 시 처리할 작업 수행
        });
    }
  };

  const getBoard = async () => {
    if (localStorage.getItem("role") === "ROLE_ADMIN") {
      setAdmin("true");
    } else {
      setAdmin("false");
    }
    const authToken = localStorage.getItem("login_token");
    try {
      const response = await axios.get(`/api/notice/${noticeId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
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

  return (
    <div className={`AnnounceDiv container ${theme.dark ? "dark" : "light"}`}>
      <div className="BoardDetail">
      <div className="darkBtn">
          <button onClick={toggleTheme}>
            {theme.dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          </button>
        </div>
        <Nav></Nav>
        <HomeButton></HomeButton>
        {loading === false ? (
          <h2 className="loading">loading...</h2>
        ) : (
          <Board
            noticeId={board.noticeId}
            title={board.title}
            contents={board.content}
            createdBy={board.writer}
          />
        )}
        <div className="modify_delete">
          {admin === "true" ? (
            <div>
              <button className="delete" onClick={handleDelete}>
                글 삭제
              </button>
              <button className="modify" onClick={handleEditClick}>
                글 수정
              </button>
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div></div>
        {/* <div className="emotion">
          <div className="like">Like : {board.like}</div>
          <div className="dislike">dislike : {board.dislike}</div>
        </div> */}
      </div>
    </div>
  );
};
export default AnnounceDetail;
