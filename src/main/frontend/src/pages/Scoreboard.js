import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HomeButton from "../components/HomeButton";
import Posts from "../components/Posts";
import { MyContextProvider } from "../components/myContext";
import Pagination from "../pages/Pagination";
import useDarkMode from "../theme/useDarkMode";

function Scoreboard () {
    const [theme, toggleTheme] = useDarkMode();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);
  
    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        setPosts(response.data); // response.data가 배열인 경우
        setLoading(false);
      };
      fetchData();
    }, []);
    
    const indexOfLast = currentPage * postsPerPage;
    const indexOfFirst = indexOfLast - postsPerPage;
    const currentPosts = (posts) => {
      let currentPosts = 0;
      currentPosts = posts.slice(indexOfFirst, indexOfLast);
      return currentPosts;
    };

    const handlePageChange = useCallback((pageNumber) => {
      setCurrentPage(pageNumber);
    }, []);

    return (
      <MyContextProvider>
        <div className={`container ${theme.dark ? "dark" : "light"}`}>
            <HomeButton />
            <div className="darkBtn">
                <button onClick={toggleTheme}>
                    {theme.dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                </button>
            </div>
            <div className="List">
              <Posts className={`linkList ${theme.dark ? "dark" : "light"}`}
                posts={currentPosts(posts)}
                loading={loading}>
              </Posts>
            </div>
            <Pagination
              postsPerPage={10} // 페이지당 목록 개수를 10으로 설정
              totalPosts={posts.length}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
            <Link to="/WriteBoard" className={` ${theme.dark ? "dark" : "light"}`}>
              <button>글쓰기</button>
            </Link>
        </div>
        </MyContextProvider>
    );
};

export default Scoreboard;