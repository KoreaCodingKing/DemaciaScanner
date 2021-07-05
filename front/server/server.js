const axios = require("axios");
const dotenv = require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 3001;
const cors = require("cors");

const riotApiKey = process.env.REACT_APP_TEST_API_KEY;

let globalList = [];
let globalListState = [];

let testList = [];

app.use(cors());
app.use(bodyParser.json());

async function getUserData(userId) {
  return await axios.get(
    `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${userId}?api_key=${riotApiKey}`
  );
}

// 인게임 정보 axios 사용
async function getUserInGameData(accountId) {
  return await axios.get(
    `https://kr.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${accountId}?api_key=${riotApiKey}`
  );
}

// 테스트용 임시 데이터
async function getTempIdList() {
  return await axios.get(
    `https://kr.api.riotgames.com/lol/league-exp/v4/entries/RANKED_SOLO_5x5/CHALLENGER/I?page=1&api_key=${riotApiKey}`
  );
}

// 테스트용 첼린저 데이터
app.get("/testlist", async (req, res) => {
  const data = await new Promise((resolve, reject) => {
    resolve(getTempIdList());
  });
  data.data.map((item) => {
    const name = item.summonerName;
    const id = item.summonerId;

    testList = testList.concat({
      name: name,
      id: id,
    });
  });

  res.json(testList);
  console.log(data.data.length);
});

//post요청 - 클라이언트에서 보낸 아이디
app.post("/searchuser", async (req, res) => {
  const userId = req.body.name;
  const data = await new Promise((resolve, reject) => {
    resolve(getUserData(encodeURI(userId)));
  })
    .then((result) => {
      console.log(`id : ${result.data.id}`, `name : ${result.data.name}`);
      globalList = globalList.concat({
        id: result.data.id,
        name: result.data.name,
      });
      app.get("/searchuser", (req, res) => {
        res.json(globalList);
      });

      return {
        id: result.data.id,
        name: result.data.name,
      };
    })
    .catch((err) => {
      console.log(`없는 아이디입니다.-${userId}-${err.response.status}`);
      if (err.response.status === 404) {
        return null;
      }
    });
  return res.json(data);
});

app.post("/userstatus", async (req, res) => {
  console.log(req.body)
  const userName = req.body.name;
  const userAccountId = req.body.status;



  const data = new Promise((resolve, reject) => {
    resolve(getUserInGameData(encodeURI(userAccountId)));
  })
    .then((result) => {
      console.log(
        ` Name : ${userName} gameType : ${result.data.gameType}`,
        `gameMode : ${result.data.gameMode}`
      );
      globalListState = globalListState.concat({
        name: userName,
        status: "접속중",
      });
      app.get("/userstatus", (req, res) => {
        res.json(globalListState);
      });
      return {
        name: userName,
        status: "접속중",
      };
    })
    .catch((err) => {
      if (err.response.status === 404) {
        // data.status = "OFF_LINE";
        globalListState = globalListState.concat({
          name: userName,
          status: false,
        });
        app.get("/userstate", (req, res) => {
          res.json(globalListState);
        });
        return {
          name: userName,
          status: "오프라인",
        };
      }
    });
  return res.json(data);
});

app.listen(port, () => {
  console.log(`express is running on ${port}`);
});
