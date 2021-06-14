// import dotenv from "dotenv";
const axios = require("axios");
const dotenv = require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 3001;
const cors = require("cors");

const riotApiKey = process.env.REACT_APP_TEST_API_KEY;

const summonerId = ["kovolt", "검은머리사나이"];
let encodeIdList = [];

let encodeJsonList = [];

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
    Promise.resolve(useAxios(item)).then((getData) => {
      var data = new Object();
      data.number = index;
      data.name = getData.data.name;
      data.id = getData.data.id;

      encodeJsonList.push(data);

      // key number의 value로 오름차순 정렬
      encodeJsonList.sort(function (a, b) {
        return a.number - b.number;
      });

      // 인게임여부 확인
      Promise.resolve(useAxiosInGame(data.id))
        .then((getState) => {
          // console.log(getState.data.gameMode);
          console.log(getState.data);
          data.status = "true";
        })
        .catch((err) => {
          console.log("에러입니다", err.response.status);
          data.status = err.response.status === 404 ? "false" : false;
        });
    });
  });

  //엔드포인트 지정
  app.use("/userinfo", (req, res) => res.json(encodeJsonList));
};

// axios 사용
const useAxios = (item) => {
  return axios.get(
    `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${item}?api_key=${riotApiKey}`
  );
};

// 인게임 정보 axios 사용
const useAxiosInGame = (summonerId) => {
  return axios.get(
    `https://kr.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${summonerId}?api_key=${riotApiKey}`
  );
};

//데이터 받아오기
const getUserData = () => {
  axiosFunc(encodeIdList);
};

//조회할 아이디 리스트를 받아, 인코딩
encodeFnc();

//받은 리스트를 axios요청 json리스트화
getUserData();

app.use(bodyParser.json());
app.use("/api", (req, res) => res.json({ username: "bryan" }));

app.listen(port, () => {
  console.log(`express is running on ${port}`);
});
