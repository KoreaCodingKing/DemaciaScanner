import React, { useEffect, useState, useContext } from "react";
import { UserListContext } from "../App";

function UserTotalView({ userTotal, championName, championValue }) {
  const rendering = (user) => {
    const result3 = [];
    // console.log(user);

    // let statsValue = "";

    const gameNumber = user.map((item, index1) => {
      const result2 = [];
      const result = [];
      const gameUsers = Object.entries(item);
      let beforeTime = "";

      const users = gameUsers[0][1].map((user, index2) => {
        // console.log(index1, index2);

        let date = user.gameCreation;
        let w_date = new Date(date.valueOf());
        let w_time = w_date.getTime();

        let cur = new Date();
        var c_time = cur.getTime();

        var chai = c_time - w_time;

        if (chai < 1000 * 60) beforeTime += Math.floor(chai / 1000) + " 초전";
        else if (chai < 1000 * 60 * 60)
          beforeTime += Math.floor(chai / (1000 * 60)) + " 분전";
        else if (chai < 1000 * 60 * 60 * 24)
          beforeTime += Math.floor(chai / (1000 * 60 * 60)) + " 시간전";
        else if (chai < 1000 * 60 * 60 * 24 * 30)
          beforeTime += Math.floor(chai / (1000 * 60 * 60 * 24)) + " 일전";
        else if (chai < 1000 * 60 * 60 * 24 * 30 * 12)
          beforeTime += Math.floor(chai / (1000 * 60 * 60 * 24 * 30)) + " 달전";

        const test2 = new Date(user.gameCreation) - new Date();

        // console.log(
        //   `${new Date(user.gameCreation).getFullYear()}년,${
        //     new Date(user.gameCreation).getMonth() + 1
        //   }월, ${new Date(user.gameCreation).getDate()}일, ${new Date(
        //     user.gameCreation
        //   ).getHours()}시, ${new Date(user.gameCreation).getMinutes()}분`
        // );

        result.push(
          <li
            className={`user_state__item user_state__item--${user.win}`}
            key={`${index1}${index2}`}
          >
            {index1} - {user.summonerName} - {user.kills} / {user.deaths} /{" "}
            {user.assists} - {user.win} -{" "}
            {user.gameMode !== "소환사의 협곡"
              ? user.gameMode
              : `${user.gameMode} - ${user.gameType}`}
          </li>
        );

        if (index2 == 9) {
          result2.push(result);
          // console.log(`${result2}`);
        } else {
          // console.log(result);
        }
      });

      // console.log(result);

      return (
        <ul className="user_state__block">
          {result2}
          <button
            onClick={() =>
              alert(
                "상세 오픈 = 티어, 점수, kda등 자세하게 표기 sessionStorage.totalData에 넣어둠"
              )
            }
          >
            상세보기
          </button>
          - {beforeTime}
        </ul>
      );
    });
    return gameNumber;
  };

  return <div className={``}>{rendering(userTotal)}</div>;
}

const SearchTotal = () => {
  const { totalData1 } = useContext(UserListContext);
  return (
    <>
      <h1>유저 전적 페이지입니다.</h1>
      <UserTotalView userTotal={totalData1} />
    </>
  );
};

export default SearchTotal;
