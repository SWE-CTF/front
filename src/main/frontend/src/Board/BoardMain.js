import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import HomeButton from "../components/HomeButton";
import Nav from "../components/Nav";
import searchImg from "../serach.png";
import useDarkMode from "../theme/useDarkMode";
import Pagination from "./Pagination";

const BoardMain = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [theme, toggleTheme] = useDarkMode();
  const [posts, setPosts] = useState(() => {
    const savedPosts = localStorage.getItem("posts");
    return savedPosts ? JSON.parse(savedPosts) : [];
  });
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  //로컬스토리지에 posts라는 변수로 저장하는 함수
  const savePostsLocally = (data) => {
    localStorage.setItem("posts", JSON.stringify(data));
  };

  /* 검색 기능 */
  const [userInput, setUserInput] = useState("");
  const getValue = (e) => {
    setUserInput(e.target.value.toLowerCase());
  };
  const searched = posts.filter((item) => item.title.includes(userInput));
  /* 검색 기능 */

  const getInit = async () => {
    if (location.state === null) {
      await axios
        .get("/api/question/paging")
        .then((res) => {
          console.log(res.data);
          console.log(posts);
          const sortedPosts = res.data.sort(
            (a, b) => b.questionId - a.questionId
          );
          setPosts(sortedPosts);
          savePostsLocally(sortedPosts); //
        })
        .catch((Error) => {
          console.log(Error);
        });
    } else {
      await axios
      .get(`/api/question/challenge/${location.state.cid}`, { validateStatus: false })
      .then(res => {
        if (res.status === 404) {
          setPosts([]);
          savePostsLocally([]);
        } else {
          console.log(res.data);
          console.log(posts);
          const sortedPosts = res.data.sort(
            (a, b) => b.questionId - a.questionId
          );
          setPosts(sortedPosts);
          savePostsLocally(sortedPosts);
        }
      })
      .catch((Error) => {
        console.error(Error);
      });
    }
  };

  useEffect(() => {
    getInit();
  }, []);

  return (
    <div className={`container ${theme.dark ? "dark" : "light"}`}>
      <div className="darkBtn">
        <button onClick={toggleTheme}>
          {theme.dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>
      </div>
      <div className={`Gesipan ${theme.dark ? "dark" : "light"}`}>
        <HomeButton></HomeButton>
        <Nav></Nav>
        <div className="title">
          <strong>QuestionBoard</strong>
          <div className="search">
            <input value={userInput} onChange={getValue} />
            <img className="Img" src={searchImg}></img>
          </div>
        </div>
        <div className="list_top">
          <div className="num">번호</div>
          <div className="content">제목</div>
          {/* <div className="challengeId">문제 번호</div> */}
          <div className="writeTime">작성 시간</div>
          <div className="nickname">닉네임</div>
        </div>
        <div className="list_wrap">
          <div className="list">
            {userInput.length != 0
              ? searched
                .slice(offset, offset + limit)
                .map(({ questionId, title, nickname, writeTime }) => (
                  <Link className="link" to={`/api/question/${questionId}`}>
                    <article key={questionId}>
                      <div>{questionId}.</div>
                      <div>{title}</div>
                      <div>{writeTime}</div>
                      <div>{nickname}</div>
                    </article>
                  </Link>
                ))
              : posts
                .slice(offset, offset + limit) // 데이터를 원하는 범위로 슬라이스합니다.
                .map(({ questionId, title, nickname, writeTime }) => (
                  <Link className="link" to={`/api/question/${questionId}`}>
                    <article key={questionId}>
                      <div>{questionId}.</div>
                      <div>{title}</div>
                      <div>{writeTime}</div>
                      <div>{nickname}</div>
                    </article>
                  </Link>
                ))}
            {/* {posts
              .slice(offset, offset + limit) // 데이터를 원하는 범위로 슬라이스합니다.
              .map(({ questionId, title, nickname, writeTime }) => (
                <Link className="link" to={`/api/question/${questionId}`}>
                  <article key={questionId}>
                    <div>{questionId}.</div>
                    <div>{title}</div>
                    <div>{writeTime}</div>
                    <div>{nickname}</div>
                  </article>
                </Link>
              ))} */}
          </div>
          <div className="page">
            <Pagination
              total={posts.length}
              limit={limit}
              page={page}
              setPage={setPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardMain;
