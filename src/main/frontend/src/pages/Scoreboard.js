import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HomeButton from "../components/HomeButton";
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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      setPosts(response.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = posts.slice(indexOfFirst, indexOfLast);

  const handlePageChange = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
    setActivePage(pageNumber);
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
          <Link
            to="/WriteBoard"
            className={`WriteBtn ${theme.dark ? "dark" : "light"}`}
          >
            <button>set exam questions</button>
          </Link>
        </div>
      </div>
    </MyContextProvider>
  );
}

export default Scoreboard;
