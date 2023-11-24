import Pagination from "./Pagination";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import HomeButton from "../components/HomeButton";
import Nav from "../components/Nav";

const BoardMain = () => {
  const [posts, setPosts] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  const getInit = async () => {
    axios
      .get("/api/question/paging")
      .then((res) => {
        console.log(res.data);
        const sortedPosts = res.data.sort(
          (a, b) => b.questionId - a.questionId
        );

        setPosts(sortedPosts);
      })
      .catch((Error) => {
        console.log(Error);
      });
  };

  useEffect(() => {
    getInit();
  }, []);

  return (
    <div className="Gesipan">
      <HomeButton></HomeButton>
      <Nav></Nav>
      <div className="title">
        <strong>QuestionBoard</strong>
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
          {posts
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
  );
};

export default BoardMain;
