import HomeButton from "../components/HomeButton";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [userData, setUserData] = useState({
    // 회원가입 데이터 저장할 state
    Id: "",
    Pwd: "",
    Name: "",
    Email: "",
    Nickname: "",
    Team: "",
  });

  const [usableId, setUsableId] = useState(false); // 코드 가져왔는데 먼지 모르겠음 (아이디 중복검사하는 state같은데 그냥 밑에 새로 만듬)
  const [checkIdButton, setCheckIdButton] = useState(false); // 아이디 검사했는지 확인하는 state

  const navigate = useNavigate(); //회원가입 성공시 login페이지로 넘어가기 위한 navigate

  // input onChange 태그에 사용될 함수
  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  //중복검사때 사용될 함수
  const duplicationCheckAPI = async (userid) => {
    let return_value;
    await axios
      .post("http://localhost:4000/api/duplicationcheck/", {
        Id: userData.Id,
      })
      .then((response) => {
        return_value = response.data;
      })
      .catch(function (error) {
        console.log(error);
        return_value = true;
      });
    return return_value;
  };
  //중복검사때 사용될 함수
  const duplicationCheck = () => {
    console.log("아이디 중복검사!");
    if (userData.Id.length <= 5) {
      searchElement.current.focus();
      alert("아이디를 6글자 이상으로 입력하세요");
      return;
    }
    duplicationCheckAPI(userData.Id).then((response) => {
      console.log(response);
      if (response === false) {
        alert("사용 가능한 아이디입니다.");
        setUserData({ ...userData, Id: userData.Id });
        setCheckIdButton(true);
      } else {
        alert("중복된 아이디입니다. 다시 시도하세요.");
        setUsableId(response);
        setUserData({ ...userData, Id: "" });
      }
      console.log("중복체크");
    });
  };

  //회원가입 버튼 누를 시 시작
  const handleSignup = async (e) => {
    e.preventDefault();
    // 서버로 회원가입 데이터를 보내는 POST 요청

    // 회원가입 기준 검사
    if (userData.Id.length <= 5) {
      // + 아이디 중복 검사 했는지
      searchElement.current.focus();
      alert("아이디를 6글자 이상으로 입력하세요");
      return;
    } else if (userData.Pwd.length <= 5) {
      focusPwd.current.focus();
      alert("비밀번호를 6글자 이상으로 입력하세요");
      return;
    } else if (userData.Name.length <= 1) {
      focusName.current.focus();
      alert("이름을 2글자 이상으로 입력하세요");
      return;
    } else if (!userData.Email.includes("@")) {
      focusEmail.current.focus();
      alert("이메일 형식에 맞게 입력하세요");
      return;
    } else if (userData.Nickname.length <= 1) {
      focusNickname.current.focus();
      alert("닉네임을 2글자 이상으로 입력하세요");
      return;
    }

    //회원가입 기준 통과하면 중복검사했는지 검사
    if (checkIdButton === false) {
      alert("중복검사 해주세요");
      return;
    }

    // 중복 검사했으면 데이터에 서버 보냄
    await axios
      .post("http://localhost:4000/api/register", userData)
      .then((response) => {
        if (response.data === "닉네임") {
          // 닉네임이 이미 사용중이면 다시 입력받도록 함
          alert("닉네임이 이미 사용중입니다.");
          setUserData({ ...userData, Nickname: "" });
          focusNickname.current.focus();
          return;
        } else if (response.data === "이메일") {
          // 이메일이 이미 사용중이면 다시 입력받도록 함
          alert("이미 사용중인 이메일입니다.");
          setUserData({ ...userData, Email: "" });
          focusEmail.current.focus();
          return;
        }
        console.log("회원가입 성공:", response.data);
        // 회원가입 성공 시 다른 작업 수행
        alert("회원가입 성공!");
        navigate("/Login");
      })
      .catch((error) => {
        console.error("회원가입 실패:", error);
        // 회원가입 실패 시 에러 처리
        alert("회원가입 다시 해주세요");
      });
  };

  // useRef로 searchElement 변수 생성
  const searchElement = useRef(null);
  // 입력이 잘못되었을 시 포커스 줌
  const focusPwd = useRef();
  const focusName = useRef();
  const focusEmail = useRef();
  const focusNickname = useRef();

  return (
    <div className="Signup">
      <HomeButton />
      <div className="impormation">
        <div>
          <div>
            ID :
            <input
              name="Id"
              placeholder="ID"
              ref={searchElement}
              value={userData.Id}
              onChange={handleInputChange}
            ></input>
          </div>
          <div>
            PWD :
            <input
              name="Pwd"
              placeholder="PWD"
              ref={focusPwd} // 입력 잘못되었을때 해당 input태그에 포커스 줌
              value={userData.Pwd}
              onChange={handleInputChange}
            ></input>
          </div>
          <div>
            NAME :
            <input
              name="Name"
              placeholder="NAME"
              ref={focusName}
              value={userData.Name}
              onChange={handleInputChange}
            ></input>
          </div>
          <div>
            E-MAIL :
            <input
              name="Email"
              placeholder="E-MAIL"
              ref={focusEmail}
              value={userData.Email}
              onChange={handleInputChange}
            ></input>
          </div>
          <div>
            NICKNAME :
            <input
              name="Nickname"
              placeholder="NICKNAME"
              ref={focusNickname}
              value={userData.Nickname}
              onChange={handleInputChange}
            ></input>
          </div>
          <div>
            TEAM :
            <input
              name="Team"
              placeholder="TEAM"
              value={userData.Team}
              onChange={handleInputChange}
            ></input>
          </div>
        </div>
        <button onClick={handleSignup}>Sign Up</button>
      </div>
      <button className="CheckButton" onClick={duplicationCheck}>
        Duplicate Check
      </button>
    </div>
  );
};

export default Signup;
