import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import DarkModeButton from "../components/DarkModeButton";
import useDarkMode from "../theme/useDarkMode";

const Challenges = () => {
  const { postId } = useParams(); // URL에서 파라미터 추출
  const [post, setPost] = useState(null); // 게시물 데이터를 저장할 상태
  const [theme, toggleTheme] = useDarkMode();

  useEffect(() => {
    // postId를 사용하여 해당 게시물의 데이터를 가져오기
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts/${postId}`
        );
        setPost(response.data);
      } catch (error) {
        console.error("게시물을 불러오는 동안 오류가 발생했습니다.", error);
      }
    };

    fetchPost();
  }, [postId]);

  return (
    <div className={`container ${theme.dark ? "dark" : "light"}`}>
      <div className="darkBtn">
          <button onClick={toggleTheme}>
              {theme.dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          </button>
      </div>
      <div className={`ChallengesForm ${theme.dark ? "dark" : "light"}`}>
        <div className="ChallengesContent">
          {post ? (
            <>
              <div className="ChallengesLeft">
                <h2>{post.title}</h2>
                <p>{post.body}</p>
              </div>
              <div className="ChallengesRight">
                <h3>Code Input Area</h3>
              </div>
            </>
          ) : (
            <p>문제를 불러오는 중...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Challenges;

