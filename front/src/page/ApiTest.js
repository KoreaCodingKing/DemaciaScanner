// 테스트중인 페이지
// CORS policy 오류 ->브라우저에서 보내서 그럼, 서버에서 보내면 됨

import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import UserInsertForm from "../components/UserInsertForm";
import UserList from "../components/UserList";
import InGameStateView from "./InGameStateView";
import CurrentMyState from "./CurrentMyState";
import {UserListContext} from '../App';


let tempList = [];
// let timer;
// let isPause = false;


function ApiTest(props) {
  // const [userState, setUserState] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [scanning, setScanning] = useState(false);

  
  // 상위 context에서function 가져오기
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
    scanning
     } = useContext(UserListContext);

  // 게임 종료 후 승패 결과, 게임 시간, 끝나고 난 뒤 시간 체크
  const getUserDataGameResult = async (user) => {
  }

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
    <>
      <hr />
      <button onClick={getTestList}>테스트 리스트 갱신</button>
      <button onClick={sessionStorageInit}>로컬스토리지 초기화</button>
      {/* <button onClick={searchInGameState}>인게임 상태</button> */}
      <button onClick={startScanner}>인게임 스케너</button>
      <button onClick={stopScanner}>인게임 스캐너 중지</button>
      <br />
      <form className="insert_form" onSubmit={insertUser}>
        <UserInsertForm
          // onInsertUser={insertUser}
          inputValue={userName}
          // existValue={status}
          onChangeEvent={onChangeHandle}
        />
      </form>
      <br />
      <UserList users={userList}   />
      <br />
      <div className="id-list"></div>
      <InGameStateView state={userState} loading={loading} />
      {/* <CurrentMyState /> */}
    </>
  );
}

export default ApiTest;
