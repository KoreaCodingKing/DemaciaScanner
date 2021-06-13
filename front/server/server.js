// import dotenv from "dotenv";
const axios = require("axios");
const dotenv = require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 3001;
const cors = require("cors");

const riotApiKey = process.env.REACT_APP_TEST_API_KEY;

const summonerId = ["kovolt", "구월동원빈", "저렴한 핫바"];
let encodeIdList = [];

let testList = new Array();

app.use(cors());

//인코딩한 아이디 리스트화 encodeIdList로 리턴
const encodeFnc = async () => {
  summonerId.map((user) => {
    const encoding = encodeURI(user);
    return (encodeIdList = encodeIdList.concat(encoding));
    // 리턴값 형태 ['encoded','encoded']
  });
};

//axios 호출 함수
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

  //엔드포인트 지정
  app.use("/lol3", (req, res) => res.json(testList));
};

const getUserData = () => {
  axiosFunc(encodeIdList);
};

encodeFnc();
getUserData();

app.use(bodyParser.json());
app.use("/api", (req, res) => res.json({ username: "bryan" }));

app.listen(port, () => {
  console.log(`express is running on ${port}`);
});
