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

let asdList = [];
let count = 0;

app.use(cors());
app.use(bodyParser.json());

async function getUserData(userId) {
  return await axios.get(
    `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${userId}?api_key=${riotApiKey}`
  );
}

// 인게임 정보 axios 사용
async function getUserInGameData(data) {
  const userId = data.accountId;
  // console.log(data.name);
  return await axios.get(
    `https://kr.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${userId}?api_key=${riotApiKey}`
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
  }).then((res) => {
    return res.data;
  });
  return res.json(data);
});

//post요청 - 클라이언트에서 보낸 아이디
app.post("/searchuser", async (req, res) => {
  const userId = req.body.name;
  const data = await new Promise((resolve, reject) => {
    resolve(getUserData(encodeURI(userId)));
  })
    .then((result) => {
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
  const userList = req.body.users;

  const listing = (userList) => {
    userList.map((item, index) => {
      ((x) => {
        setTimeout(() => {
          new Promise((resolve) => {
            resolve(getUserInGameData(item));
          })
            .then((res) => {
              const timeStamp = new Date(res.data.gameStartTime);
              console.log(`${item.name} 게임중임 - ${timeStamp}`);
              // console.log(res.data.gameStartTime);
              //           gameStartTime: 1625966487381,
              //           gameLength: 628
              asdList = asdList.concat({
                name: item.name,
                state: true,
                currentTimeStamp: timeStamp,
              });
            })
            .catch((err) => {
              console.log(`니가 찾는 ${item.name} 안들어왔어 ㅡㅡ`);
              asdList = asdList.concat({
                name: item.name,
                state: false,
              });
            })
            .finally(() => {
              if (userList.length === index + 1) {
                return res.json(asdList);
              }
            });
        }, 125 * x);
      })(index);
    });

    asdList.splice(0, asdList.length);
  };

  listing(userList);
});

app.listen(port, () => {
  console.log(`express is running on ${port}`);
});
