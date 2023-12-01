import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeButton from "../components/HomeButton";
import useDarkMode from "../theme/useDarkMode";

const Signup = () => {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    passwordCheck: "",
    name: "",
    email: "",
    nickname: "",
    team: ""
  });

  const [theme, toggleTheme] = useDarkMode();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const emailValidation = (email) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  }

  const handleDuplicateCheck = async (e) => {
    alert("not implemented yet");
    return;
    // e.preventDefault();

    // if (userData.username.length <= 5) {
    //   alert("입력값을 확인하세요.");
    //   return;
    // }

    // // TODO: request for duplicate check 
    // const response = await axios.post(
    //   "/api/member/join",
    //   userData
    // );
    // if (response.data === "아이디") {
    //   alert("사용 가능한 아이디입니다!");
    //   return;
    // }
  }

  const handleSignup = async (e) => {
    e.preventDefault();

    // 회원가입 기준 검사
    
    if (
      userData.username.length <= 5 ||
      userData.password.length <= 5 ||
      userData.name.length <= 1 ||
      !emailValidation(userData.email) ||
      userData.nickname.length <= 1
    ) {
      alert("입력값을 확인하세요.");
      return;
    }


    if (userData.password !== userData.passwordCheck) {
      alert("패스워드와 패스워드 중복체크 값이 다릅니다.");
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
      <div className="darkBtn">
        <button onClick={toggleTheme}>
          {theme.dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>
      </div>
      <div className="Signup">
        <HomeButton />
        <div className="impormation">
          <div>
            <div>
              ID:
              <input
                name="username"
                placeholder="ID"
                value={userData.username}
                onChange={handleInputChange}
              ></input>
            </div>
            <div>
              PWD:
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={userData.password}
                onChange={handleInputChange}
              ></input>
            </div>
            <div>
              PWDCHECK:
              <input
                type="password"
                name="passwordCheck"
                placeholder="Password check"
                value={userData.passwordCheck}
                onChange={handleInputChange}
              ></input>
            </div>
            <div>
              NAME:
              <input
                name="name"
                placeholder="Name"
                value={userData.name}
                onChange={handleInputChange}
              ></input>
            </div>
            <div>
              E-MAIL:
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={userData.email}
                onChange={handleInputChange}
              ></input>
            </div>
            <div>
              NICKNAME:
              <input
                name="nickname"
                placeholder="Nickname"
                value={userData.nickname}
                onChange={handleInputChange}
              ></input>
            </div>
          </div>
          <button onClick={handleSignup}>Sign Up</button>
        </div>
        <button className="CheckButton" onClick={handleDuplicateCheck}>Duplicate Check</button>
      </div>
    </div>
  );
};

export default Signup;
