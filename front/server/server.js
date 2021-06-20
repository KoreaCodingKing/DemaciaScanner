// import dotenv from "dotenv";
const axios = require("axios");
const dotenv = require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 3001;
const cors = require("cors");

const riotApiKey = process.env.REACT_APP_TEST_API_KEY;
// let userDataList = [];

const userId = "kovolt1";

app.use(cors());

usersData = async(req, res) => {
  // const data = await new Promise((resolve, reject) => {
  //   resolve(getUserData(encodeURI(userId)));
  // }).then((result) => {
  //   return {
  //     id: result.data.id,
  //     name: result.data.name
  //   }
  // }).catch((err) => {
  //   console.log(err)
  //   if (err.response.status === 404) {
  //     return null;
  //   }
  // })

  // return res.json(data)
}

async function getUserInformation() {
  return Promise.all(summonersId.map((userId) => {
    useAxiosInGame(encodeURI(userId)).then((userInfo) => {
      console.log(userInfo)
    })
  })
  )
}

// 인게임 정보 axios 사용
async function getUserInGameData(userId) {
  return await axios.get(
    `https://kr.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${userId}?api_key=${riotApiKey}`
  );
};

//post요청 - 클라이언트에서 보낸 아이디
function getPost() {
  app.post("/insertuser", async(req, res) => {
  const userId = req.body.id;
  console.log(userId)
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
    // summonerId = summonerId.concat(text);
    // console.log(summonerId);
    // encodeFnc(summonerId);
    // axiosFunc(encodeIdList);
  });
}

//중복 제거

//데이터 받아오기
async function getUserData(userId) {
  return await axios.get(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${userId}?api_key=${riotApiKey}`)
};

//받은 리스트를 axios요청 json리스트화
// app.use("/userinfo/userlist", (req, res) => res.json(getUserInformation()))

app.use(bodyParser.json());
// app.get("/userinfo", usersData);
app.use("/api", (req, res) => res.json({ username: "bryan" }));


// POST 받는 곳
getPost();

app.listen(port, () => {
  console.log(`express is running on ${port}`);
});
