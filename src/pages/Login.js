import { useState } from "react";
import React, { useEffect, useRef } from "react";
import HomeButton from "../components/HomeButton";
import Home from "./Home";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const searchElement = useRef(null); // DOM 요소를 searchElement에 할당

  const navigate = useNavigate(); // 로그인 성공시 메인화면으로 가기위한 네비

  //비밀번호 input에서 엔터누르면 로그인버튼 누르게 설정
  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      onSignIn(); // Enter 입력이 되면 클릭 이벤트 실행
    }
  };

  const onSignIn = async (e) => {
    // e.preventDefault(); // 이 코드 들어가니까 오류 나옴

    console.log(id, pwd);
    await axios
      .post("http://localhost:4000/api/login", { id, pwd })
      .then((res) => {
        if (res.data === true) {
          //로그인 성공시 mypage로 이동
          navigate("/MyPage");
          return;
        } else if (res.data === "ID FALSE") {
          //아이디가 존재하지 않을때
          alert("존재하지 않는 아이디입니다.");
          setId("");
          setPwd("");
        } else {
          alert("비밀번호를 다시 입력하세요"); //아이디는 맞지만 비밀번호를 잘못 입력했을때
          setPwd("");
        }
        // } else {
        //   alert("아이디와 비밀번호를 확인해주세요");
        //   setId("");
        //   setPwd("");
        //   return;
        // }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    if (searchElement.current) {
      // 할당한 DOM 요소가 불러지면 (마운트 되면)
      searchElement.current.focus(); // focus 할당!
    }
  }, []);
  return (
    <div className="Login_Wrap">
      <h2>Login</h2>
      <div className="Login">
        <HomeButton />
        <div className="login">
          <div className="Id">
            <input
              className="id"
              placeholder="ID"
              value={id}
              onChange={(e) => {
                setId(e.target.value);
              }}
              ref={searchElement}
            ></input>
          </div>
          <div className="Password">
            <input
              className="pwd"
              placeholder="PWD"
              type="password"
              value={pwd}
              onKeyPress={handleOnKeyPress}
              onChange={(e) => {
                setPwd(e.target.value);
              }}
            ></input>
          </div>
        </div>
        <button onClick={onSignIn}>sign in</button>
      </div>
    </div>
  );
};

export default Login;
