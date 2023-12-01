import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HomeButton from "../components/HomeButton";
import Nav from "../components/Nav";
import RankPagination from "../components/RankPagination";
import { MyContextProvider } from "../components/myContext";
import useDarkMode from "../theme/useDarkMode";

function Problem() {
  const [theme, toggleTheme] = useDarkMode();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
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
    setUserInput(e.target.value);
  };
  const searched = posts.filter((item) => item.title.includes(userInput));
  /* 검색 기능 */

  console.log(searched);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `/api/challenge/search?keyword=`,
          {
            validateStatus: false,
          }
        );

        if (response.status !== 200) {
          throw new Error(`Error! status: ${response.status}`);
        }

        console.log(response.data);
        setPosts(response.data);
        setLoading(false);
        console.log(response.data)
      } catch (error) {
        console.error("게시물을 불러오는 동안 오류가 발생했습니다.", error);
        navigate("/");
      }
    };
    fetchData();
  }, [])

  const onWrite = () => {
    if (localStorage.getItem("login") === "true") {
      navigate("/WriteBoard");
    } else {
      alert("로그인 해주세요");
      navigate(`/login`);
    }
  };

  return (
    <MyContextProvider>
      <div className={`container Problem ${theme.dark ? "dark" : "light"}`}>
      <Nav></Nav>
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
        <div className="title">
          <strong>QuestionBoard</strong>
        </div>
        <div className="list_top">
          <div className="num">번호</div>
          <div className="content">제목</div>
        </div>
        <div className="list_wrap">
          <div className="list">
          {userInput.length != 0 ? (
            searched
              .slice(offset, offset + limit)
              .map(({ challengeId, title }) => (
                <Link className={`link ${theme.dark ? "dark" : "light"}`} to={`/api/question/${challengeId}`}>
                  <article key={challengeId}>
                    <div>{challengeId}</div>
                    <div>{title}</div>
                  </article>
                </Link>
              ))
          ) : (
            
            <>
              {loading && <div> loading... </div>}
                {posts.slice(offset, offset + limit).map((post, index) => (
                    <Link
                      className={`link ${theme.dark ? "dark" : "light"}`}
                      to={`/pages/${post.id}`}
                    >
                  <article key={post.challengeId}>
                      <div>{post.challengeId}</div>
                      <div>{post.title}</div>
                  </article>
                    </Link>
                ))}
            </>
          )}
          </div>
        </div>
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
