const axios = require("axios");
const dotenv = require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 3001;
const cors = require("cors");

let globalList = [];
let globalListState = [];
app.use(cors());

app.use(bodyParser.json());

const riotApiKey = process.env.REACT_APP_TEST_API_KEY;


async function getUserData(userId) {
  return await axios.get(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${userId}?api_key=${riotApiKey}`)
};

// 인게임 정보 axios 사용
async function getUserInGameData(accountId) {
  return await axios.get(
    `https://kr.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${accountId}?api_key=${riotApiKey}`
  );
};

//post요청 - 클라이언트에서 보낸 아이디
app.post("/insertuser", async(req, res) => {
  const userId = req.body.id;
  const data = await new Promise((resolve, reject) => {
    resolve(getUserData(encodeURI(userId)));
  })
  .then((result) => {
    console.log(`id : ${result.data.id}`, `name : ${result.data.name}`)
    globalList = globalList.concat({
      id : result.data.id,
      name : result.data.name
    })
    app.get('/insertuser', (req,res)=> {
      res.json(globalList)
    } )

    return {
      id: result.data.id,
      name: result.data.name
    }
  }).catch((err) => {
    console.log(`없는 아이디입니다.-${userId}-${err.response.status}`)
    if (err.response.status === 404) {
      return null;
    }
  })
  return res.json(data);
});

app.get("/userstate", async(req,res) => {
  
  globalList.map((item, index)=> {
  const userAccountId = item.id;
  const data = new Promise((resolve, reject) => {
    resolve(getUserInGameData(encodeURI(userAccountId)));
  })
  .then((result)=> {
    console.log(` No. ${index+1} Name : ${item.name} gameType : ${result.data.gameType}`, `gameMode : ${result.data.gameMode}`)
    globalListState = globalListState.concat({
      name :result.name,
      status : true 
    })
    res.json(globalListState)
  })
  .catch((err,item)=> {
    if (err.response.status === 404) {
      // data.status = "OFF_LINE";
      // globalListState = globalListState.concat({
      //   name : item.name,
      //   status : false
      // })
      // res.json(globalListState)
      console.log(item)
      console.log("OFF_Line")
    }
  })
  
  })

  // console.log(res.body)
  // const data = await new Promise((resolve, reject) => {
  //   resolve(getUserInGameData(encodeURI(userAccountId)));
  // })
  // .then((result)=> {
  //   console.log(`gameType : ${result.data.gameType}`, `gameMode : ${result.data.gameMode}`)
  // })
  // .catch((e)=> {
  //   if (err.response.status === 404) {
  //     data.status = "OFF_LINE";
  //   }
  // })

})



app.listen(port, () => {
  console.log(`express is running on ${port}`);
});
