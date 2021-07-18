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

async function getUserData(userName) {
  return await axios.get(
    `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${userName}?api_key=${riotApiKey}`
  );
}

// 인게임 정보 axios 사용
async function getUserInGameData(data) {
  const userId = data.id;
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
  const userName = req.body.name;
  const data = await new Promise((resolve, reject) => {
    resolve(getUserData(encodeURI(userName)));
  })
    .then((result) => {
      // globalList = globalList.concat({
      //   id: result.data.id,
      //   name: result.data.name,
      // });
      // app.get("/searchuser", (req, res) => {
      //   res.json(globalList);
      // });

      return {
        id: result.data.id,
        name: result.data.name,
        accountId: result.data.accountId
        
      };
    })
    .catch((err) => {
      console.log(`없는 아이디입니다.-${userName}-${err.response.status}`);
      if (err.response.status === 404) {
        return null;
      }
    });
  return res.json(data);
});

app.post("/userstatus", async (req, res) => {
  const userList = req.body.users;

  const listing = (userList) => {
    userList.map((user, index) => {
      ((x) => {
        setTimeout(() => {
          // console.log(user.accountId)
          new Promise((resolve) => {
            resolve(getUserInGameData(user));
          })
            .then((res) => {
              // console.log(`${user.name} 게임중임 - ${timeStamp}`);
              // console.log(res.data)

              let data = {
                name: '',
                currentTimeStamp: '',
                gameMode : '',
                gameType : '',
                state: '',
                accountId : '',
                participants : ''
              }


              if(res.data.gameMode == "CLASSIC") {
                data.gameMode = '소환사의 협곡'
              } else if(res.data.gameMode == "ARAM") {
                data.gameMode = '칼바람 나락'
              } else if(res.data.gameMode == "URF") {
                data.gameMode = '우르프'
              } else if(res.data.gameMode == "SIEGE") {
                data.gameMode = '돌격 넥서스'
              } else if(res.data.gameMode == "ONEFORALL") {
                data.gameMode = '단일 챔피언'
              } else if(res.data.gameMode == "ULTBOOK") {
                data.gameMode = '궁극기 모드'
              }
              
              if(res.data.gameType == "MATCHED_GAME") {
                if(res.data.gameQueueConfigId == 420) {
                  data.gameType = '솔로 랭크'
                } else if(res.data.gameQueueConfigId == 430) {
                  data.gameType = '일반 게임'
                } else if(res.data.gameQueueConfigId == 450) {
                  data.gameType = '칼바람 나락'
                } else if(res.data.gameQueueConfigId == 1090 || 1100 || 1110) {
                  data.gameType = '롤토체스'
                } else if(res.data.gameQueueConfigId == 1400) {
                  data.gameType = '궁극기 모드'
                } else {
                  data.gameType = '자유랭크'
                }

              }else if(res.data.gameType == 'CUSTOM_GAME') {
                data.gameType = '사용자 설정 게임'
              }


              // 게임 시간 체크
              const timeStamp = new Date(res.data.gameStartTime);

              asdList = asdList.concat({
                name: user.name,
                currentTimeStamp: timeStamp,
                gameMode : data.gameMode,
                gameType : data.gameType,
                state: true,
                accountId : user.accountId,
                participants : res.data.participants


                // 수저 전 res파일
                // name: user.name,
                // currentTimeStamp: timeStamp,
                // state: true,
                // accountId : user.accountId,
                // participants : res.data.participants
              });
            })
            .catch((err) => {
              console.log(`니가 찾는 ${user.name} 안들어왔어 ㅡㅡ`);
              asdList = asdList.concat({
                name: user.name,
                accountId: user.accountId,
                state: false,
              });
            })
            .finally(() => {
              if (userList.length === index + 1) {
                console.log(asdList)
                return res.json(asdList);
              }
            });
        }, 500 * x);
      })(index);
    });

    asdList.splice(0, asdList.length);
  };

  listing(userList);
});

app.listen(port, () => {
  console.log(`express is running on ${port}`);
});
