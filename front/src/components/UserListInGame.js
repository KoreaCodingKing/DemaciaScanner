import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/scss/ingamestate.scss";

function TimeView({ gameTime, gameLength }) {
  const [dateTime, setDateTime] = useState({
    minutes: "",
    seconds: "",
  });

  useEffect(() => {
    if (!gameTime) {
      return;
    }
    setDateTime({ minutes: "", seconds: "" });
    const asd = setInterval(() => {
      // 현재 시간
      const currentDate = new Date();
      // 게임 시작한 시간
      const date = new Date(gameTime);

      // 게임 시간을 초단위로 변환 function
      const convertDate = (date) => {
        const parmDate = new Date(date);
        const targetM = parmDate.getMinutes() * 60;
        const targetS = parmDate.getSeconds();

        return targetM + targetS;
      };

      const convertDateCurrent = () => {
        const parmDate = new Date();
        const targetM = parmDate.getMinutes() * 60;
        const targetS = parmDate.getSeconds();

        return targetM + targetS;
      };

      if (convertDateCurrent() < convertDate(date)) {
        const calcResult = 3600 - (convertDate(date) - convertDateCurrent());
        // 3600은 60초에 1분, 6분에 360초, 60분에 3600초

        setDateTime({
          minutes: parseInt(calcResult / 60),
          seconds: parseInt(calcResult % 60),
        });
      } else {
        const calcResult = convertDateCurrent() - convertDate(date);

        setDateTime({
          minutes: parseInt(calcResult / 60),
          seconds: parseInt(calcResult % 60),
        });
      }

      // 시간 state 갱신
    }, 1000);
    return () => {
      clearInterval(asd);
      setDateTime({ minutes: "", seconds: "" });
    };
  }, []);

  return (
    <span className="user_block__symbol--txt">
      {dateTime.minutes < 10 ? "0" + dateTime.minutes : dateTime.minutes} :
      {dateTime.seconds < 10 ? "0" + dateTime.seconds : dateTime.seconds}
    </span>
  );
}

function User({ user, state, runningTime, numb, revisionData }) {
  const [show, setShow] = useState(false);
  const [gameStart, setGameStart] = useState(false);
  const [champInfoId, setChampInfoId] = useState();
  const [champInfoName, setChampInfoName] = useState();

  const gameLength = user.gameLength;

  // console.log("유저 데이터", user);
  const myName = user.name;
  console.log(user);

  if (!user.state) {
    // return false; //하면 게임중이지 않은 리스트가 사라짐 (사용할 수 있을듯)
  } else {
    user.participants.map((item, index) => {
      if (item.summonerName == myName) {
        const data = axios
          .get(
            "http://ddragon.leagueoflegends.com/cdn/11.19.1/data/ko_KR/champion.json"
          )
          .then((res) => {
            const championList = res.data.data;
            const convertToObjectChampionList = Object.entries(championList);

            convertToObjectChampionList.map((item2, index) => {
              if (item2[1].key == item.championId) {
                setChampInfoId(item2[1].id.replace(/\s/gi, ""));
                setChampInfoName(item2[1].name.replace(/\s/gi, ""));
              }
            });
          });
      } else {
        // console.log("다름, summonerName", item.summonerName);
      }
    });
  }

  return (
    <div
      className={`user_block card state_${user.state}`}
      style={{ animationDelay: `0.${numb}s` }}
    >
      <div className="user_block__img">
        {champInfoId ? (
          // Kai'Sa -> 처럼 특수 부호가 들어간게 있는듯 하다.
          <img
            src={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champInfoId}_0.jpg`}
            alt={champInfoId}
          />
        ) : (
          ""
        )}
      </div>
      <div className="user_block__info">
        <div className="user_block__wrap">
          <p className="user_block__name">{user.name}</p>
          <p className="user_block__name champ">
            {champInfoName ? `${champInfoName}` : "-"}
          </p>
          <p className="user_block__memo">
            메모메모메모메모메모메모메모메모메모메모
            메모메모메모메모메모메모메모메모메모메모
          </p>
        </div>
      </div>

      <div className="user_block__symbol">
        <div>
          {gameLength != 0 && state ? (
            <TimeView gameTime={runningTime} gameLength={gameLength} />
          ) : (
            <span></span>
          )}
        </div>
        <div className="user_block__game-type">
          <span>{state ? `${user.gameType}` : `대기중`}</span>
        </div>
      </div>
    </div>
  );
}

function UserListInGame({ users, userList }) {
  // console.log(userList);
  useEffect(() => {
    // users.map((user) => {
    //   console.log(`${user.name} - ${user.currentTimeStamp}`);
    // });

    return () => console.log("없어짐");
  }, []);
  const numb = users.length;

  return (
    <div className="ingame_view__content ingame_view__content--card">
      {users.map((user, index) => (
        <User
          user={user}
          key={index}
          numb={index}
          state={user.state}
          revisionData={userList[index]}
          runningTime={user.currentTimeStamp}
        />
      ))}
    </div>
  );
}

export default UserListInGame;
