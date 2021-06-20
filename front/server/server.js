// import dotenv from "dotenv";
const axios = require("axios");
const dotenv = require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 3001;
const cors = require("cors");

const riotApiKey = 'RGAPI-fb260978-f31f-4455-85e1-09fa663704a6';
let userDataList = [];

const userId = "kovolt1";

app.use(cors());

//ToDo: end포인트 확인, 사용자 입력후 아이디값만 먼저 보여줄것인지, 정보를 더 빼와야하는지 확인 필요
usersData = async(req, res) => {
  const data = await new Promise((resolve, reject) => {
    resolve(getUserData(encodeURI(userId)));
  }).then((result) => {
    return {
      id: result.data.id,
      name: result.data.name
    }
  }).catch((err) => {
    console.log(err)
    if (err.response.status === 404) {
      return null;
    }
  })

  return res.json(data)
}
// async function getUsersData() {
//   userDataList = await Promise.all(summonersId.map((userId, index) => {
//     return getUserData(encodeURI(userId)).then((userData) => {
//       if (userData.status === 404) {
//         throw new Error('no user')
//       }
//       console.log(userData.data)
//       return {
//         index: index,
//         id: userData.id,
//         name: userData.name
//       }
//     }).catch((err) => {
//       console.log('err', err.code)
//     })
//   }));
// }

async function getUserInformation() {
  return Promise.all(summonersId.map((userId) => {
    useAxiosInGame(encodeURI(userId)).then((userInfo) => {
      console.log(userInfo)
    })
  })
  )
}
  
  // encodeIdList.map((item, index) => {
  //   Promise.resolve(useAxios(item))
  //     // 유저 정보 조회
  //     .then((getData) => {
  //       var data = new Object();
  //       data.number = index;
  //       data.name = getData.data.name;
  //       data.id = getData.data.id;

  //       encodeJsonList = encodeJsonList.concat(data);

  //       // key number의 value로 오름차순 정렬
  //       encodeJsonList.sort(function (a, b) {
  //         return a.number - b.number;
  //       });

  //       // 인게임여부 확인
  //       Promise.resolve(useAxiosInGame(data.id))
  //         .then((getState) => {
  //           // console.log(getState.data.gameMode);
  //           // console.log(getState.data);
  //           // console.log(getData);
  //           data.status = [
  //             {
  //               state: getState.data.gameType,
  //               gameMode: getState.data.gameMode,
  //             },
  //           ];
  //         })
  //         .catch((err) => {
  //           // console.log("접속하지 않았습니다", err.response.status);
  //           if (err.response.status === 404) {
  //             data.status = "OFF_LINE";
  //           }
  //           // data.status = err.response.status === 404 ? "false" : false;
  //         });
  //     })
  //     .catch((err) => {
  //       console.log(item);
  //       var data = new Object();
  //       data.errorId = decodeURI(item);
  //       console.log("없는 아이디입니다", err.response.status, data.errorId);
  //       encodeJsonList = encodeJsonList.concat(data);
  //       // key number의 value로 오름차순 정렬
  //       encodeJsonList.sort(function (a, b) {
  //         return a.number - b.number;
  //       });
  //     });
  // });

  // //엔드포인트 지정
  // app.use("/userinfo", (req, res) => res.json(encodeJsonList));
// };


// 인게임 정보 axios 사용
async function getUserInGameData(userId) {
  return await axios.get(
    `https://kr.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${userId}?api_key=${riotApiKey}`
  );
};

//중복 제거

//데이터 받아오기
async function getUserData(userId) {
  return await axios.get(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${userId}?api_key=${riotApiKey}`)
};

//받은 리스트를 axios요청 json리스트화
app.use("/userinfo/userlist", (req, res) => res.json(getUserInformation()))

app.use(bodyParser.json());
app.get("/userinfo", usersData);
app.use("/api", (req, res) => res.json({ username: "bryan" }));

app.listen(port, () => {
  console.log(`express is running on ${port}`);
});
