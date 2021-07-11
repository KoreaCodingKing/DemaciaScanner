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

      // 현재 시간 - 게임 시작한 시간 = 게임중인 시간
      // const calcResult = convertDate(cuy)
      const calcResult = convertDate(currentDate) - convertDate(date);

      // calcResult < 0 ? Math.abs(calcResult) : calcResult

      // 시간 state 갱신
      setDateTime({
        minutes: parseInt(calcResult / 60),
        seconds: parseInt(calcResult % 60),
      });
    }, 1000);
    return () => clearInterval(asd);
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
    <div>
      <span>({user})</span> -
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
        // console.log(user)
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
