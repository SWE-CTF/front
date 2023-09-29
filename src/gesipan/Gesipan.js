import Edit from "./Edit";
import Pagination from "./Pagination";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Gesipan = () => {
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
      <div className="title">
        <strong>질문 게시판</strong>
        <p>모르는 모든 문제를 물어보세요.</p>
      </div>
      <div className="list_top">
        <div className="num">번호</div>
        <div className="content">제목</div>
        <div className="nickname">닉네임</div>
      </div>
      <div className="list_wrap">
        <div className="list">
          {posts
            .slice(offset, offset + limit) // 데이터를 원하는 범위로 슬라이스합니다.
            .map(({ id, title, nickname }) => (
              <article key={id}>
                <div>{id}.</div>
                <div>{title}</div>
                <div>{nickname}</div>
              </article>
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

export default Gesipan;
