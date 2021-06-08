// import dotenv from "dotenv";
const axios = require("axios");
const dotenv = require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 3001;

const cors = require("cors");

const riotApiKey = process.env.REACT_APP_TEST_API_KEY;

const summonerId = "구월동원빈";

//소환사 닉네임 서치 및 id값 찾기
function getRiotApiSummonerInfo() {
  const summonerIdEnCode = encodeURI(summonerId);

  axios
    .get(
      `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerIdEnCode}?api_key=${riotApiKey}`
    )
    .then((res) => res.data)
    .then((post) => {
      lolName = post.name;
      lolId = post.id;
      console.log(post.name);
    });

  //   console.log(encodeStr);
}

//소환사 닉네임 id값으로 상태 체크

// 한글 소환사 닉네임 인코딩 변환 function

getRiotApiSummonerInfo();

app.use(cors());

app.use(bodyParser.json());
app.use("/api", (req, res) => res.json({ username: "bryan" }));
app.use("/lol", (req, res) => res.json({ name: lolName, id: lolId }));
// app.use(
//   "https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/kovolt?api_key=RGAPI-95c1f6e8-c4f6-4c16-9acb-8940f7060b02",
//   (res) => res.json({ id: res.id })
// );

app.listen(port, () => {
  console.log(`express is running on ${port}`);
});
