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

app.use(cors());
app.use(bodyParser.json());

// 소환사 아이디로 기본 정보 찾기
async function getUserData(userName) {
  return await axios.get(
    `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${userName}?api_key=${riotApiKey}`
  );
}
// 랭크 및 티어 찾기
async function getUserRankData(summonerId) {
  return await axios.get(
    `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}?api_key=${riotApiKey}`
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

// match v4 (v5로 변경될 예정)
async function getUserTotalData(user) {
  const accountId = user.accountId;
  return await axios.get(
    `https://kr.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountId}?api_key=${riotApiKey}`
  );
}

// match 승패 여부
async function getUserTotalGameData(user) {
  const gameId = user;
  return await axios.get(
    `https://kr.api.riotgames.com/lol/match/v4/matches/${gameId}?api_key=${riotApiKey}`
  );
}

// 테스트용 임시 데이터
async function getTempIdList() {
  return await axios.get(
    `https://kr.api.riotgames.com/lol/league-exp/v4/entries/RANKED_SOLO_5x5/CHALLENGER/I?page=1&api_key=${riotApiKey}`
  );
}
// 챔피언 이름 찾기
async function getChampionName(id) {
  return await axios.get(
    "https://ddragon.leagueoflegends.com/cdn/11.15.1/data/ko_KR/champion.json"
  );
}

// 유저의 티어 랭크 알아내는 상수 함수
function getUserRankTier(objData) {
  const getId = objData.id || objData.summonerId;

  return getUserRankData(getId).then((res) => {
    const dataLength = res.data.length;
    // console.log(dataLength);

    if (dataLength !== 0) {
      return res.data.map((item, index) => {
        if (item.queueType == "RANKED_FLEX_SR") {
          objData.tier.flex.tier = item.tier;
          objData.tier.flex.rank = item.rank;
        } else if (item.queueType == "RANKED_SOLO_5x5") {
          objData.tier.solo.tier = item.tier;
          objData.tier.solo.rank = item.rank;
        }

        if (dataLength == index + 1) {
          // console.log(`티어 랭크 삽입 부분 - ${JSON.stringify(objData)}`);
          return objData;
        }
      });
    } else {
      // console.log("랭크 플레이를 안했네요 -- ", objData);
      return objData;
    }
  });
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
      let data = {
        id: result.data.id,
        name: result.data.name,
        accountId: result.data.accountId,
        tier: {
          flex: {
            tier: "",
            rank: "",
          },
          solo: {
            tier: "",
            rank: "",
          },
        },
      };
      console.log(data);

      return data;
    })
    .then((resData) => {
      // console.log(resData);

      // 유저의 랜크 티어 알아내는 함수
      return getUserRankTier(resData);
    })
    .catch((err) => {
      console.log(`없는 아이디입니다.-${userName}-${err.response.status}`);
      if (err.response.status === 404) {
        return null;
      }
    });

  console.log(`전달 할 data ${JSON.stringify(data)}`);
  return res.json(data);
});

