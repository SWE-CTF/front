const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userData = [];

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/api/login", (req, res) => {
  res.json(userData);
});

//회원가입 요청
app.post("/api/register", (req, res) => {
  const data = req.body;
  userData.map((it) => {
    if (it.Nickname === data.Nickname) {
      // 닉네임이 DB에 있는 넥네임과 겹칠 경우 다시 입력 받도록 함
      return res.send("닉네임");
    } else if (it.Email === data.Email) {
      return res.send("이메일");
    }
  });
  userData.push(data);
  console.log(userData);
  return res.send("success");
});

//중복검사
app.post("/api/duplicationcheck", (req, res) => {
  const data = req.body;
  console.log(data);
  if (userData.length === 0) {
    return res.send(false);
  } else {
    userData.map((it) => {
      if (it.Id === data.Id) {
        return res.send(true);
      } else return res.send(false);
    });
  }
});

//서버 4000번 포트로 실행
app.listen(4000, () => {
  console.log("server start");
});
