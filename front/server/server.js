const axios = require("axios");
const dotenv = require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 3001;
const cors = require("cors");
app.use(cors());

const riotApiKey = process.env.REACT_APP_TEST_API_KEY;

async function getUserData(userId) {
  return await axios.get(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${userId}?api_key=${riotApiKey}`)
};

// 인게임 정보 axios 사용
async function getUserInGameData(userId) {
  return await axios.get(
    `https://kr.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${userId}?api_key=${riotApiKey}`
  );
};

//post요청 - 클라이언트에서 보낸 아이디
app.post("/insertuser", async(req, res) => {
  const userId = req.body.id;
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

  return res.json(data);
});

app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`express is running on ${port}`);
});
