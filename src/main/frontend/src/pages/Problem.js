import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeButton from "../components/HomeButton";
import Nav from "../components/Nav";
import RankPagination from "../components/RankPagination";
import Posts from "../components/Posts";
import { MyContextProvider } from "../components/myContext";
import useDarkMode from "../theme/useDarkMode";
import { Link } from "react-router-dom";

function Problem() {
  const [theme, toggleTheme] = useDarkMode();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(15);
  const [activePage, setActivePage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  const [searchQuery, setSearchQuery] = useState({
    challengeTitle: "",
    challengeCategory: "",
  });
  const navigate = useNavigate();

  /* 검색 기능 */
  const [userInput, setUserInput] = useState("");
  const getValue = (e) => {
    setUserInput(e.target.value.toLowerCase());
  };
  const searched = posts.filter((item) => item.title.includes(userInput));
  /* 검색 기능 */

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `/api/challenge/search?keyword=${searchQuery.challengeTitle}`,
          {
            validateStatus: false,
          }
        );

        if (response.status !== 200) {
          throw new Error(`Error! status: ${response.status}`);
        }

        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("게시물을 불러오는 동안 오류가 발생했습니다.", error);
        navigate("/");
      }
    };
    fetchData();
  }, []);

  // const handleSearch = async (e) => {
  //   e.preventDefault();

  //   const fetchData = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await axios.get(
  //         `/api/challenge/search?keyword=${searchQuery.challengeTitle}`,
  //         { validateStatus: false }
  //       );
  //       console.log(
  //         `/api/challenge/search?keyword=${searchQuery.challengeTitle}`
  //       );
  //       setPosts(response.data);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("게시물을 검색하는 동안 오류가 발생했습니다.", error);
  //       navigate("/");
  //     }
  //   };
  //   fetchData();
  // };

  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };

  const handleInputChange = (e) => {
    setSearchQuery({
      ...searchQuery,
      [e.target.name]: e.target.value,
    });
  };

  const onWrite = () => {
    if (localStorage.getItem("login") === "true") {
      navigate("/WriteBoard");
    } else {
      alert("로그인 해주세요");
      navigate(`/login`);
    }
  };

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = posts.slice(indexOfFirst, indexOfLast);

  const handlePageChange = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
    setActivePage(pageNumber);
  }, []);

  return (
    <MyContextProvider>
      <Nav></Nav>
      <div className={`container ${theme.dark ? "dark" : "light"}`}>
        <HomeButton />
        <div className="darkBtn">
          <button onClick={toggleTheme}>
            {theme.dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          </button>
        </div>
        <div className={`problemSearch ${theme.dark ? "dark" : "light"}`}>
          <form>
            <input value={userInput} onChange={getValue} />
          </form>
        </div>
        <div className={`List ${theme.dark ? "dark" : "light"}`}>
          {userInput.length != 0 ? (
            searched
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
          ) : (
            <>
              {loading && <div> loading... </div>}
              <ul className="Listul">
                {posts.slice(offset, offset + limit).map((post, index) => (
                  <li key={post.challengeId}>
                    <Link
                      className="linkList"
                      to={`/pages/${post.id}`}
                      // style={{
                      //   backgroundColor:
                      //     index % 2 === 0 //0부터 시작
                      //       ? // ? JSON.parse(localStorage.getItem("theme"))["dark"]
                      //         className === "dark"
                      //         ? "#202123" // 짝수번째 링크의 배경색 (다크 모드)
                      //         : "#fff" // 짝수번째 링크의 배경색 (라이트 모드)
                      //       : // : JSON.parse(localStorage.getItem("theme"))["dark"]
                      //       className === "dark"
                      //       ? "#1b1c1d" // 홀수번째 링크의 배경색 (다크 모드)
                      //       : "#dfdfdf", // 홀수번째 링크의 배경색 (라이트 모드)
                      //   color:
                      //     index % 2 === 0
                      //       ? className === "dark"
                      //         ? "#fff" // 짝수번째 링크의 텍스트 색상 (다크 모드)
                      //         : "#202123" // 짝수번째 링크의 텍스트 색상 (라이트 모드)
                      //       : className === "dark"
                      //       ? "#fff" // 홀수번째 링크의 텍스트 색상 (다크 모드)
                      //       : "#202123", // 홀수번째 링크의 텍스트 색상 (라이트 모드)
                      // }}
                    >
                      {post.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        <div className="Pages">
          {/* <Pagination
            postsPerPage={15}
            totalPosts={posts.length}
            currentPage={activePage}
            onPageChange={handlePageChange}
          /> */}
          <RankPagination
            total={posts.length}
            limit={limit}
            page={page}
            setPage={setPage}
          />
          <div className={`WriteBtn ${theme.dark ? "dark" : "light"}`}>
            <button onClick={onWrite}>set exam questions</button>
          </div>
        </div>
      </div>
    </MyContextProvider>
  );
}

export default Problem;
