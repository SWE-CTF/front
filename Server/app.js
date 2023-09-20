const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userData = [
  {
    Id: "yeongi0111",
    Pwd: "120800asd!",
    Name: "yeongi",
    Email: "yeongi0111@naver.com",
    Nickname: "yeongi",
    Team: "null",
  },
];

app.get("/", (req, res) => {
  res.send("hello world");
});

app.post("/api/login", (req, res) => {
  console.log(req.body);
  const data = req.body;
  userData.map((it) => {
    if ((it.Id === data.id) & (it.Pwd === data.pwd)) {
      return res.send(true);
    } else if (it.Id !== data.id) {
      return res.send("ID FALSE");
    } else {
      return res.send("PWD FALSE");
    }
  });
});

//회원가입 요청
app.post("/api/register", (req, res) => {
  const data = req.body;
  userData.map((it) => {
    if (it.Nickname === data.Nickname) {
      // 닉네임이 DB에 있는 닉네임과 겹칠 경우 다시 입력 받도록 함
      console.log("닉네임 겹침");
      return res.send("닉네임");
    } else if (it.Email === data.Email) {
      console.log("이메일 겹침");
      return res.send("이메일");
    } else {
      userData.push(data);
      console.log(userData);
      return res.send("success");
    }
  });
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
