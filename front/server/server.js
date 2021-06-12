// import dotenv from "dotenv";
const axios = require("axios");
const dotenv = require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 3001;

const cors = require("cors");
const { response } = require("express");

const riotApiKey = process.env.REACT_APP_TEST_API_KEY;

const summonerId = "도 일";

// 소환사 정보를 담는 변수
let lolInfo = "";
let lolInfoState = "";
let lolChamp = "";

// Riot API에서 제공하는 lol 챔피언 id를 한글 이름으로 반환하고 <- 최신화 할 필요가 있음
//없는 값을 입력하면 -1을 반환하는 method
function changeEnglishToKoreanName(id) {
  // 매개변수: 챔피언 id
  switch (id) {
    case 266:
      return console.log("아트록스");
      break; // 챔피언 한글 이름
    case 412:
      return console.log("쓰레쉬");
      break;
    case 23:
      return console.log("트린다미어");
      break;
    case 79:
      return console.log("그라가스");
      break;
    case 69:
      return console.log("카시오페아");
      break;
    case 136:
      return console.log("아우렐리온 솔");
      break;
    case 13:
      return console.log("라이즈");
      break;
    case 78:
      return console.log("뽀삐");
      break;
    case 14:
      return console.log("사이온");
      break;
    case 1:
      return console.log("애니");
      break;
    case 202:
      return console.log("진");
      break;
    case 43:
      return console.log("카르마");
      break;
    case 111:
      return console.log("노틸러스");
      break;
    case 240:
      return console.log("클레드");
      break;
    case 99:
      return console.log("럭스");
      break;
    case 103:
      return console.log("아리");
      break;
    case 2:
      return console.log("올라프");
      break;
    case 112:
      return console.log("빅토르");
      break;
    case 34:
      return console.log("애니비아");
      break;
    case 27:
      return console.log("신지드");
      break;
    case 86:
      return console.log("가렌");
      break;
    case 127:
      return console.log("리산드라");
      break;
    case 57:
      return console.log("마오카이");
      break;
    case 25:
      return console.log("모르가나");
      break;
    case 28:
      return console.log("이블린");
      break;
    case 105:
      return console.log("피즈");
      break;
    case 74:
      return console.log("하이머딩거");
      break;
    case 238:
      return console.log("제드");
      break;
    case 68:
      return console.log("럼블");
      break;
    case 82:
      return console.log("모데카이저");
      break;
    case 37:
      return console.log("소나");
      break;
    case 96:
      return console.log("코그모");
      break;
    case 55:
      return console.log("카타리나");
      break;
    case 117:
      return console.log("룰루");
      break;
    case 22:
      return console.log("애쉬");
      break;
    case 30:
      return console.log("카서스");
      break;
    case 12:
      return console.log("알리스타");
      break;
    case 122:
      return console.log("다리우스");
      break;
    case 67:
      return console.log("베인");
      break;
    case 110:
      return console.log("바루스");
      break;
    case 77:
      return console.log("우디르");
      break;
    case 89:
      return console.log("레오나");
      break;
    case 126:
      return console.log("제이스");
      break;
    case 134:
      return console.log("신드라");
      break;
    case 80:
      return console.log("판테온");
      break;
    case 92:
      return console.log("리븐");
      break;
    case 121:
      return console.log("카직스");
      break;
    case 42:
      return console.log("코르키");
      break;
    case 268:
      return console.log("아지르");
      break;
    case 51:
      return console.log("케이틀린");
      break;
    case 76:
      return console.log("니달리");
      break;
    case 85:
      return console.log("케인");
      break;
    case 3:
      return console.log("갈리오");
      break;
    case 45:
      return console.log("베이가");
      break;
    case 432:
      return console.log("바드");
      break;
    case 150:
      return console.log("나르");
      break;
    case 90:
      return console.log("말자하");
      break;
    case 104:
      return console.log("그레이브즈");
      break;
    case 254:
      return console.log("바이");
      break;
    case 10:
      return console.log("케일");
      break;
    case 39:
      return console.log("이렐리아");
      break;
    case 64:
      return console.log("리 신");
      break;
    case 420:
      return console.log("일라오이");
      break;
    case 60:
      return console.log("엘리스");
      break;
    case 106:
      return console.log("볼리베어");
      break;
    case 20:
      return console.log("누누");
      break;
    case 4:
      return console.log("트위스티드 페이트");
      break;
    case 24:
      return console.log("잭스");
      break;
    case 102:
      return console.log("쉬바나");
      break;
    case 429:
      return console.log("칼리스타");
      break;
    case 36:
      return console.log("문도 박사");
      break;
    case 427:
      return console.log("아이번");
      break;
    case 131:
      return console.log("다이애나");
      break;
    case 63:
      return console.log("브랜드");
      break;
    case 113:
      return console.log("세주아니");
      break;
    case 8:
      return console.log("블라디미르");
      break;
    case 154:
      return console.log("자크");
      break;
    case 421:
      return console.log("렉사이");
      break;
    case 133:
      return console.log("퀸");
      break;
    case 84:
      return console.log("아칼리");
      break;
    case 163:
      return console.log("탈리아");
      break;
    case 18:
      return console.log("트리스타나");
      break;
    case 120:
      return console.log("헤카림");
      break;
    case 15:
      return console.log("시비르");
      break;
    case 236:
      return console.log("루시안");
      break;
    case 107:
      return console.log("렝가");
      break;
    case 19:
      return console.log("워윅");
      break;
    case 72:
      return console.log("스카너");
      break;
    case 54:
      return console.log("말파이트");
      break;
    case 157:
      return console.log("야스오");
      break;
    case 101:
      return console.log("제라스");
      break;
    case 17:
      return console.log("티모");
      break;
    case 75:
      return console.log("나서스");
      break;
    case 58:
      return console.log("레넥톤");
      break;
    case 119:
      return console.log("드레이븐");
      break;
    case 35:
      return console.log("샤코");
      break;
    case 50:
      return console.log("스웨인");
      break;
    case 91:
      return console.log("탈론");
      break;
    case 40:
      return console.log("잔나");
      break;
    case 115:
      return console.log("직스");
      break;
    case 245:
      return console.log("에코");
      break;
    case 61:
      return console.log("오리아나");
      break;
    case 114:
      return console.log("피오라");
      break;
    case 9:
      return console.log("피들스틱");
      break;
    case 31:
      return console.log("초가스");
      break;
    case 33:
      return console.log("람머스");
      break;
    case 7:
      return console.log("르블랑");
      break;
    case 16:
      return console.log("소라카");
      break;
    case 26:
      return console.log("질리언");
      break;
    case 56:
      return console.log("녹턴");
      break;
    case 222:
      return console.log("징크스");
      break;
    case 83:
      return console.log("요릭");
      break;
    case 6:
      return console.log("우르곳");
      break;
    case 203:
      return console.log("킨드레드");
      break;
    case 21:
      return console.log("미스 포츈");
      break;
    case 62:
      return console.log("오공");
      break;
    case 53:
      return console.log("블리츠크랭크");
      break;
    case 98:
      return console.log("쉔");
      break;
    case 201:
      return console.log("브라움");
      break;
    case 5:
      return console.log("신 짜오");
      break;
    case 29:
      return console.log("트위치");
      break;
    case 11:
      return console.log("마스터 이");
      break;
    case 44:
      return console.log("타릭");
      break;
    case 32:
      return console.log("아무무");
      break;
    case 41:
      return console.log("갱플랭");
      break;
    case 48:
      return console.log("트런들");
      break;
    case 38:
      return console.log("카사딘");
      break;
    case 161:
      return console.log("벨코즈");
      break;
    case 143:
      return console.log("자이라");
      break;
    case 267:
      return console.log("나미");
      break;
    case 59:
      return console.log("자르반 4세");
      break;
    case 81:
      return console.log("이즈리얼");
      break;
    case 350:
      return console.log("유미");
      break;
    case 145:
      return console.log("카이사");
      break;
    case 518:
      return console.log("니코");
      break;
    case 142:
      return console.log("조이");
      break;
    case 498:
      return console.log("자야");
      break;
    case 517:
      return console.log("사일러스");
      break;
    case 141:
      return console.log("케인");
      break;
    case 516:
      return console.log("오른");
      break;
    case 555:
      return console.log("파이크");
      break;
    case 164:
      return console.log("카멜");
      break;
    case 246:
      return console.log("키아나");
      break;
    case 497:
      return console.log("라칸");
      break;
    case 777:
      return console.log("요네");
      break;
    case 876:
      return console.log("릴리아");
      break;
    case 235:
      return console.log("세나");
      break;
    case 875:
      return console.log("세트");
      break;
    case 523:
      return console.log("아펠리오스");
      break;

    case 223:
      return console.log("탐 켄치");
      break;

    case 360:
      return console.log("사미라");
      break;

    case 234:
      return console.log("비에고");
      break;

    default:
      return console.log("-1");
      break;
  }
}

