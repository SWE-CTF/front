import { useState } from "react";
import React, { useEffect, useRef } from "react";
import HomeButton from "../components/HomeButton";
import Home from "./Home";

const Login = () => {
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
            onChange={(e) => {
              setPwd(e.target.value);
            }}
          ></input>
        </div>
      </div>
      <button onClick={onSignIn}>sign in</button>
    </div>
  );
};

export default Login;
