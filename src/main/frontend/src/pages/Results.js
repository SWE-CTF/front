import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import HomeButton from "../components/HomeButton";
import Nav from "../components/Nav";
import Pagination from "../components/Pagination";
import searchImg from "../serach.png";
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

    const indexOfLast = currentPage * postsPerPage;
    const indexOfFirst = indexOfLast - postsPerPage;
    const currentPosts = posts.slice(indexOfFirst, indexOfLast);

    const handlePageChange = useCallback((pageNumber) => {
        setCurrentPage(pageNumber);
        setActivePage(pageNumber);
    }, []);

    useEffect(() => {
        const fetch = async () => {

            if (location.state === null) {
                await axios
                    .get(`/api/attempt/member`, {
                        headers: {
                            Authorization: `Bearer ${token}`, // yourTokenHere에 실제 토큰을 넣어주세요
                        },
                    }, { validateStatus: false })
                    .then((res) => {
                        if (res.status === 200) {
                            setPosts(res.data);
                        } else if (res.status === 500 || res.status === 400) {
                            alert("에러 발생");
                        }
                    })
                    .catch((error) => {
                        console.error("error:", error);
                    });
            } else if (location.state.submitted === true) {
                await axios
                    .get(`/api/challenge/${location.state.cid}/member`, {
                        headers: {
                            Authorization: `Bearer ${token}`, // yourTokenHere에 실제 토큰을 넣어주세요
                        },
                    }, { validateStatus: false })
                    .then((res) => {
                        if (res.status === 200) {
                            setPosts(res.data);
                        } else if (res.status === 500 || res.status === 400) {
                            alert("에러 발생");
                        }
                    })
                    .catch((error) => {
                        console.error("error:", error);
                    });
            }
        }
        fetch();
    }, []);


    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }

    const handleNameChange = (e) => {
        setNickName(e.target.value);
    }

    return (
        <div className={`container ${theme.dark ? "dark" : "light"}`}>
            <div className="darkBtn">
                <button onClick={toggleTheme}>
                    {theme.dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                </button>
            </div>
            <div className={`Gesipan ${theme.dark ? "dark" : "light"}`}>
                <HomeButton></HomeButton>
                <Nav></Nav>
                <div className="title">
                    <strong>Results</strong>
                    {/* <div className="search"> */}
                    <div>
                        <form>
                            <input value={title} onChange={handleTitleChange} placeholder="문제 번호" />
                        </form>
                        <img className="Img" src={searchImg}></img>
                    </div>
                </div>
                <div className="list_top">
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
                            postsPerPage={15}
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
