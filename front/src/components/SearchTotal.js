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

      let gameInfoMode = "";
      let gameInfoType = "";

      const users = gameUsers[0][1].map((user, index2) => {
        // console.log(index1, index2);

        gameInfoMode = user.gameMode;
        gameInfoType = user.gameType;

        let date = user.gameCreation;
        let w_date = new Date(date.valueOf());
        let w_time = w_date.getTime();

        let cur = new Date();
        var c_time = cur.getTime();

        var chai = c_time - w_time;

        if (chai < 1000 * 60) beforeTime += Math.floor(chai / 1000) + " 초전";
        else if (chai < 1000 * 60 * 60)
          beforeTime = Math.floor(chai / (1000 * 60)) + " 분전";
        else if (chai < 1000 * 60 * 60 * 24)
          beforeTime = Math.floor(chai / (1000 * 60 * 60)) + " 시간전";
        else if (chai < 1000 * 60 * 60 * 24 * 30)
          beforeTime = Math.floor(chai / (1000 * 60 * 60 * 24)) + " 일전";
        else if (chai < 1000 * 60 * 60 * 24 * 30 * 12)
          beforeTime = Math.floor(chai / (1000 * 60 * 60 * 24 * 30)) + " 달전";

        const test2 = new Date(user.gameCreation) - new Date();
        const itemLength = 6;

        result.push(
          <li
            className={`user_state__item user_state__item--${user.win}`}
            key={`${index1}${index2}`}
          >
            {index1} - {user.summonerName} - {user.kills} / {user.deaths} /{" "}
            {user.assists} - {user.win} / 포지션 : {user.position}
            <img
              width="50px"
              src={`http://ddragon.leagueoflegends.com/cdn/11.19.1/img/champion/${user.championName}.png`}
              alt="champion img"
            />
            <p>
              <img
                width="50px"
                src={`https://ddragon.leagueoflegends.com/cdn/11.19.1/img/spell/${user.summoner1Id}.png`}
                alt="champion img"
              />
            </p>
            <p>
              <img
                width="50px"
                src={`https://ddragon.leagueoflegends.com/cdn/11.19.1/img/spell/${user.summoner2Id}.png`}
                alt="champion img"
              />
            </p>
            <ul style={{ display: "flex" }}>
              <p>
                <img
                  width="50px"
                  src={`https://ddragon.leagueoflegends.com/cdn/11.19.1/img/item/${user.item0}.png`}
                  alt="champion img"
                />
              </p>
              <p>
                <img
                  width="50px"
                  src={`https://ddragon.leagueoflegends.com/cdn/11.19.1/img/item/${user.item1}.png`}
                  alt="champion img"
                />
              </p>
              <p>
                <img
                  width="50px"
                  src={`https://ddragon.leagueoflegends.com/cdn/11.19.1/img/item/${user.item2}.png`}
                  alt="champion img"
                />
              </p>
              <p>
                <img
                  width="50px"
                  src={`https://ddragon.leagueoflegends.com/cdn/11.19.1/img/item/${user.item3}.png`}
                  alt="champion img"
                />
              </p>
              <p>
                <img
                  width="50px"
                  src={`https://ddragon.leagueoflegends.com/cdn/11.19.1/img/item/${user.item4}.png`}
                  alt="champion img"
                />
              </p>
              <p>
                <img
                  width="50px"
                  src={`https://ddragon.leagueoflegends.com/cdn/11.19.1/img/item/${user.item5}.png`}
                  alt="champion img"
                />
              </p>
              <p>
                <img
                  width="50px"
                  src={`https://ddragon.leagueoflegends.com/cdn/11.19.1/img/item/${user.item6}.png`}
                  alt="champion img"
                />
              </p>
            </ul>
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
        <ul
          className="user_state__block"
          style={{ padding: `1%`, marginTop: `2%` }}
        >
          {gameInfoMode !== "소환사의 협곡"
            ? gameInfoMode
            : `${gameInfoMode} - ${gameInfoType}`}
          - {beforeTime}
          {result2}
          {/* <button
            onClick={() =>
              alert(
                "상세 오픈 = 티어, 점수, kda등 자세하게 표기 sessionStorage.totalData에 넣어둠"
              )
            }
          >
            상세보기
          </button> */}
        </ul>
      );
    });
    return gameNumber;
  };

  return (
    <div style={{ overflowY: "auto", height: "1000px" }} className={``}>
      <div style={{}}>{rendering(userTotal)}</div>
    </div>
  );
}

const UserDetail = ({ userInfo, addUserList }) => {
  //   console.log(addUserList);
  return (
    <div style={{ borderRadius: "25px", padding: "10px", background: "#ccc" }}>
      <h2>유저 {userInfo ? userInfo.name : ""}의 정보</h2>
      <br />
      {/* <h4>{userInfo ? userInfo.name : " "}</h4> */}
      <p>
        티어 :{" "}
        {userInfo ? (
          <img
            style={{ width: "100px", height: "100px" }}
            src={`/images/ranked-emblems/Emblem_${userInfo.tier.solo.tier}.png`}
          />
        ) : (
          ""
        )}{" "}
        - {userInfo ? userInfo.tier.solo.rank : ""}
        <br />
        {userInfo ? userInfo.tier.solo.leaguePoints : ""}포인트
      </p>
      <p>승리 : {userInfo ? userInfo.tier.solo.wins : ""}</p>
      <p>패배 : {userInfo ? userInfo.tier.solo.losses : ""}</p>
      <button onClick={() => addUserList(userInfo, true, "userList")}>
        리스트 추가하기
      </button>
      {/* <button onClick={() => console.log(userInfo)}>asd</button> */}
      <br />
    </div>
  );
};

const SearchTotal = () => {
  const { totalData1, userInfo, addUserList } = useContext(UserListContext);
  return (
    <div className="info__wrap" style={{ padding: "10px" }}>
      <UserDetail userInfo={userInfo} addUserList={addUserList} />
      <UserTotalView userTotal={totalData1} />
    </div>
  );
};

export default SearchTotal;
