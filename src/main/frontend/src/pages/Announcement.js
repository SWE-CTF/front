import Pagination from "./Pagination";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import HomeButton from "../components/HomeButton";
import Nav from "../components/Nav";

const Announcement = () => {
  const [posts, setPosts] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  const getInit = async () => {
    axios
      .get("http://localhost:8080/api/data")
      .then((res) => {
        console.log(res.data);
        setPosts(res.data);
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
        <strong>Announcement</strong>
      </div>
      <div className="list_top">
        <div className="num">번호</div>
        <div className="content">제목</div>
        {/* <div className="challengeId">문제 번호</div> */}
        <div className="nickname">작성자</div>
      </div>
      <div className="list_wrap">
        <div className="list">
          {posts
            .slice(offset, offset + limit) // 데이터를 원하는 범위로 슬라이스합니다.
            .map(({ questionID, title, nickname, challengeId }) => (
              <Link to={`/api/question/${questionID}`}>
                <article key={questionID}>
                  <div>{questionID}.</div>
                  <div>{title}</div>
                  <div>{challengeId}</div>
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

export default Announcement;
