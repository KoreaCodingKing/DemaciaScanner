import React, { useEffect, useState, useContext } from "react";
import { UserListContext } from "../App";
import "../assets/scss/searchtotal.scss";

function UserTotalView({
  userTotal,
  gameIndex,
  sortState,
  championName,
  championValue,
}) {
  // console.log(gameIndex);
  const rendering = (user) => {
    const result3 = [];

    // let statsValue = "";
    // console.log(user);

    const gameNumber = user.map((item, index1) => {
      const result2 = [];
      const result = [];
      const gameUsers = Object.entries(item);
      // console.log(gameUsers);
      let beforeTime = "";

      let gameInfoMode = "";
      let gameInfoType = "";

      // queueId로 솔트 값 구해서 ul에 id 넣는다
      const gameQueueId = gameUsers[1][1];
      const gameCreation = gameUsers[0][1];
      // console.log("게임 index 값->", gameIndex);

      const users = gameUsers[12][1].map((user, index2) => {
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
              width="25px"
              src={`http://ddragon.leagueoflegends.com/cdn/11.19.1/img/champion/${user.championName}.png`}
              alt="champion img"
            />
            {/* <p>
              <img
                width="25px"
                src={`https://ddragon.leagueoflegends.com/cdn/11.19.1/img/spell/${user.summoner1Id}.png`}
                alt="champion img"
              />
            </p>
            <p>
              <img
                width="25px"
                src={`https://ddragon.leagueoflegends.com/cdn/11.19.1/img/spell/${user.summoner2Id}.png`}
                alt="champion img"
              />
            </p> */}
            {/* <ul style={{ display: "flex" }}>
              <p>
                <img
                  width="25px"
                  src={`https://ddragon.leagueoflegends.com/cdn/11.19.1/img/item/${user.item0}.png`}
                  alt="champion img"
                />
              </p>
              <p>
                <img
                  width="25px"
                  src={`https://ddragon.leagueoflegends.com/cdn/11.19.1/img/item/${user.item1}.png`}
                  alt="champion img"
                />
              </p>
              <p>
                <img
                  width="25px"
                  src={`https://ddragon.leagueoflegends.com/cdn/11.19.1/img/item/${user.item2}.png`}
                  alt="champion img"
                />
              </p>
              <p>
                <img
                  width="25px"
                  src={`https://ddragon.leagueoflegends.com/cdn/11.19.1/img/item/${user.item3}.png`}
                  alt="champion img"
                />
              </p>
              <p>
                <img
                  width="25px"
                  src={`https://ddragon.leagueoflegends.com/cdn/11.19.1/img/item/${user.item4}.png`}
                  alt="champion img"
                />
              </p>
              <p>
                <img
                  width="25px"
                  src={`https://ddragon.leagueoflegends.com/cdn/11.19.1/img/item/${user.item5}.png`}
                  alt="champion img"
                />
              </p>
              <p>
                <img
                  width="25px"
                  src={`https://ddragon.leagueoflegends.com/cdn/11.19.1/img/item/${user.item6}.png`}
                  alt="champion img"
                />
              </p>
            </ul> */}
          </li>
        );

        if (index2 == 9) {
          result2.push(result);
        } else {
        }
      });

      return (
        <ul
          // sortState = all;
          id={`queue_id ${gameQueueId}`}
          className={`user_state__block queue_${sortState}`}
          style={
            gameQueueId == sortState || sortState == "all"
              ? { display: "block" }
              : { display: "none" }
          }
        >
          {gameInfoType}- {beforeTime}
          {result2}
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

const UserDetail = ({
  userInfo,
  addUserList,
  sortResult,
  myTotalDataSolo,
  myTotalDataFlex,
  myTotalDataAll,
}) => {
  // console.log("받은 자랭 정보 =>", myTotalDataSolo);
  // 챔프 승률 표출
  function champLine(totalData) {
    const data = totalData;

    data.map((item, index) => {
      const targetData = item.championName; //챔프 이름 저장.
    });
  }
  champLine(myTotalDataSolo);

  // 승률
  const winningPercentage = Math.floor(
    (userInfo.tier.solo.wins /
      (userInfo.tier.solo.wins + userInfo.tier.solo.losses)) *
      100
  );

  // console.log("뇽", myTotalDataAll);

  return (
    <div className="search_total__wrap">
      <div className="search_total__header">
        <div className="search_total__content user_infomation">
          <div className="info_thumb">
            <img
              src={`http://ddragon.leagueoflegends.com/cdn/11.19.1/img/profileicon/${userInfo.profileIconId}.png`}
              alt=""
            />
          </div>
          <div className="info_name">
            <p>{userInfo ? userInfo.name : ""}</p>
          </div>
        </div>
        <div className="search_total__content content__info">
          <div className="content__rank">
            <div className="content__rank content__rank--solo">
              {userInfo.tier.solo.tier ? (
                <div>
                  <p className="title">솔로랭크</p>
                  <p className="thumb">
                    <img
                      // style={{ width: "100px", height: "100px" }}
                      src={`/images/ranked-emblems/Emblem_${userInfo.tier.solo.tier}.png`}
                    />
                  </p>
                  <p className="rank_info">
                    <em className="point_color">
                      {userInfo.tier.solo.tier} {userInfo.tier.solo.rank}
                    </em>{" "}
                    / <span>{userInfo.tier.solo.leaguePoints}LP</span>
                  </p>
                  <p className="result_info">
                    <em className="point_color">{userInfo.tier.solo.wins}승</em>{" "}
                    <span>{userInfo.tier.solo.losses}패</span>
                  </p>
                  <div className="result_chart">
                    <div className="chart_bar">
                      <div
                        className="chart_bar__point"
                        style={{ width: `${winningPercentage}%` }}
                      ></div>
                    </div>
                    <div className="chart_value">
                      <span>{`${winningPercentage}%`}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <span className="none_data">없음</span>
              )}
            </div>
            <div className="content__rank content__rank--flex">
              {userInfo.tier.flex.tier ? (
                <div>
                  <p className="title">자유랭크</p>
                  <p className="thumb">
                    <img
                      // style={{ width: "100px", height: "100px" }}
                      src={`/images/ranked-emblems/Emblem_${userInfo.tier.flex.tier}.png`}
                    />
                  </p>
                  <p className="rank_info">
                    <em className="point_color">
                      {userInfo.tier.flex.tier} {userInfo.tier.flex.rank}
                    </em>{" "}
                    / <span>{userInfo.tier.flex.leaguePoints}LP</span>
                  </p>
                  <p className="result_info">
                    <em className="point_color">{userInfo.tier.flex.wins}승</em>{" "}
                    <span>{userInfo.tier.flex.losses}패</span>
                  </p>
                  <div className="result_chart">
                    <div className="chart_bar">
                      <div
                        className="chart_bar__point"
                        style={{ width: `${winningPercentage}%` }}
                      ></div>
                    </div>
                    <div className="chart_value">
                      <span>{`${winningPercentage}%`}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <span className="none_data">없음</span>
              )}
            </div>
          </div>
          <div className="content__current_total">최근 전적</div>
          <div className="content__current_total content__current_champion">
            <div className="content__sort">
              <ul>
                <li>
                  <button
                    className="sort__button all"
                    onClick={(e) => {
                      e.preventDefault();
                      sortResult("all");
                    }}
                  >
                    전체
                  </button>
                </li>
                <li>
                  <button
                    className="sort__button solo"
                    onClick={(e) => {
                      e.preventDefault();
                      sortResult("420");
                    }}
                  >
                    솔로랭크
                  </button>
                </li>
                <li>
                  <button
                    className="sort__button flex"
                    onClick={(e) => {
                      e.preventDefault();
                      sortResult("440");
                    }}
                  >
                    자유랭크
                  </button>
                </li>
              </ul>
            </div>
            <ul className="list">
              <li className="list_item">
                <dl>
                  <div className="list_item__1">
                    <dt className="thumb"></dt>
                  </div>
                  <div className="list_item__2">
                    <dd className="name">샤코</dd>
                    <dd className="info">50% (10승 10패) 평점 5.0</dd>
                  </div>
                </dl>
              </li>
              <li className="list_item">
                <dl>
                  <div className="list_item__1">
                    <dt className="thumb"></dt>
                  </div>
                  <div className="list_item__2">
                    <dd className="name">샤코</dd>
                    <dd className="info">50% (10승 10패) 평점 5.0</dd>
                  </div>
                </dl>
              </li>
              <li className="list_item">
                <dl>
                  <div className="list_item__1">
                    <dt className="thumb"></dt>
                  </div>
                  <div className="list_item__2">
                    <dd className="name">샤코</dd>
                    <dd className="info">50% (10승 10패) 평점 5.0</dd>
                  </div>
                </dl>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <button onClick={() => addUserList(userInfo, true, "userList")}>
        리스트 추가하기
      </button>
      <br />
    </div>
  );
};

const SearchTotal = () => {
  const {
    totalData1,
    userInfo,
    addUserList,
    myTotalDataSolo,
    myTotalDataFlex,
    myTotalDataAll,
  } = useContext(UserListContext);
  const [sortState, setSortState] = useState(false);

  function sortResult(target) {
    const data = target; //queueId_000;
    setSortState(data);
    // return (data);
  }

  return (
    <div className="info__wrap">
      <UserDetail
        userInfo={userInfo}
        addUserList={addUserList}
        myTotalDataSolo={myTotalDataSolo}
        myTotalDataFlex={myTotalDataFlex}
        myTotalDataAll={myTotalDataAll}
        sortResult={sortResult}
      />
      <UserTotalView
        userTotal={totalData1}
        sortState={sortState}
        gameIndex={myTotalDataAll}
      />
    </div>
  );
};

export default SearchTotal;
