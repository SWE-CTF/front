import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Basic from "../cherryCookie.webp";
import HomeButton from "../components/HomeButton";
import Nav from "../components/Nav";
import useDarkMode from "../theme/useDarkMode";


const MyPage = () => {
  const [theme, toggleTheme] = useDarkMode();
  const [submitProblem, setSubmitProblem] = useState(false);
  const [solvedProblem, setSolvedProblem] = useState(false);
  const [wrongProblem, setWrongProblem] = useState(false);
  const [rank, setRank] = useState(false);
  const [changeImg, setChangeImg] = useState(false);
  const [changeInformation, setChangeInformation] = useState(false);

  const [dupNicknameBol, SetDupNicknameBol] = useState(false);
  const [nickname, setNickname] = useState("");
  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [checkNewPwd, setCheckNewPwd] = useState("");

  const [imgFile, setImgFile] = useState("");
  const imgRef = useRef();

  const [attemptCount, setAttemptCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [allChallengeId, setAllChallengeId] = useState([]);
  const [correctChallengeId, setCorrectChallengeId] = useState([]);
  const [failChallengeId, setFailChallengeId] = useState([]);

  const [loading, setLoading] = useState(false);

  const checkNickname = async () => {
    const authToken = localStorage.getItem("login_token");
    try {
      const res = await axios.get(`/api/member/profile/check/${nickname}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          validateStatus: false
        },
      });
      if (res.status === 401) {
        alert("토큰이 만료되었거나 로그인하지 않은 사용자입니다.");
        navigate("/", {
          state: {
            logout: true
          }
        });
      }
      alert("사용가능한 닉네임입니다!");
      SetDupNicknameBol(true);
    } catch (e) {
      alert("사용중인 닉네임입니다.");
      console.log(e);
    }
  };

  const getIint = async () => {
    const authToken = localStorage.getItem("login_token");
    try {
      const res = await axios.get("/api/member/profile", {
        headers: {
          Authorization: `Bearer ${authToken}`,
          validateStatus: false
        },
      });
      if (res.status === 401) {
        alert("토큰이 만료되었거나 로그인하지 않은 사용자입니다.");
        navigate("/", {
          state: {
            logout: true
          }
        });
      }
      console.log(res.data);
      setLoading(true);
      setAttemptCount(res.data["attemptCount"]);
      setCorrectCount(res.data["correctCount"]);
      setIncorrectCount(res.data["incorrectCount"]);
      setAllChallengeId(res.data["allChallengeId"]);
      setCorrectChallengeId(res.data["correctChallengeId"]);
      setFailChallengeId(res.data["failChallengeId"]);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getIint();
  }, []);

  //개인정보 수정 전달
  const submit = async () => {
    if (
      nickname.length === 0 ||
      currentPwd.length === 0 ||
      newPwd.length === 0 ||
      checkNewPwd.length === 0
    ) {
      alert("빠짐없이 입력해주세요");
      return;
    }
    if (newPwd !== checkNewPwd) {
      setCheckNewPwd("");
      alert("새로운 비밀번호가 일치하지 않습니다.");
      return;
    }
    if (dupNicknameBol === false) {
      alert("닉네임 중복체크 해주세요!");
      return;
    }
    const authToken = localStorage.getItem("login_token");
    try {
      const res = await axios.post(
        "/api/member/profile",
        {
          nickname: nickname,
          currentPW: currentPwd,
          newPW: newPwd,
          checkNewPw: checkNewPwd,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            validateStatus: false
          },
        }
      );
      if (res.status === 401) {
        alert("토큰이 만료되었거나 로그인하지 않은 사용자입니다.");
        navigate("/", {
          state: {
            logout: true
          }
        });
      }
      console.log(res.data);
      alert("정보 변경 성공!");
      localStorage.setItem("nickname", nickname);
      setChangeInformation(false);
    } catch (e) {
      alert("현재 비밀번호가 일치하지 않습니다.");
      setCurrentPwd("");
      console.log(e);
    }
  };

  // 프로필 사진 바꿀지 확인
  const checkChange = () => {
    const confirmChange = window.confirm("프로필 사진을 변경하시겠습니까?");
    if (confirmChange) {
      setChangeInformation(false);
      return;
    } else {
      window.location.reload();
    }
  };

  // 프로필 사진 저장
  const saveImgFile = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
    setChangeImg(true);
    alert("변경사항을 저장하기 위해 아래쪽 저장 버튼을 눌러주세요!");
  };

  return (
    <div className={`container ${theme.dark ? "dark" : "light"}`}>
      <div className="darkBtn">
        <button onClick={toggleTheme}>
          {theme.dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>
      </div>
      <div className="MyPage">
        <HomeButton />
        <Nav></Nav>
        <div className="wrap">
          <div className="header">
            <div className="information">
              <div className="photo">
                <label className="signup-profileImg-label" htmlFor="profileImg">
                  <img src={imgFile ? imgFile : Basic} alt="프로필 이미지" />
                </label>
              </div>
              <div className="username">
                <strong>{localStorage.getItem("username")}</strong>
              </div>
              <div className="email">
                {localStorage.getItem("email")}{" "}
                <span>{localStorage.getItem("nickname")}</span>
              </div>
            </div>
            <div className={`changeInformation ${theme.dark ? "dark" : "light"}`}>
              <button
                onClick={() => {
                  setChangeInformation((e) => !e);
                  setSubmitProblem(false);
                  setSolvedProblem(false);
                  setWrongProblem(false);
                  setRank(false);
                  setNickname("");
                  setCurrentPwd("");
                  setNewPwd("");
                  setCheckNewPwd("");
                  SetDupNicknameBol(false);
                }}
              >
                개인정보 수정
              </button>
            </div>
            <input
              className="signup-profileImg-input"
              type="file"
              accept="image/*"
              id="profileImg"
              onClick={checkChange}
              onChange={saveImgFile}
              ref={imgRef}
              disabled
            />
          </div>
          <div className="main">
            <div className={`select ${theme.dark ? "dark" : "light"}`}>
              <div>
                <button
                  onClick={() => {
                    setSubmitProblem((e) => !e);
                    setSolvedProblem(false);
                    setWrongProblem(false);
                    setRank(false);
                    setChangeInformation(false);
                  }}
                >
                  제출한 문제
                </button>
                <span className="submited">{attemptCount}</span>
              </div>
              <div>
                <button
                  onClick={() => {
                    setSubmitProblem(false);
                    setSolvedProblem((e) => !e);
                    setWrongProblem(false);
                    setRank(false);
                    setChangeInformation(false);
                  }}
                >
                  맞은 문제
                </button>
                <span className="solve">{correctCount}</span>
              </div>
              <div>
                <button
                  onClick={() => {
                    setSubmitProblem(false);
                    setSolvedProblem(false);
                    setWrongProblem((e) => !e);
                    setRank(false);
                    setChangeInformation(false);
                  }}
                >
                  틀린 문제
                </button>
                <span className="wrong">{incorrectCount}</span>
              </div>

              {/* <div>
                <button
                  onClick={() => {
                    setSubmitProblem(false);
                    setSolvedProblem(false);
                    setWrongProblem(false);
                    setRank((e) => !e);
                    setChangeInformation(false);
                  }}
                  disabled
                >
                  등수
                </button>
                <span className="rank">1</span>
              </div> */}
            </div>
            {loading === false ? (
              <h2 className="loading">loading...</h2>
            ) : (
              <>
                {submitProblem && (
                  <div className="content1">
                    {allChallengeId.length === 0 ? (
                      <span>푼 문제 없음</span>
                    ) : (
                      allChallengeId.map((item, index) => (
                        <Link className="link" to={`/api/MyPage/${item}`}>
                          <span>{item}번 </span>
                        </Link>
                      ))
                    )}
                  </div>
                )}
                {solvedProblem && (
                  <div className="content2">
                    {correctChallengeId.length === 0 ? (
                      <span>푼 문제 없음</span>
                    ) : (
                      correctChallengeId.map((item, index) => (
                        <Link className="link" to={`/api/MyPage/${item}`}>
                          <span>{item}번 </span>
                        </Link>
                      ))
                    )}
                  </div>
                )}
                {wrongProblem && (
                  <div className="content3">
                    {failChallengeId.length === 0 ? (
                      <span>푼 문제 없음</span>
                    ) : (
                      failChallengeId.map((item, index) => (
                        <Link className="link" to={`/api/MyPage/${item}`}>
                          <span>{item}번 </span>
                        </Link>
                      ))
                    )}
                  </div>
                )}
              </>
            )}
            {changeInformation && (
              <div className="changeInput">
                <div className="nickname">
                  <input
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder="nickname"
                  ></input>
                  {dupNicknameBol === false ? (
                    <button className="noCheck" onClick={checkNickname}>
                      check
                    </button>
                  ) : (
                    <button className="Check">check</button>
                  )}
                </div>
                <input
                  type="password"
                  value={currentPwd}
                  onChange={(e) => setCurrentPwd(e.target.value)}
                  placeholder="current password"
                ></input>
                <input
                  type="password"
                  value={newPwd}
                  onChange={(e) => setNewPwd(e.target.value)}
                  placeholder="new password"
                ></input>
                <input
                  type="password"
                  value={checkNewPwd}
                  onChange={(e) => setCheckNewPwd(e.target.value)}
                  placeholder="new password check"
                ></input>
                <button onClick={submit}>submit</button>
              </div>
            )}
          </div>
        </div>
        <div className="save">{changeImg ? <button>저장</button> : ""}</div>
      </div>
    </div>
  );
};

export default MyPage;
