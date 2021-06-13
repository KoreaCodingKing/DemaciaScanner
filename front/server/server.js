// import dotenv from "dotenv";
const axios = require("axios");
const dotenv = require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 3001;

const cors = require("cors");
const { response } = require("express");
const { json } = require("body-parser");

const riotApiKey = process.env.REACT_APP_TEST_API_KEY;

const summonerId = ["kovolt", "구월동원빈", "저렴한 핫바"];
let encodeIdList = [];

let testList = new Array();

// 소환사 정보를 담는 변수
let lolInfo = "";
let lolInfoState = "";

//인코딩한 아이디 리스트화 encodeIdList로 리턴
const encodeFnc = async () => {
  summonerId.map((user) => {
    const encoding = encodeURI(user);
    return (encodeIdList = encodeIdList.concat(encoding));
    // 리턴값 ['encoded','encoded']
  });
};

const axiosFunc = async (encodeIdList, index) => {
  encodeIdList.map((item, index) => {
    const response = axios.get(
      `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${item}?api_key=${riotApiKey}`
    );
    Promise.resolve(response).then((getData) => {
      var data = new Object();

      data.name = getData.data.name;
      data.id = getData.data.id;

      testList.push(data);

      console.log(`이름${index} - ${getData.data.name}`);
    });
  });

  app.use("/lol3", (req, res) => res.json(testList));
  // .then((res) => console.log("res.data값 ->", res.data));
  // return response;
};

const getUserData = () => {
  let returnAxiosData = [];
  axiosFunc(encodeIdList);

  // return returnAxiosData;
  // 콘솔 값 [promise, promise]
};

encodeFnc();
getUserData();

// console.log(getUserData());
//소환사 닉네임 서치 및 id값 찾기
const getRiotApiSummonerInfo = async () => {
  const summonerIdEnCode = encodeURI(summonerId[1]);
  // console.log(summonerIdEnCode);

  const response = await axios.get(
    `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerIdEnCode}?api_key=${riotApiKey}`
  );

  return (lolInfo = response.data);
};

// getRiotApiSummonerInfo();

app.use(cors());

app.use(bodyParser.json());
app.use("/api", (req, res) => res.json({ username: "bryan" }));
app.use("/lol", (req, res) =>
  res.json({
    // id: lolInfo.id,
    // name: lolInfo.name,
    // state: lolInfoState.gameType,
    // participants: lolInfoState.gameMode,
  })
);

app.use("/lol2", (req, res) => {
  res.json();
});

app.listen(port, () => {
  console.log(`express is running on ${port}`);
});
