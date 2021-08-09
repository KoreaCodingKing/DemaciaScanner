import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
// import Loading from "../components/Loading";
import UserInsertForm from "../components/user/UserInsertForm";
// import UserList from "../components/user/UserList";
// import InGameStateView from "../page/InGameStateView";
// import CurrentMyState from "../page/CurrentMyState";
import { UserListContext } from "../App";

// style
import "../assets/scss/header.scss";

let tempList = [];

const Header = (props) => {
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
  } = useContext(UserListContext);

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
    <div className="header__search">
      <hr />
      <div className="header__control">
        {/* <button onClick={getTestList}>테스트 리스트 갱신</button> */}
        {/* <button onClick={searchInGameState}>인게임 상태</button> */}
        {/* <button onClick={modalView}>모달 버튼</button> */}
        <button onClick={sessionStorageInit}>로컬스토리지 초기화</button>
        <button onClick={startScanner}>인게임 스케너</button>
        <button onClick={stopScanner}>인게임 스캐너 중지</button>
      </div>
      <form className="insert_form" onSubmit={insertUser}>
        <UserInsertForm inputValue={userName} onChangeEvent={onChangeHandle} />
      </form>
      {/* <br /> */}
      {/* <UserList users={userList} /> */}
      {/* <br /> */}
      {/* <div className="id-list"></div> */}
      {/* <InGameStateView state={userState} loading={loading} /> */}
    </div>
  );
};

export default Header;