app.post("/userstatus", async (req, res) => {
  const userList = req.body.users;
  let asdList = [];

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

              let data = {
                name: "",
                currentTimeStamp: "",
                gameMode: "",
                gameType: "",
                gameLength: "",
                state: "",
                accountId: "",
                participants: "",
              };

              if (res.data.gameMode == "CLASSIC") {
                data.gameMode = "소환사의 협곡";
              } else if (res.data.gameMode == "ARAM") {
                data.gameMode = "칼바람 나락";
              } else if (res.data.gameMode == "URF") {
                data.gameMode = "우르프";
              } else if (res.data.gameMode == "SIEGE") {
                data.gameMode = "돌격 넥서스";
              } else if (res.data.gameMode == "ONEFORALL") {
                data.gameMode = "단일 챔피언";
              } else if (res.data.gameMode == "ULTBOOK") {
                data.gameMode = "궁극기 모드";
              }

              if (res.data.gameType == "MATCHED_GAME") {
                if (res.data.gameQueueConfigId == 420) {
                  data.gameType = "솔로 랭크";
                } else if (res.data.gameQueueConfigId == 430) {
                  data.gameType = "일반 게임";
                } else if (res.data.gameQueueConfigId == 450) {
                  data.gameType = "칼바람 나락";
                } else if (res.data.gameQueueConfigId == 1400) {
                  data.gameType = "궁극기 모드";
                } else {
                  data.gameType = "자유 랭크";
                }
              } else if (res.data.gameType == "CUSTOM_GAME") {
                data.gameType = "사용자 설정 게임";
              }

              // 게임 시간 체크
              const timeStamp = new Date(res.data.gameStartTime);

              asdList = asdList.concat({
                name: user.name,
                currentTimeStamp: timeStamp,
                gameMode: data.gameMode,
                gameType: data.gameType,
                gameLength: res.data.gameLength,
                state: true,
                accountId: user.accountId,
                participants: res.data.participants,
              });
              console.log(
                user.name,
                "게임 진입 후 소요된 시간 : ",
                parseInt(res.data.gameLength / 60) + "분",
                parseInt(res.data.gameLength % 60) + "초",
                "게임 잡힌 시간 : ",
                timeStamp.getDate(),
                timeStamp.getHours(),
                timeStamp.getMinutes(),
                timeStamp.getSeconds()
              );
            })
            .catch((err) => {
              console.log(`${user.name}은(는) 게임 중이지 않습니다.`);
              // accountId를 앚아서 match v4를 사용해 최근 게임의 끝난 시간을 도출해야함
              asdList = asdList.concat({
                name: user.name,
                accountId: user.accountId,
                state: false,
              });
            })
            .finally(() => {
              if (userList.length === index + 1) {
                console.log("loading...", `${index + 1}/${userList.length}`);
                return res.json(asdList);
              }
              console.log("loading...", `${index + 1}/${userList.length}`);
            });
        }, 1000 * x);
      })(index);
    });

    asdList.splice(0, asdList.length);
  };

  listing(userList);
});

// 전적 데이터 받기 (gameId 얻을 수 있음)
/*
  {
    "matches" : [
      {
          "platformId": "KR",
          "gameId": 5357594542,
          "champion": 523,
          "queue": 420,
          "season": 13,
          "timestamp": 1627566726697,
          "role": "DUO_SUPPORT",
          "lane": "NONE"
      },
      {...},
      {...},
    ]
  }
  */
