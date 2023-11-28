import Pagination from "./Pagination";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import HomeButton from "../components/HomeButton";
import Nav from "../components/Nav";
import searchImg from "../serach.png";

const Announcement = () => {
  const [posts, setPosts] = useState(() => {
    const savedPosts = localStorage.getItem("AnnouncementPosts");
    return savedPosts ? JSON.parse(savedPosts) : [];
  });

  /* 검색 기능 */
  const [userInput, setUserInput] = useState("");
  const getValue = (e) => {
    setUserInput(e.target.value.toLowerCase());
  };
  const searched = posts.filter((item) => item.title.includes(userInput));
  /* 검색 기능 */

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  const [adminBool, setAdminBool] = useState(false);
  const savePostsLocally = (data) => {
    localStorage.setItem("AnnouncementPosts", JSON.stringify(data));
  };

  const getInit = async () => {
    if (localStorage.getItem("role") === "ROLE_ADMIN") {
      setAdminBool("true");
      console.log(adminBool);
    } else {
      setAdminBool("false");
    }
    axios
      .get("/api/notice/paging")
      .then((res) => {
        console.log(posts);
        console.log(res.data);
        const sortedPosts = res.data.sort(
          (a, b) => b.questionId - a.questionId
        );
        setPosts(sortedPosts);
        savePostsLocally(sortedPosts); //
      })
      .catch((Error) => {
        console.log(Error);
      });
  };

  useEffect(() => {
    getInit();
  }, []);

  return (
    <div className="Announcement">
      <HomeButton></HomeButton>
      <Nav></Nav>
      <div className="title">
        <strong>Announcement</strong>
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
        <div className="nickname">조회수</div>
      </div>
      <div className="list_wrap">
        <div className="list">
          {userInput.length != 0
            ? searched
                .slice(offset, offset + limit)
                .map(({ noticeId, title, writeTime, readCnt }) => (
                  <Link className="link" to={`/api/notice/${noticeId}`}>
                    <article key={noticeId}>
                      <div>{noticeId}.</div>
                      <div>{title}</div>
                      <div>{writeTime}</div>
                      <div>{readCnt}</div>
                    </article>
                  </Link>
                ))
            : posts
                .slice(offset, offset + limit) // 데이터를 원하는 범위로 슬라이스합니다.
                .map(({ noticeId, title, writeTime, readCnt }) => (
                  <Link className="link" to={`/api/notice/${noticeId}`}>
                    <article key={noticeId}>
                      <div>{noticeId}.</div>
                      <div>{title}</div>
                      <div>{writeTime}</div>
                      <div>{readCnt}</div>
                    </article>
                  </Link>
                ))}
          {/* {posts
            .slice(offset, offset + limit) // 데이터를 원하는 범위로 슬라이스합니다.
            .map(({ noticeId, title, writeTime, readCnt }) => (
              <Link className="link" to={`/api/notice/${noticeId}`}>
                <article key={noticeId}>
                  <div>{noticeId}.</div>
                  <div>{title}</div>
                  <div>{writeTime}</div>
                  <div>{readCnt}</div>
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
            admin={adminBool}
          />
        </div>
      </div>
    </div>
  );
};

export default Announcement;
