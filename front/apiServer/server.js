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

let champInfoList = [];

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

// match v5 puuid를 이용해 matchid 도출
async function getUserTotalDataV5(user) {
  // https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/_YEq3JBqTAj_UJGtzcTlrf8rDHQasl4zZoJDk8SOcPhMCVsLCndRpWtDmyZrMVZtr8-3kI842lm5wg/ids?start=0&count=20&api_key=RGAPI-9f0b7ca9-e4b9-472a-a949-bd6c302d3038
  const puuid = user.puuid;
  return await axios.get(
    `https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20&api_key=${riotApiKey}`
  );
}

// match 승패 여부
async function getUserTotalGameData(user) {
  const gameId = user;
  // return await axios.get(
  //   `https://kr.api.riotgames.com/lol/match/v4/matches/${gameId}?api_key=${riotApiKey}`
  // );

  // console.log("받은 게임 아이디 값->", gameId);
  // match v5 변경코드
  return await axios.get(
    `https://asia.api.riotgames.com/lol/match/v5/matches/${gameId}?api_key=${riotApiKey}`
  );
}

// 유저 리그 정보 알아내기
// async function getUserLeageInfo(user) {
//   const userId = user;
//   return await axios.get(
//     `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${userId}?api_key=${riotApiKey}`
//   );
// }

// 테스트용 임시 데이터
async function getTempIdList() {
  return await axios.get(
    `https://kr.api.riotgames.com/lol/league-exp/v4/entries/RANKED_SOLO_5x5/CHALLENGER/I?page=1&api_key=${riotApiKey}`
  );
}

