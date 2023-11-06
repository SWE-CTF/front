import { useState } from "react";
import React, { useEffect, useRef } from "react";
import HomeButton from "../components/HomeButton";
import Nav from "../components/Nav";
import Home from "./Home";

const MyPage = () => {
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const searchElement = useRef(null); // DOM 요소를 searchElement에 할당
  const onSignIn = () => {
    console.log(id, pwd);
  };
  useEffect(() => {
    if (searchElement.current) {
      // 할당한 DOM 요소가 불러지면 (마운트 되면)
      searchElement.current.focus(); // focus 할당!
    }
  }, []);
  return (
    <div className="MyPage">
      <HomeButton />
      <Nav></Nav>
      <div className="wrap">
        <div className="header">
          <div className="photo">사진</div>
          <div className="username">
            <strong>{localStorage.getItem("username")}</strong>
          </div>
          <div className="email">{localStorage.getItem("email")}</div>
        </div>
        <div className="main">
          <div>제출한 문제</div>
          <div>맞은 문제</div>
          <div>틀린 문제</div>
          <div>등수</div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
