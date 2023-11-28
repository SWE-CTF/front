import React from "react";
import { Link } from "react-router-dom";

const Posts = ({ className, posts, loading }) => {
  return (
    <>
      {loading && <div> loading... </div>}
      <ul className="Listul">
        {posts.map((post, index) => (
          <li key={post.challengeId}>
            <Link
                className ="linkList"
              to={`/pages/${post.id}`}
              style={{
                backgroundColor:
                  index % 2 === 0 //0부터 시작
                    // ? JSON.parse(localStorage.getItem("theme"))["dark"]
                    ? className === " dark"
                      ? "#202123" // 짝수번째 링크의 배경색 (다크 모드)
                      : "#fff" // 짝수번째 링크의 배경색 (라이트 모드)
                    // : JSON.parse(localStorage.getItem("theme"))["dark"]
                    : className === " dark"
                    ? "#1b1c1d" // 홀수번째 링크의 배경색 (다크 모드)
                    : "#dfdfdf", // 홀수번째 링크의 배경색 (라이트 모드)
                color:
                  index % 2 === 0
                    ? className === " dark"
                      ? "#fff" // 짝수번째 링크의 텍스트 색상 (다크 모드)
                      : "#202123" // 짝수번째 링크의 텍스트 색상 (라이트 모드)
                    : className === " dark"
                    ? "#fff" // 홀수번째 링크의 텍스트 색상 (다크 모드)
                    : "#202123", // 홀수번째 링크의 텍스트 색상 (라이트 모드)
              }}
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Posts;
