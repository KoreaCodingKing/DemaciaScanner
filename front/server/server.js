// import dotenv from "dotenv";
const axios = require("axios");
const dotenv = require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 3001;
const cors = require("cors");

app.use(bodyParser.json());

const riotApiKey = process.env.REACT_APP_TEST_API_KEY;

let summonerId = [
  // "bbtzw",
  // "원딜 왕자 변정현",
  // "kovolt",
  // "kovolt",
  // "kovolt",
  // "박둥희",
  // "kovolt1",
  // "틀탑라간",
  // "쇠똥구리a",
  // "삼성 트롤 세탁기",
  // "뜨 식",
  // "느그집옆동네",
  // "이준경 123",
  // "엘 림",
  // "원딜김도형2345345",
  // "또 지고 싶다",
  // "병시우",
  // "고기리대장",
  // "이상적인64종지레",
  // "UZLL",
  // "형 쥬지가불끈해",
  // "혜지하면트롤함",
  // "듀오있음겜안함",
  // "그대의부모",
  // "Hoits",
  // "김서폿",
  // "수녀님1",
  // "boohoom",
  // "치우지못할똥",
  // "출동이다 김서폿",
];
let encodeIdList = [];

let encodeJsonList = [];

app.use(cors());

// 중복 리스트 제거기능필요

//인코딩한 아이디 리스트화 encodeIdList로 리턴
const encodeFnc = async (summonerId) => {
  let sortFunc = summonerId.filter((item, idx, array) => {
    return array.indexOf(item) === idx;
  });
  // console.log(sortFunc);
  sortFunc.map((user) => {
    const encoding = encodeURI(user);
    console.log(encoding);
    return (encodeIdList = encodeIdList.concat(encoding));
    // 리턴값 형태 ['encoded','encoded']
  });
};

//axios 호출 함수

const axiosFunc = async (encodeIdList, index) => {
  encodeIdList.map((item, index) => {
    Promise.resolve(useAxios(item))
      // 유저 정보 조회
      .then((getData) => {
        var data = new Object();
        data.number = index;
        data.name = getData.data.name;
        data.id = getData.data.id;

        encodeJsonList = encodeJsonList.concat(data);

        // key number의 value로 오름차순 정렬
        // encodeJsonList.sort(function (a, b) {
        //   return a.number - b.number;
        // });

        // 인게임여부 확인
        // Promise.resolve(useAxiosInGame(data.id))
        //   .then((getState) => {
        //     data.status = [
        //       {
        //         state: getState.data.gameType,
        //         gameMode: getState.data.gameMode,
        //       },
        //     ];
        //   })
        //   .catch((err) => {
        //     // console.log("접속하지 않았습니다", err.response.status);
        //     if (err.response.status === 404) {
        //       data.status = "OFF_LINE";
        //     }
        //     // data.status = err.response.status === 404 ? "false" : false;
        //   });
      })
      .catch((err) => {
        console.log(item);
        var data = new Object();
        data.errorId = decodeURI(item);
        console.log("없는 아이디입니다", err.response.status, data.errorId);
        encodeJsonList = encodeJsonList.concat(data);
        // key number의 value로 오름차순 정렬
        // encodeJsonList.sort(function (a, b) {
        //   return a.number - b.number;
        // });
      });
  });

  //엔드포인트 지정
  app.use("/userinfo", async (req, res) => res.json(encodeJsonList));
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

//post요청 - 클라이언트에서 보낸 아이디
function getPost() {
  app.post("/insertuser", (req, res) => {
    const text = req.body.id;
    summonerId = summonerId.concat(text);
    console.log(summonerId);
    encodeFnc(summonerId);
    axiosFunc(encodeIdList);
  });
}

//중복 제거

//데이터 받아오기
const getUserData = () => {
  axiosFunc(encodeIdList);
};

getPost();

//조회할 아이디 리스트를 받아, 인코딩

//받은 리스트를 axios요청 json리스트화
// getUserData();

app.use("/api", (req, res) => res.json({ username: "bryan" }));

app.listen(port, () => {
  console.log(`express is running on ${port}`);
});
