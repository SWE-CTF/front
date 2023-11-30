import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeButton from "../components/HomeButton";
import useDarkMode from "../theme/useDarkMode";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [theme, toggleTheme] = useDarkMode();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // 로그인 기준 검사
    if (
      credentials.username.length === 0 ||
      credentials.password.length === 0
    ) {
      alert("아이디와 비밀번호를 입력하세요.");
      return;
    }

    // 서버로 로그인 데이터를 보내는 POST 요청
    try {
      const response = await axios.post("/api/member/login", credentials, {
        withCredentials: true,
      });

      if (response.data) {
        localStorage.setItem("login_token", response.data.token.token);
        localStorage.setItem("login", true);
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("name", response.data.name);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("nickname", response.data.nickname);
        // console.log(localStorage.getItem("login_token"));
        if (response.data.role === undefined) {
          localStorage.setItem("role", "none");
        } else {
          localStorage.setItem("role", response.data.role);
          // console.log(localStorage.getItem("role"));
        }
        navigate("/"); // 로그인 성공 시 마이페이지로 이동
      } else {
        alert("아이디 또는 비밀번호가 일치하지 않습니다.");
      }
    } catch (error) {
      console.error("로그인 실패:", error);
      alert("로그인 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className={`container ${theme.dark ? "dark" : "light"}`}>
      <div className="Login">
        <HomeButton />
        <div className="login">
          <div className="Id">
            <input
              name="username"
              placeholder="ID"
              value={credentials.username}
              onChange={handleInputChange}
            ></input>
          </div>
          <div className="Password">
            <input
              type="password"
              name="password"
              placeholder="PWD"
              value={credentials.password}
              onChange={handleInputChange}
            ></input>
          </div>
        </div>
        <button onClick={handleLogin}>Sign In</button>
      </div>
    </div>
  );
};

export default Login;
