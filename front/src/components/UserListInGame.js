import React, { useEffect, useState } from "react";
import "../assets/scss/ingamestate.scss";

function TimeView({ gameTime }) {
  const [dateTime, setDateTime] = useState({
    minutes: "",
    seconds: "",
  });

  useEffect(() => {
    if (!gameTime) {
      return;
    }
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
      }

      if (convertDateCurrent() < convertDate(date)) {
        const calcResult =
          3600 - (convertDate(date) - convertDateCurrent());
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
    return () => clearInterval(asd); setDateTime({minutes : "", seconds : ""});
  }, []);

  return (
    <>
      - {dateTime.minutes < 10 ? "0" + dateTime.minutes : dateTime.minutes} :
      {dateTime.seconds < 10 ? "0" + dateTime.seconds : dateTime.seconds}
    </>
  );
}

function User({ user, state, runningTime }) {
  return (
    <div className="user_block">
      <span className="user_block__name">({user})</span> -
      <span className={`state ${state ? "state--true" : "state--false"}`}>
        {state ? "게임중" : "대기중"}
      </span>
      {state ? <TimeView gameTime={runningTime} /> : <span></span>}
    </div>
  );
}

function UserListInGame({ users }) {
  // console.log();
  return (
    <div>
      {users.map((user, index) => (

        <User
          user={user.name}
          key={index}
          state={user.state}
          runningTime={user.currentTimeStamp}
        />
      ))}
    </div>
  );
}

export default UserListInGame;
