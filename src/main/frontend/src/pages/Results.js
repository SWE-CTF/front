import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import HomeButton from "../components/HomeButton";
import Nav from "../components/Nav";
import searchImg from "../serach.png";
import useDarkMode from "../theme/useDarkMode";

const Results = () => {
    const [theme, toggleTheme] = useDarkMode();
    const location = useLocation;
    const [posts, setPosts] = useState();
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [status, setStatus] = useState("SUCCESS");
    const [nickName, setNickName] = useState("");
    const [title, setTitle] = useState("");
    const offset = (page - 1) * limit;

    useEffect(() => {
        const fetch = async () => {
            await axios
                .get(`/api/challenge/${location.state.cid}/attempt`, { validateStatus: false })
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
        fetch();
    }, []);

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };

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
                            <input value={title} onChange={handleTitleChange} placeholder="문제 제목" />
                            <select
                                id="status"
                                name="status"
                                defaultValue="SUCCESS"
                                onChange={handleStatusChange}
                            >
                                <option key="SUCCESS">성공</option>)
                                <option key="FAIL">실패</option>)
                                <option key="TIME">시간 초과</option>)
                                <option key="MEMORY">메모리 초과</option>)
                                <option key="ERROR">에러</option>)
                            </select>
                        </form>
                        <img className="Img" src={searchImg}></img>
                    </div>
                </div>
                <div className="list_top">
                    <div className="num">번호</div>
                    <div className="content">제목</div>
                    {/* <div className="challengeId">문제 번호</div> */}
                    <div className="writeTime">결과</div>
                </div>
                <div className="list_wrap">
                    <div className="list">

                    </div>
                    <div className="page">
                        {/* <Pagination
                            total={posts.length}
                            limit={limit}
                            page={page}
                            setPage={setPage}
                        /> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Results;
