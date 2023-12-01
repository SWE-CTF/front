import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HomeButton from "../components/HomeButton";
import Nav from "../components/Nav";
import Pagination from "../components/Pagination";
import useDarkMode from "../theme/useDarkMode";
import ResultValues from "./ResultValues";

const Results = () => {
  const [theme, toggleTheme] = useDarkMode();
  const location = useLocation();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("SUCCESS");
  const [postsPerPage, setPostsPerPage] = useState(15);
  const [nickName, setNickName] = useState("");
  const [title, setTitle] = useState("");
  const offset = (page - 1) * limit;
  const token = localStorage.getItem("login_token");
  const [activePage, setActivePage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = posts.slice(indexOfFirst, indexOfLast);

  const handlePageChange = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
    setActivePage(pageNumber);
  }, []);

  const check = () => {
    axios
      .get(
        `api/attempt/member/success`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        { validateStatus: false }
      )
      .then((res) => {
        if (res.status === 200) {
          if (
            !res.data.correctChallengeId.includes(parseInt(location.state.cid))
          ) {
            alert("문제 풀이자에게 제공되는 기능입니다.");
            navigate(`/pages/${location.state.cid}`);
          }
        } else if (res.status === 401) {
          alert("로그인하지 않았거나 토큰이 만료되었습니다.");
          navigate("/", { state: { logout: true } })
          return;
        } else if (res.status === 500 || res.status === 400) {
          alert("에러 발생");
          navigate("/");
        }
      });
  };

  useEffect(() => {
    const fetch = async () => {
      if (location.state === null) {
        navigate("/");
      } else if (location.state.mode === "submit") {
        await axios
          .get(
            `/api/challenge/${location.state.cid}/member`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
            { validateStatus: false }
          )
          .then((res) => {
            if (res.status === 200) {
              setPosts(res.data);
            } else if (res.status === 401) {
              alert("로그인하지 않았거나 토큰이 만료되었습니다.");
              navigate("/", { state: { logout: true } })
              return;
            } else if (res.status === 500 || res.status === 400) {
              alert("에러 발생");
            }
          })
          .catch((error) => {
            console.error("error:", error);
          });
      } else if (location.state.mode === "code") {
        check();
        await axios
          .get(
            `/api/challenge/${location.state.cid}/attempt`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
            { validateStatus: false }
          )
          .then((res) => {
            if (res.status === 200) {
              setPosts(res.data);
            } else if (res.status === 401) {
              alert("로그인하지 않았거나 토큰이 만료되었습니다.");
              navigate("/", { state: { logout: true } })
              return;
            } else if (res.status === 500 || res.status === 400) {
              alert("에러 발생");
            }
          })
          .catch((error) => {
            console.error("error:", error);
          });
      }
    };
    fetch();
  }, []);

  return (
    <div className={`container ${theme.dark ? "dark" : "light"}`}>
      <div className="darkBtn">
        <button onClick={toggleTheme}>
          {theme.dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>
      </div>
      <div className={`Result ${theme.dark ? "dark" : "light"}`}>
        <HomeButton></HomeButton>
        <Nav></Nav>
        <div className="title">
          <strong>Results</strong>
        </div>
        <div className="top">
          <div className="num">번호</div>
          <div className="content">코드</div>
          <div className="writeTime">결과</div>
          <div></div>
        </div>
        <div className="list_wrap">
          <div className="list">
            <ResultValues
              className={` ${theme.dark ? "dark" : "light"}`}
              posts={currentPosts}
              loading={loading}
            />
          </div>
          <div className="page">
            <Pagination
              postsPerPage={10}
              totalPosts={posts.length}
              currentPage={activePage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
