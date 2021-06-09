// import dotenv from "dotenv";
const axios = require("axios");
const dotenv = require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 3001;

const cors = require("cors");
const { response } = require("express");

const riotApiKey = process.env.REACT_APP_TEST_API_KEY;

const summonerId = "kfo";

// 소환사 정보를 담는 변수
let lolInfo = "";
let lolInfoState = "";

//소환사 닉네임 서치 및 id값 찾기
const getRiotApiSummonerInfo = async () => {
  const summonerIdEnCode = encodeURI(summonerId);

  const response = await axios.get(
    `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerIdEnCode}?api_key=${riotApiKey}`
  );

  //   response.id의 값으로 respose2의 data반환하여 게임이 잡혔는지 여부의 lolInfoState를 반환
  const response2 = await axios.get(
    `https://kr.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${response.data.id}?api_key=${riotApiKey}`
  );

  return (lolInfo = response.data), (lolInfoState = response2.data);
};

//소환사 닉네임 id값으로 상태 체크
const getRiotApiSummonerState = async (lolInfo) => {
  console.log("lolInfo", lolInfo.id);
  //   const response = await axios.get(
  //     `https://kr.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${lolInfo.id}?api_key=${riotApiKey}`
  //   );
};

getRiotApiSummonerInfo();
getRiotApiSummonerState(lolInfo);

app.use(cors());

app.use(bodyParser.json());
app.use("/api", (req, res) => res.json({ username: "bryan" }));
app.use("/lol", (req, res) =>
  res.json({ id: lolInfo.id, name: lolInfo.name, state: lolInfoState.gameType })
);

app.listen(port, () => {
  console.log(`express is running on ${port}`);
});
