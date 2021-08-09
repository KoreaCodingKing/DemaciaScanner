import React, { useContext, useState, useEffect } from "react";
import { UserListContext } from "../../App";
import "../../assets/scss/userList.scss";

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

function User({ user }) {
  const { onRemove, onTotalData, championName } = useContext(UserListContext);
  const [view, setView] = useState(false);

  const [totalData, setTotalData] = useState([]);

  console.log("찾은 유저의 데이터->", user);

  const test = (user) => {
    onTotalData(user).then((res) => {
      setTotalData(res);

      setView(true);

      sessionStorage.setItem(`totalData_${user.name}`, JSON.stringify(res));
    });
  };

  return (
    <div>
      <span>
        ({user.name} - 자유랭크 :{" "}
        {user.tier.flex.tier !== "" ? user.tier.flex.tier : "-"}, 점수 :{" "}
        {user.tier.flex.rank !== "" ? user.tier.flex.rank : "-"} / 솔로랭크 :{" "}
        {user.tier.solo.tier !== "" ? user.tier.solo.tier : "-"}, 점수 :{" "}
        {user.tier.solo.rank !== "" ? user.tier.solo.rank : "-"} )
      </span>
      <button
        onClick={() => {
          onRemove(user.id);
          // setView(false);
        }}
      >
        제거
      </button>
      <button onClick={() => test(user)}>전적 확인하기</button>

      {/* {view ? ( */}
      <UserTotalView
        view={view}
        userTotal={totalData}
        championName={championName}
      />
      {/* ) : (
        <span>false</span>
      )} */}
    </div>
  );
}

function UserList({ users }) {
  // users 데이터 정보
  // [0 : {accountId, id, name}, 1: {...}, 2: {...}]
  // console.log("유저 정보",users)

  // useEffect(() => {
  //   console.log("랜더");
  // });

  return (
    <div>
      {users.map((user, index) => (
        <User user={user} key={index} />
      ))}
    </div>
  );
}

export default UserList;
