import React, { useEffect, useState, useRef } from "react";
import "../../assets/scss/ingamestate.scss";

function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
      savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
      function tick() {
          savedCallback.current();
      }
      const interval = setInterval(tick, delay);
      return () => {
          clearInterval(interval);
      };
  }, [delay]);
}

function TimeView({ gameTime }) {
  const currentDate = new Date();
  const currentSec = (currentDate.getMinutes()) * 60 + (currentDate.getSeconds());

  const [dateTime, setDateTime] = useState(currentSec - (new Date(gameTime).getMinutes() * 60 + new Date(gameTime).getSeconds()));
  const [timer, setTimer] = useState(true);

  const minutes = Math.floor(dateTime / 60);
  const seconds =  dateTime - minutes * 60;
  const content = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  useInterval(() => {
    if (!dateTime) {
      return;
    }
    setDateTime(dateTime + 1);
  }, timer ? 1000 : null);

  return (
    <>
      {content}
    </>
  );

  // useEffect(() => {
  //   if (!gameTime) {
  //     return;
  //   }
  //   const asd = setInterval(() => {
  //     // 현재 시간
  //     const currentDate = new Date();
  //     // 게임 시작한 시간
  //     const date = new Date(gameTime);

  //     // 게임 시간을 초단위로 변환 function
  //     const convertDate = (date) => {
  //       const parmDate = new Date(date);
  //       const targetM = parmDate.getMinutes() * 60;
  //       const targetS = parmDate.getSeconds();

  //       return targetM + targetS;
  //     };

  //     const convertDateCurrent = () => {
        // const parmDate = new Date();
        // const targetM = parmDate.getMinutes() * 60;
        // const targetS = parmDate.getSeconds();

  //       return targetM + targetS;
  //     }

  //     if (convertDateCurrent() < convertDate(date)) {
  //       const calcResult =
  //         3600 - (convertDate(date) - convertDateCurrent());

  //       setDateTime({
  //         minutes: parseInt(calcResult / 60),
  //         seconds: parseInt(calcResult % 60),
  //       });
  //     } else {
  //       const calcResult = convertDateCurrent() - convertDate(date);

  //       setDateTime({
  //         minutes: parseInt(calcResult / 60),
  //         seconds: parseInt(calcResult % 60),
  //       });
  //     }

  //     // 시간 state 갱신
  //   }, 1000);
  //   return () => clearInterval(asd);
  // }, []);
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
