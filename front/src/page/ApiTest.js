// 테스트중인 페이지
// CORS policy 오류 ->브라우저에서 보내서 그럼, 서버에서 보내면 됨

import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import UserInsertForm from "../components/user/UserInsertForm";
import UserList from "../components/user/UserList";
import InGameStateView from "./InGameStateView";
import CurrentMyState from "./CurrentMyState";
import { UserListContext } from "../App";
import UserTotal from "../components/UserTotal";
import * as RealmWeb from "realm-web";
import "../assets/scss/common.scss";
import SearchTotal from "../components/SearchTotal";

let tempList = [];

const appRealm = new RealmWeb.App({ id: "demaciascanner-0-nylor" });

function ApiTest(props) {
  // 상위 context에서function 가져오기
  const currentURI = decodeURI(window.location.href);

  let {
    userList,
    userName,
    insertUser,
    onReset,
    searchUser,
    onChangeHandle,
    sessionStorageInit,
    getUserDataInGame,
    timer,
    isPause,
    userState,
    loading,
    updateInGame,
    startScanner,
    stopScanner,
    scanning,
    modalView,
    modal,
    onTotalData,
    totalData,
    userInfo,
    addUserList,
    searchedName,
  } = useContext(UserListContext);

  useState(() => {
    const aa = new URLSearchParams(currentURI.split("?")[1]).toString();
    console.log("aa", aa);
    if (!aa || aa.length === 0) {
      return;
    }
    const token = aa.split("token=");
    const tokenValue = token[1].split("&");

    const tokenId = tokenValue[1].split("tokenId=");
    console.log(`token=${tokenValue[0]}-------------/ tokenId=${tokenId[1]}`);

    if (token && tokenId) {
      appRealm.emailPasswordAuth
        .confirmUser(tokenValue[0], tokenId[1])
        .then((result) => {
          console.log(result);
        })
        .catch((err) => console.log("err", err));
    }
  }, []);

  // 게임 종료 후 승패 결과, 게임 시간, 끝나고 난 뒤 시간 체크
  const getUserDataGameResult = async (user) => {};

  // 테스트 리스트 사용하기
  const testList = async () => {
    return await axios.get("http://localhost:3001/testlist");
  };

  // 테스트 리스트 반환 - 나중에 나의 db에서 리스트를 받아올때 사용
  const getTestList = (e) => {
    e.preventDefault();
    testList().then((res) => {
      res.data.map((item) => {
        const name = item.summonerName;
        const id = item.summonerId;

        const data = {
          name: name,
          id: id,
        };
        tempList = tempList.concat(data);
      });
      // setUserList(tempList);
      sessionStorage.setItem("userList", JSON.stringify(tempList));
    });
  };

  return (
    <div className="contents" style={{ overflow: "hidden" }}>
      <div className="contents__wrap">
        <UserList users={userList} />
        <InGameStateView state={userState} loading={loading} />
      </div>
      {userInfo ? (
        <div className="contents__wrap total_view">
          <div>
            <SearchTotal
              searchedName={searchedName}
              users={userList}
              onTotalData={onTotalData}
              totalData={totalData}
            />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default ApiTest;
