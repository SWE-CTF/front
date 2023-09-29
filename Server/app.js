const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

let id = 6;
let data = [
  {
    id: 6,
    title: "1번 질문있어요",
    body: "fasfsdfasdf",
    nickname: "yeongi",
  },
  {
    id: 5,
    title: "2번 질문있음",
    body: "fㄴㅇㄻㄴㅇㅁㄴㅇㄻㅇㄴㄹ",
    nickname: "hadong",
  },
  { id: 4, title: "4번 질문있어요", body: "fasfsdfasdf", nickname: "hahahaha" },
  {
    id: 3,
    title: "412412번 질문있어요",
    body: "fasfsdfasdf",
    nickname: "yeosafdasdngi",
  },
  {
    id: 2,
    title: "2124번 질문있어요",
    body: "fasfsdfasdf",
    nickname: "yedfasdongi",
  },
  {
    id: 1,
    title: "41234123번 질문있어요",
    body: "fasfsdfasdf",
    nickname: "yeongsdfasdi",
  },
];

// const getData = async () => {
//   const res = await fetch("https://jsonplaceholder.typicode.com/comments").then(
//     (res) => res.json()
//   );
//   data = res.slice(0, 20).map((it) => {
//     id = it.id;
//     return {
//       id: it.id,
//       title: it.title,
//       body: it.body,
//     };
//   });
//   data.sort((a, b) => b.id - a.id);
//   return data;
// };

// getData().then((result) => {
//   app.listen(8080, function () {
//     console.log("Server start");
//   });
// });

app.listen(8080, function () {
  console.log("Server start");
});

app.get("/api/data", function (req, res) {
  res.send(data);
});

app.post("/api/v0/post", function (req, res) {
  const requestData = req.body;
  console.log(requestData);
  id = id + 1;
  const newItem = {
    id: id,
    title: requestData["title"],
    body: requestData["body"],
    nickname: requestData["nickname"],
  };
  data = [newItem, ...data];
  console.log(data);
  res.status(200).json({ message: "POST 요청이 성공적으로 처리되었습니다." });
});
