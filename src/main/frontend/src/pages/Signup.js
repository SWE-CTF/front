import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeButton from "../components/HomeButton";
import useDarkMode from "../theme/useDarkMode";

const Signup = () => {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    name: "",
    email: "",
    nickname: "",
  });

  const [theme, toggleTheme] = useDarkMode();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    // 회원가입 기준 검사
    if (
      userData.username.length <= 5 ||
      userData.password.length <= 5 ||
      userData.name.length <= 1 ||
      !userData.email.includes("@") ||
      userData.nickname.length <= 1
    ) {
      alert("입력값을 확인하세요.");
      return;
    }

    // 서버로 회원가입 데이터를 보내는 POST 요청
    try {
      const response = await axios.post(
        "/api/member/join",
        userData
      );

      if (response.data === "닉네임") {
        alert("닉네임이 이미 사용중입니다.");
        setUserData({ ...userData, nickname: "" });
        return;
      } else if (response.data === "이메일") {
        alert("이미 사용중인 이메일입니다.");
        setUserData({ ...userData, email: "" });
        return;
      }

      console.log("회원가입 성공:", response.data);
      alert("회원가입 성공!");
      navigate("/Login");
    } catch (error) {
      console.error("회원가입 실패:", error);
      alert("회원가입 다시 해주세요");
    }
  };

  return (
    <div className={`container ${theme.dark ? "dark" : "light"}`}>
      <div className="Signup">
        <HomeButton />
        <div className="impormation">
        <h2>Sign up</h2>
          <div className="imporm">
            <div>
              <input
                name="username"
                placeholder="ID"
                value={userData.username}
                onChange={handleInputChange}
              ></input>
                <button className="CheckButton">Duplicate Check</button>
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={userData.password}
                onChange={handleInputChange}
              ></input>
            </div>
            <div>
              <input
                name="name"
                placeholder="Name"
                value={userData.name}
                onChange={handleInputChange}
              ></input>
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={userData.email}
                onChange={handleInputChange}
              ></input>
            </div>
            <div>
              <input
                name="nickname"
                placeholder="Nickname"
                value={userData.nickname}
                onChange={handleInputChange}
              ></input>
            </div>
          </div>
            <div className="buttonContainer">
              <button  className="SignButton" onClick={handleSignup}>Sign Up</button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