// 유저의 티어 랭크 알아내는 상수 함수
function getUserRankTier(objData) {
  const getId = objData.id || objData.summonerId;

  return getUserRankData(getId).then((res) => {
    const dataLength = res.data.length;
    // console.log("리그정보가 잇었네?? --->", res.data);

    if (dataLength !== 0) {
      return res.data.map((item, index) => {
        if (item.queueType == "RANKED_FLEX_SR") {
          objData.tier.flex.tier = item.tier;
          objData.tier.flex.rank = item.rank;
          objData.tier.flex.leaguePoints = item.leaguePoints;
          objData.tier.flex.wins = item.wins;
          objData.tier.flex.losses = item.losses;
        } else if (item.queueType == "RANKED_SOLO_5x5") {
          objData.tier.solo.tier = item.tier;
          objData.tier.solo.rank = item.rank;
          objData.tier.solo.leaguePoints = item.leaguePoints;
          objData.tier.solo.wins = item.wins;
          objData.tier.solo.losses = item.losses;
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
      // console.log("검색 유저의 정보", result.data);
      let data = {
        id: result.data.id,
        name: result.data.name,
        puuid: result.data.puuid,
        accountId: result.data.accountId,
        revisionDate: result.data.revisionDate,
        profileIconId: result.data.profileIconId,
        summonerLevel: result.data.summonerLevel,
        tier: {
          flex: {
            tier: "",
            rank: "",
            leaguePoints: "",
            wins: "",
            losses: "",
          },
          solo: {
            tier: "",
            rank: "",
            leaguePoints: "",
            wins: "",
            losses: "",
          },
        },
      };
      console.log(`${data.name} 검색`);

      return data;
    })
    .then((resData) => {
      return getUserRankTier(resData);
    })
    .catch((err) => {
      // console.log(`없는 아이디입니다.-${userName}-${err.response.status}`);
      if (err.response.status === 404) {
        return null;
      }
    });

  // console.log(`전달 할 data ${JSON.stringify(data)}`);
  return res.json(data);
});

app.post("/userstatus", async (req, res) => {
  const userList = req.body.users;
  let asdList = [];

  const listing = (userList) => {
    userList.map((user, index) => {
      ((x) => {
        setTimeout(() => {
          // console.log("유저 account id", user.accountId);
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
                  data.gameType = "솔랭";
                } else if (res.data.gameQueueConfigId == 430) {
                  data.gameType = "일반";
                } else if (res.data.gameQueueConfigId == 450) {
                  data.gameType = "칼바람";
                } else if (res.data.gameQueueConfigId == 900) {
                  data.gameType = "우르프";
                } else if (res.data.gameQueueConfigId == 1400) {
                  data.gameType = "궁극기 모드";
                } else {
                  data.gameType = "자랭";
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
              // console.log(
              //   user.name,
              //   "게임 진입 후 소요된 시간 : ",
              //   parseInt(res.data.gameLength / 60) + "분",
              //   parseInt(res.data.gameLength % 60) + "초",
              //   "게임 잡힌 시간 : ",
              //   timeStamp.getDate(),
              //   timeStamp.getHours(),
              //   timeStamp.getMinutes(),
              //   timeStamp.getSeconds()
              // );
            })
            .catch((err) => {
              // console.log(`${user.name}은(는) 게임 중이지 않습니다.`);
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
        }, 250 * x);
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
  // console.log("타겟 유저", userData);

  let array1 = [];
  let array3 = [];

  let resultArray = [];
  let resultArray2 = [];
  let resultArray3 = [];
  let resultArray4 = [];

  const data = await new Promise((resolve, reject) => {
    // match V5 적용
    resolve(getUserTotalDataV5(userData));
  })
    .then((result) => {
      return result.data;
    })
    .then((matches) => {
      const list = matches.slice(0, 20 || matches.length);
      list.map((matchesGameId) => {
        const gameId = matchesGameId;

        array1 = array1.concat(gameId);
      });
      // console.log(array1);
    })
    .then(() => {
      const data = array1.map((gameId, index) => {
        ((x) => {
          setTimeout(() => {
            new Promise((resolve, reject) => {
              resolve(getUserTotalGameData(gameId));
            })
              .then((result) => {
                // console.log(result.data);
                const data = {
                  gameCreation: result.data.info.gameCreation,
                  gameDuration: result.data.info.gameDuration,
                  queueId: result.data.info.queueId,
                  gameMode: result.data.info.gameMode,
                  gameType: result.data.info.gameType,
                  team: result.data.info.teams,
                  participants: result.data.info.participants,
                };

                if (data.gameMode == "CLASSIC") {
                  data.gameMode = "소환사의 협곡";
                } else if (data.gameMode == "ARAM") {
                  data.gameMode = "칼바람 나락";
                } else if (data.gameMode == "URF") {
                  data.gameMode = "우르프";
                } else if (data.gameMode == "SIEGE") {
                  data.gameMode = "돌격 넥서스";
                } else if (data.gameMode == "ONEFORALL") {
                  data.gameMode = "단일 챔피언";
                } else if (data.gameMode == "ULTBOOK") {
                  data.gameMode = "궁극기 모드";
                }

                if (data.gameType == "MATCHED_GAME") {
                  if (data.queueId == 420) {
                    data.gameType = "솔랭";
                  } else if (data.queueId == 430) {
                    data.gameType = "일반";
                  } else if (data.queueId == 450) {
                    data.gameType = "칼바람";
                  } else if (data.queueId == 900) {
                    data.gameType = "우르프";
                  } else if (data.queueId == 1400) {
                    data.gameType = "궁극기 모드";
                  } else {
                    data.gameType = "자랭";
                  }
                } else if (data.gameType == "CUSTOM_GAME") {
                  data.gameType = "사용자 설정 게임";
                }

                array3 = array3.concat(data);
              })
              .finally(() => {
                if (array1.length === index + 1) {
                  console.log("loading...", `${index + 1}/${array1.length}`);

                  array3.map((item, index) => {
                    const length1 = item.participants.length;
                    // console.log(length1);
                    let dataList = [];

                    for (let i = 0; i < length1; i++) {
                      let data = {
                        // gameCreation : item.gameCreation,
                        summonerName: item.participants[i].summonerName,
                        summonerId: item.participants[i].summonerId,
                        championId: item.participants[i].championId,
                        championName: item.participants[i].championName,
                        position: item.participants[i].individualPosition,
                        role: item.participants[i].role,
                        kills: item.participants[i].kills,
                        deaths: item.participants[i].deaths,
                        assists: item.participants[i].assists,
                        item0: item.participants[i].item0,
                        item1: item.participants[i].item1,
                        item2: item.participants[i].item2,
                        item3: item.participants[i].item3,
                        item4: item.participants[i].item4,
                        item5: item.participants[i].item5,
                        item6: item.participants[i].item6,
                        summoner1Id: item.participants[i].summoner1Id,
                        summoner2Id: item.participants[i].summoner2Id,
                        gameCreation: item.gameCreation,
                        gameDuration: item.gameDuration,
                        gameMode: item.gameMode,
                        gameType: item.gameType,
                        queueId: item.queueId,
                        win: item.participants[i].win ? "WIN" : "LOSE",
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
                      // console.log(data.summonerName, i);

                      if (data.summoner1Id == "21") {
                        data.summoner1Id = "SummonerBarrier";
                      } else if (data.summoner1Id == "1") {
                        data.summoner1Id = "SummonerBoost";
                      } else if (data.summoner1Id == "14") {
                        data.summoner1Id = "SummonerDot";
                      } else if (data.summoner1Id == "3") {
                        data.summoner1Id = "SummonerExhaust";
                      } else if (data.summoner1Id == "4") {
                        data.summoner1Id = "SummonerFlash";
                      } else if (data.summoner1Id == "6") {
                        data.summoner1Id = "SummonerHaste";
                      } else if (data.summoner1Id == "7") {
                        data.summoner1Id = "SummonerHeal";
                      } else if (data.summoner1Id == "13") {
                        data.summoner1Id = "SummonerMana";
                      } else if (data.summoner1Id == "30") {
                        data.summoner1Id = "SummonerPoroRecall";
                      } else if (data.summoner1Id == "31") {
                        data.summoner1Id = "SummonerPoroThrow";
                      } else if (data.summoner1Id == "32") {
                        data.summoner1Id = "SummonerSnowball";
                      } else if (data.summoner1Id == "11") {
                        data.summoner1Id = "SummonerSmite";
                      } else if (data.summoner1Id == "12") {
                        data.summoner1Id = "SummonerTeleport";
                      }

                      if (data.summoner2Id == "21") {
                        data.summoner2Id = "SummonerBarrier";
                      } else if (data.summoner2Id == "1") {
                        data.summoner2Id = "SummonerBoost";
                      } else if (data.summoner2Id == "14") {
                        data.summoner2Id = "SummonerDot";
                      } else if (data.summoner2Id == "3") {
                        data.summoner2Id = "SummonerExhaust";
                      } else if (data.summoner2Id == "4") {
                        data.summoner2Id = "SummonerFlash";
                      } else if (data.summoner2Id == "6") {
                        data.summoner2Id = "SummonerHaste";
                      } else if (data.summoner2Id == "7") {
                        data.summoner2Id = "SummonerHeal";
                      } else if (data.summoner2Id == "13") {
                        data.summoner2Id = "SummonerMana";
                      } else if (data.summoner2Id == "30") {
                        data.summoner2Id = "SummonerPoroRecall";
                      } else if (data.summoner2Id == "31") {
                        data.summoner2Id = "SummonerPoroThrow";
                      } else if (data.summoner2Id == "32") {
                        data.summoner1Id = "SummonerSnowball";
                      } else if (data.summoner2Id == "11") {
                        data.summoner2Id = "SummonerSmite";
                      } else if (data.summoner2Id == "12") {
                        data.summoner2Id = "SummonerTeleport";
                      }
                      // const dasd = dataList.concat(data);

                      // const tempDataaa = {
                      //   gameCreation: data.gameCreation,
                      dataList = dataList.concat(data);
                      // };

                      // console.log(dataList);

                      if (i + 1 == length1) {
                        resultArray = resultArray.concat({
                          gameCreation: data.gameCreation,
                          gameQueueId: data.queueId,
                          gameType: data.gameType,
                          gameDuration: data.gameDuration,
                          championName: data.championName,
                          championId: data.championId,
                          win: data.win,
                          position: data.individualPosition,
                          summonerName: data.summonerName,
                          role: data.role,
                          kills: data.kills,
                          deaths: data.deaths,
                          assists: data.assists,
                          participantsList: dataList,
                        });
                        // resultArray = resultArray.concat({
                        //   tempDataaa,
                        // gameCreation: data.gameCreation,
                        // dataList: (dataList = dataList.concat(data)),
                        // });
                      } else {
                        // console.log(index, "번째임");
                      }
                    }
                    // for문
                  });
                  return res.json(resultArray);
                }
                console.log("loading...", `${index + 1}/${array1.length}`);
              });
          }, 50 * x);
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

  // console.log("보낼 데이터", data);
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
// getChampionName();
app.listen(port, () => {
  console.log(`express is running on ${port}`);
});