app.post("/usertotal", async (req, res) => {
  const userData = req.body.user;
  console.log("타겟 유저", userData);

  let array1 = [];
  let array3 = [];

  let resultArray = [];
  let resultArray2 = [];

  const data = await new Promise((resolve, reject) => {
    resolve(getUserTotalData(userData));
  })
    .then((result) => {
      return result.data.matches;
    })
    .then((matches) => {
      // console.log(matches)
      const list = matches.slice(0, 2 || matches.length);
      list.map((matchesGameId) => {
        const gameId = matchesGameId.gameId;

        array1 = array1.concat(gameId);
      });
    })
    .then(() => {
      //  console.log(array1)
      const data = array1.map((gameId, index) => {
        ((x) => {
          setTimeout(() => {
            new Promise((resolve, reject) => {
              resolve(getUserTotalGameData(gameId));
            })
              .then((result) => {
                // result.data
                const data = {
                  gameCreation: result.data.gameCreation,
                  gameDuration: result.data.gameDuration,
                  queueId: result.data.queueId,
                  gameMode: result.data.gameMode,
                  gameType: result.data.gameType,
                  team: result.data.teams,
                  participants: result.data.participants,
                  participantIdentities: result.data.participantIdentities,
                };

                if (result.data.gameMode == "CLASSIC") {
                  data.gameMode = "소환사의 협곡";
                } else if (result.data.gameMode == "ARAM") {
                  data.gameMode = "칼바람 나락";
                } else if (result.data.gameMode == "URF") {
                  data.gameMode = "우르프";
                } else if (result.data.gameMode == "SIEGE") {
                  data.gameMode = "돌격 넥서스";
                } else if (result.data.gameMode == "ONEFORALL") {
                  data.gameMode = "단일 챔피언";
                } else if (result.data.gameMode == "ULTBOOK") {
                  data.gameMode = "궁극기 모드";
                }

                if (result.data.gameType == "MATCHED_GAME") {
                  if (result.data.queueId == 420) {
                    data.gameType = "솔로 랭크";
                  } else if (result.data.queueId == 430) {
                    data.gameType = "일반 게임";
                  } else if (result.data.queueId == 450) {
                    data.gameType = "칼바람 나락";
                  } else if (result.data.queueId == 1400) {
                    data.gameType = "궁극기 모드";
                  } else {
                    data.gameType = "자유 랭크";
                  }
                } else if (result.data.gameType == "CUSTOM_GAME") {
                  data.gameType = "사용자 설정 게임";
                }

                array3 = array3.concat(data);
              })
              .finally(() => {
                if (array1.length === index + 1) {
                  console.log("loading...", `${index + 1}/${array1.length}`);
                  console.log("finished");
                  // console.log(array3);

                  let champData = "";

                  array3.map((item, index) => {
                    const length1 = item.participantIdentities.length;
                    let dataList = [];

                    for (let i = 0; i < length1; i++) {
                      // const championIdValue = item.participants[i].championId;

                      // eslint-disable-next-line no-loop-func
                      // getChampionName(championIdValue).then((res) => {
                      //   const championList = res.data.data;
                      //   const convertToObjectChampionList =
                      //     Object.entries(championList);
                      //   // const champ = "";

                      //   convertToObjectChampionList.map((item, index) => {
                      //     if (item[1].key == championIdValue) {
                      //       // console.log(item[1].name);
                      //       champData = item[1].name;
                      //       // item[1].name;
                      //     }
                      //   });
                      // });

                      let data = {
                        summonerName:
                          item.participantIdentities[i].player.summonerName,
                        summonerId:
                          item.participantIdentities[i].player.summonerId,
                        championId: item.participants[i].championId,
                        kills: item.participants[i].stats.kills,
                        deaths: item.participants[i].stats.deaths,
                        assists: item.participants[i].stats.assists,
                        gameCreation: item.gameCreation,
                        gameDuration: item.gameDuration,
                        gameMode: item.gameMode,
                        gameType: item.gameType,
                        queueId: item.queueId,
                        win: item.participants[i].stats.win ? "WIN" : "LOSE",
                        tier: {
                          flex: {
                            tier: "",
                            rank: "",
                          },
                          solo: {
                            tier: "",
                            rank: "",
                          },
                        },
                      };

                      dataList = dataList.concat(data);

                      if (i + 1 == length1) {
                        resultArray = resultArray.concat({
                          dataList,
                        });
                        // console.log(resultArray);

                        console.log("끝");
                      } else {
                        console.log(index, "번째임");
                      }
                    }
                    // dataList.splice(0, dataList.length);
                  });

                  return res.json(resultArray);
                }
                console.log("loading...", `${index + 1}/${array1.length}`);
              });
          }, 100 * x);
        })(index);
      }); // map end
      // array1.splice(0, array1.length);
      array3.splice(0, array3.length);
      resultArray.splice(0, resultArray.length);

      // return data
    })
    .catch(() => {
      console.log("전적이 없네요?");
    });

  // return res.json(data);
});
// 챔피언 이름 가져오기(작업 완료 설정 대기중)
app.post("/champion", async (req, res) => {
  const id = req.body.championId;
  // console.log(id);

  let myChamp = "";
  let array1 = [];

  function getChampName(id) {
    return axios
      .get(
        "https://ddragon.leagueoflegends.com/cdn/11.15.1/data/ko_KR/champion.json"
      )
      .then((res) => {
        const championList = res.data.data;
        const convertToObjectChampionList = Object.entries(championList);

        convertToObjectChampionList.map((item, index) => {
          if (item[1].key == id) {
            // console.log(item[1].name);
            myChamp = item[1].name;
            array1 = array1.concat(myChamp);
          }
        });
      })
      .finally(() => {
        console.log("finally", array1);
        // return res.json(myChamp);
      });
  }

  getChampName(id);
});

app.listen(port, () => {
  console.log(`express is running on ${port}`);
});
