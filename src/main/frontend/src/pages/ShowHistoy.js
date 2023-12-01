import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HomeButton from "../components/HomeButton";
import Nav from "../components/Nav";

const ShowHistory = () => {
  const { item } = useParams();
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);

  const goBack = () => {
    navigate(-1);
  };

  const getInit = async () => {
    const authToken = localStorage.getItem("login_token");
    try {
      const res = await axios.get(`/api/member/profile/challenge/${item}`, {
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
      setHistory(res.data);
      console.log(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getInit();
  }, []);

  return (
    <div className="ShowHistory">
      <HomeButton></HomeButton>
      <Nav></Nav>
      <button onClick={goBack}>[돌아가기]</button>
      {history.length === 0 ? (
        <h2>loading...</h2>
      ) : (
        history.map(({ code, codeStatus }, index) => (
          <div key={index}>
            <h2>
              {index + 1}. {codeStatus}
            </h2>
            <p>{code}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ShowHistory;