//소환사 닉네임 서치 및 id값 찾기
const getRiotApiSummonerInfo = async () => {
  const summonerIdEnCode = encodeURI(summonerId);

  const response = await axios.get(
    `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerIdEnCode}?api_key=${riotApiKey}`
  );

  //   response.id의 값으로 respose2의 data반환하여 게임이 잡혔는지 여부의 lolInfoState를 반환
  const response2 = await axios.get(
    `https://kr.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${response.data.id}?api_key=${riotApiKey}`
  );

  changeEnglishToKoreanName(response2.data.participants[2].championId);

  return (lolInfo = response.data), (lolInfoState = response2.data);
};

//소환사 닉네임 id값으로 상태 체크
const getRiotApiSummonerState = async (lolInfo) => {
  console.log("lolInfo", lolInfo.id);
};

getRiotApiSummonerInfo();
getRiotApiSummonerState(lolInfo);

app.use(cors());

app.use(bodyParser.json());
app.use("/api", (req, res) => res.json({ username: "bryan" }));
app.use("/lol", (req, res) =>
  res.json({
    id: lolInfo.id,
    name: lolInfo.name,
    state: lolInfoState.gameType,
    participants: lolInfoState.gameMode,
  })
);

app.listen(port, () => {
  console.log(`express is running on ${port}`);
});
