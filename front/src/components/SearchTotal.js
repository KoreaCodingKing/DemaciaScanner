import React, { useEffect, useState, useContext, useRef, useMemo } from "react";
import { UserListContext } from "../App";
import "../assets/scss/searchtotal.scss";

function UserTotalView({
  searchedName,
  userTotal,
  gameIndex,
  sortState,
  championName,
  championValue,
}) {
  const [tempState1, setTempState1] = useState(false);
  const [selectNumb, setSelectNumb] = useState("");
  // console.log(gameIndex);
  const rendering = (user) => {
    // 나의 이름
    // console.log(searchedName);

    const gameNumber = user.map((item, index1) => {
      const temp_false = false;

      const result3 = [];
      const myResult = [];
      const result2 = [];
      const result = [];
      const simpleResult = [];
      const gameUsers = Object.entries(item);
      let beforeTime = "";

      let gameInfoMode = "";
      let gameInfoType = "";
      let gameDuration = "";
      let gameResult = "";

      // queueId로 솔트 값 구해서 ul에 id 넣는다
      const gameQueueId = gameUsers[1][1];
      const gameCreation = gameUsers[0][1];

      const users = gameUsers[12][1].map((user, index2) => {
        gameInfoMode = user.gameMode;
        gameInfoType = user.gameType;
        gameDuration = user.gameDuration;

        if (user.summonerName == searchedName) {
          gameResult = user.win;

          // simple 생성
          result3.push(
            <div className="user_block list" style={{ height: "120px" }}>
              <div
                className="user_block__info"
                style={{
                  justifyContent: "space-evenly",
                  paddingLeft: "2%",
                  alignItems: "center",
                }}
              >
                <div className="temp__wrap" style={{ display: "flex" }}>
                  <div className="user_block__wrap">
                    <img
                      style={{ borderRadius: "50px" }}
                      width="50px"
                      src={`http://ddragon.leagueoflegends.com/cdn/11.21.1/img/champion/${user.championName}.png`}
                      alt="champion img"
                    />
                    <p
                      className="user_block__name champ"
                      style={{ textAlign: "center" }}
                    >
                      {user.championName}
                    </p>
                  </div>
                  <div
                    className="user_block__wrap"
                    style={{
                      display: "flex",
                      marginLeft: "10px",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      height: "70px",
                    }}
                  >
                    <img
                      width="30px"
                      src={
                        user.summoner1Id
                          ? `https://ddragon.leagueoflegends.com/cdn/11.21.1/img/spell/${user.summoner1Id}.png`
                          : "https://via.placeholder.com/25/444444"
                      }
                      alt="champion img"
                    />
                    <img
                      width="30px"
                      src={
                        user.summoner2Id
                          ? `https://ddragon.leagueoflegends.com/cdn/11.21.1/img/spell/${user.summoner2Id}.png`
                          : "https://via.placeholder.com/25/444444"
                      }
                      alt="champion img"
                    />
                  </div>

                  {/* <div
                    className="user_block__wrap"
                    style={{ marginLeft: "3%", width: "100%" }}
                  >
                    <p className="user_block__name">{searchedName}</p>
                    <p className="user_block__name champ">
                      {user.championName}
                    </p>
                  </div> */}
                </div>
                <div className="temp__wrap">
                  {/* 아이템 */}
                  <div
                    className="user_block__wrap user_block__wrap--item"
                    style={{
                      width: "140px",
                      marginLeft: "3%",
                      display: "flex",
                      flexWrap: "wrap",
                    }}
                  >
                    <div>
                      <img
                        width="30px"
                        src={
                          user.item0
                            ? `https://ddragon.leagueoflegends.com/cdn/11.21.1/img/item/${user.item0}.png`
                            : "https://via.placeholder.com/25/444444"
                        }
                        alt="x"
                      />
                    </div>
                    <div>
                      <img
                        width="30px"
                        src={
                          user.item1
                            ? `https://ddragon.leagueoflegends.com/cdn/11.21.1/img/item/${user.item1}.png`
                            : "https://via.placeholder.com/25/444444"
                        }
                        alt="x"
                      />
                    </div>
                    <div>
                      <img
                        width="30px"
                        src={
                          user.item2
                            ? `https://ddragon.leagueoflegends.com/cdn/11.21.1/img/item/${user.item2}.png`
                            : "https://via.placeholder.com/25/444444"
                        }
                        alt="x"
                      />
                    </div>
                    <div>
                      <img
                        width="30px"
                        src={
                          user.item3
                            ? `https://ddragon.leagueoflegends.com/cdn/11.21.1/img/item/${user.item6}.png`
                            : "https://via.placeholder.com/25/444444"
                        }
                        alt="x"
                      />
                    </div>
                    <div>
                      <img
                        width="30px"
                        src={
                          user.item4
                            ? `https://ddragon.leagueoflegends.com/cdn/11.21.1/img/item/${user.item4}.png`
                            : "https://via.placeholder.com/25/444444"
                        }
                        alt="x"
                      />
                    </div>
                    <div>
                      <img
                        width="30px"
                        src={
                          user.item5
                            ? `https://ddragon.leagueoflegends.com/cdn/11.21.1/img/item/${user.item5}.png`
                            : "https://via.placeholder.com/25/444444"
                        }
                        alt="x"
                      />
                    </div>
                    <div>
                      <img
                        width="30px"
                        src={
                          user.item6
                            ? `https://ddragon.leagueoflegends.com/cdn/11.21.1/img/item/${user.item3}.png`
                            : "https://via.placeholder.com/25/444444"
                        }
                        alt="x"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="user_block__info" style={{ width: "200px" }}>
                <div
                  className="user_block__wrap"
                  style={{
                    color: "red",
                    marginLeft: "3%",
                    alignSelf: "center",
                  }}
                >
                  <p>
                    {user.kills} / {user.deaths} / {user.assists}
                  </p>
                  <p>
                    kda:{" "}
                    {((user.kills + user.assists) / user.deaths).toFixed(2) ==
                    "Infinity"
                      ? "perfect"
                      : ((user.kills + user.assists) / user.deaths).toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="user_block__info simple">{simpleResult}</div>
            </div>
          );
        }

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

        //리렌더링이 바로바로 필요가 없음

        // 상단 노출용 simple result
        simpleResult.push(
          <li
            className={`user_state__item user_state__item--${user.win}`}
            key={`${index1}${index2}`}
          >
            <div className="user_block list">
              <div
                className="user_block__info"
                style={{
                  alignItems: "center",
                }}
              >
                <div
                  className="temp__wrap"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <div className="user_block__wrap user_block__wrap--champ--img">
                    <p className="user_block__img champ">
                      <img
                        style={{ borderRadius: "50px" }}
                        width="50px"
                        src={`http://ddragon.leagueoflegends.com/cdn/11.21.1/img/champion/${user.championName}.png?size=23`}
                        alt="champion img"
                      />
                    </p>
                  </div>

                  <div className="user_block__wrap user_block__wrap--info-name">
                    <p className="user_block__name">{user.summonerName}</p>
                  </div>
                </div>
              </div>
            </div>
          </li>
        );

        if (tempState1) {
          // 디테일 포함 모든 전적
          console.log(index1, "-번째 전적의 자세한 정보 노출");
          result.push(
            <li
              className={`user_state__item user_state__item--${user.win}`}
              key={`${index1}${index2}`}
            >
              <div className="user_block list">
                <div
                  className="user_block__info"
                  style={{
                    // justifyContent: "space-evenly",
                    // paddingLeft: "2%",
                    alignItems: "center",
                  }}
                >
                  <div
                    className="temp__wrap"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <div className="user_block__wrap user_block__wrap--champ--img">
                      <p className="user_block__img champ">
                        <img
                          style={{ borderRadius: "50px" }}
                          width="50px"
                          src={`http://ddragon.leagueoflegends.com/cdn/11.21.1/img/champion/${user.championName}.png`}
                          alt="champion img"
                        />
                      </p>
                      <p
                        className="user_block__name champ champ1 simple-disable-data--01"
                        style={{ textAlign: "center" }}
                      >
                        {user.championName}
                      </p>
                    </div>
                    <div className="user_block__wrap user_block__wrap--spell simple-disable-data--02">
                      <img
                        width="30px"
                        src={
                          user.summoner1Id
                            ? `https://ddragon.leagueoflegends.com/cdn/11.21.1/img/spell/${user.summoner1Id}.png`
                            : "https://via.placeholder.com/25/444444"
                        }
                        alt="x"
                      />
                      <img
                        width="30px"
                        src={
                          user.summoner2Id
                            ? `https://ddragon.leagueoflegends.com/cdn/11.21.1/img/spell/${user.summoner2Id}.png`
                            : "https://via.placeholder.com/25/444444"
                        }
                        alt="x"
                      />
                    </div>

                    <div className="user_block__wrap user_block__wrap--info-name">
                      <p className="user_block__name">{user.summonerName}</p>
                      <p className="user_block__name champ champ2 simple-disable-data--05">
                        {user.championName}
                      </p>
                    </div>
                  </div>
                  <div className="temp__wrap simple-disable-data--03">
                    {/* 아이템 */}
                    <div
                      className="user_block__wrap user_block__wrap--item"
                      // style={{
                      //   width: "140px",
                      //   marginLeft: "3%",
                      //   display: "flex",
                      //   flexWrap: "wrap",
                      // }}
                    >
                      <div>
                        <img
                          width="30px"
                          src={
                            user.item0
                              ? `https://ddragon.leagueoflegends.com/cdn/11.21.1/img/item/${user.item0}.png`
                              : "https://via.placeholder.com/25/444444"
                          }
                          alt="x"
                        />
                      </div>
                      <div>
                        <img
                          width="30px"
                          src={
                            user.item1
                              ? `https://ddragon.leagueoflegends.com/cdn/11.21.1/img/item/${user.item1}.png`
                              : "https://via.placeholder.com/25/444444"
                          }
                          alt="x"
                        />
                      </div>
                      <div>
                        <img
                          width="30px"
                          src={
                            user.item2
                              ? `https://ddragon.leagueoflegends.com/cdn/11.21.1/img/item/${user.item2}.png`
                              : "https://via.placeholder.com/25/444444"
                          }
                          alt="x"
                        />
                      </div>
                      <div>
                        <img
                          width="30px"
                          src={
                            user.item6
                              ? `https://ddragon.leagueoflegends.com/cdn/11.21.1/img/item/${user.item3}.png`
                              : "https://via.placeholder.com/25/444444"
                          }
                          alt="x"
                        />
                      </div>
                      {/* <div>
                        <img
                          width="30px"
                          src={
                            user.item3
                              ? `https://ddragon.leagueoflegends.com/cdn/11.21.1/img/item/${user.item6}.png`
                              : "https://via.placeholder.com/25/444444"
                          }
                          alt="x"
                        />
                      </div> */}
                      <div>
                        <img
                          width="30px"
                          src={
                            user.item4
                              ? `https://ddragon.leagueoflegends.com/cdn/11.21.1/img/item/${user.item4}.png`
                              : "https://via.placeholder.com/25/444444"
                          }
                          alt="x"
                        />
                      </div>
                      <div>
                        <img
                          width="30px"
                          src={
                            user.item5
                              ? `https://ddragon.leagueoflegends.com/cdn/11.21.1/img/item/${user.item5}.png`
                              : "https://via.placeholder.com/25/444444"
                          }
                          alt="x"
                        />
                      </div>
                      <div>
                        <img
                          width="30px"
                          src={
                            user.item3
                              ? `https://ddragon.leagueoflegends.com/cdn/11.21.1/img/item/${user.item6}.png`
                              : "https://via.placeholder.com/25/444444"
                          }
                          alt="x"
                        />
                      </div>
                      {/* <div>
                        <img
                          width="30px"
                          src={
                            user.item6
                              ? `https://ddragon.leagueoflegends.com/cdn/11.21.1/img/item/${user.item3}.png`
                              : "https://via.placeholder.com/25/444444"
                          }
                          alt="x"
                        />
                      </div> */}
                    </div>
                  </div>
                </div>
                <div
                  className="user_block__info simple-disable-data--04"
                  // style={{ width: "200px" }}
                >
                  <div
                    className="user_block__wrap"
                    style={{
                      color: "red",
                      marginLeft: "3%",
                      alignSelf: "center",
                    }}
                  >
                    <p>
                      {user.kills} / {user.deaths} / {user.assists}
                    </p>
                    <p>
                      kda:{" "}
                      {((user.kills + user.assists) / user.deaths).toFixed(2) ==
                      "Infinity"
                        ? "perfect"
                        : ((user.kills + user.assists) / user.deaths).toFixed(
                            2
                          )}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          );
        } else {
          console.log("simple 버전 노출");
        }

        if (index2 == 9) {
          // 모든 데이터 정렬
          result2.push(result);
          // 나의 게임 결과들만 정렬
          myResult.push(result3);
        } else {
        }
      });

      return (
        <div
          // sortState = all;
          id={`queue_id ${index1}`}
          className={`user_state__block user_state__block--${gameResult} queue_${sortState}`}
          style={
            gameQueueId == sortState || sortState == "all"
              ? { display: "block" }
              : { display: "none" }
          }
        >
          {gameInfoType}- {beforeTime} - {gameDuration} - {gameResult}
          <button
            data-tag={index1}
            onClick={(e) => {
              setTempState1(true);
              setSelectNumb(e.currentTarget.dataset.tag);
            }}
          >
            전적 자세히 보기
          </button>
          <div className="totalview__my">
            {myResult.map((item, index) => {
              return (
                <div className="ingame_view__content ingame_view__content--list">
                  {item}
                </div>
              );
            })}
          </div>
          {/* 
            자세한 전적 보여주는 부분. 
          */}
          {!tempState1 ? (
            <div className={`totalview__all ${index1}`}></div>
          ) : (
            <div className={`totalview__all ${index1}`}>
              <ul
                style={
                  selectNumb == index1
                    ? { display: "block" }
                    : { display: "none" }
                }
              >
                {result2}
              </ul>
            </div>
          )}
        </div>
      );
    });
    return gameNumber;
  };

  const rendered = useMemo(
    () => rendering(userTotal),
    [searchedName, userTotal, sortState, tempState1, selectNumb]
  );

  // const renderingFunc = useMemo(rendering(s), [])

  return (
    <div style={{ overflowY: "auto", height: "1000px" }} className={``}>
      <div style={{}}>{rendered}</div>
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
              src={`http://ddragon.leagueoflegends.com/cdn/11.21.1/img/profileicon/${userInfo.profileIconId}.png`}
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

const SearchTotal = ({ searchedName, totalLoading }) => {
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
      {!totalLoading ? (
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
            searchedName={searchedName}
            userTotal={totalData1}
            sortState={sortState}
            gameIndex={myTotalDataAll}
          />
        </div>
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
};

export default SearchTotal;
