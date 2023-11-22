import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeButton from "../components/HomeButton";
import Nav from "../components/Nav";
import Pagination from "../components/Pagination";
import Posts from "../components/Posts";
import { MyContextProvider } from "../components/myContext";
import useDarkMode from "../theme/useDarkMode";

function Scoreboard() {
  const [theme, toggleTheme] = useDarkMode();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(15);
  const [activePage, setActivePage] = useState(1);
  const [searchQuery, setSearchQuery] = useState({
    challengeTitle: "",
    challengeCategory: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "api/challenge/paging"
        );
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        alert("게시물을 불러오는데 실패했습니다.");
        console.error("게시물을 불러오는 동안 오류가 발생했습니다.", error);
        navigate("/");
      }
    };
    fetchData();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "/api/challenge/search?keyword=" + searchQuery.challengeTitle
        );
        console.log("/api/challenge/search?keyword=" + searchQuery.challengeTitle);
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        alert("게시물을 불러오는데 실패했습니다.");
        console.error("게시물을 검색하는 동안 오류가 발생했습니다.", error);
        navigate("/");
      }
    };
    fetchData();
  }

  const handleOnKeyPress = (e) => {
    if (e.key === 'Enter') {
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
        {/* TODO: css design */}
        <form>
          <div>
            <input
              name="challengeTitle"
              placeholder="Search Challenge"
              value={searchQuery.challengeTitle}
              onChange={handleInputChange}
              onKeyDown={handleOnKeyPress}
            />
          </div>
          <button onClick={handleSearch}>Search</button>
        </form>
        <div className="List">
          <Posts
            className={`linkList ${theme.dark ? "dark" : "light"}`}
            posts={currentPosts}
            loading={loading}
          ></Posts>
        </div>
        <div className="Pages">
          <Pagination
            postsPerPage={15}
            totalPosts={posts.length}
            currentPage={activePage}
            onPageChange={handlePageChange}
          />
          <div
            className={`WriteBtn ${theme.dark ? "dark" : "light"}`}
          >
            <button onClick={onWrite}>set exam questions</button>
          </div>
        </div>
      </div>
    </MyContextProvider>
  );
}

export default Scoreboard;
