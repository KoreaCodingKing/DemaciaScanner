// 테스트중인 페이지
// CORS policy 오류 ->브라우저에서 보내서 그럼, 서버에서 보내면 됨

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import UserInsertForm from "../components/UserInsertForm";
import UserList from "../components/UserList";
import InGameStateView from "./InGameStateView";

function ApiTest() {
  const [status, setStatus] = useState(false);
  const [userName, setUserName] = useState("");
  const [userList, setuserList] = useState([]);
  const [load, setLoad] = useState(false);
  const [userState, setUserState] = useState(false);

  let testLists = [];

  useEffect(() => {
    const sessionStorageValue = sessionStorage.userList || null;

    if (sessionStorageValue) {
      const userListInSession = JSON.parse(sessionStorageValue);
      setuserList(userListInSession);
    }
  }, []);

  // 인풋 값 변경 확인
  const onChangeHandle = (e) => {
    setUserName(e.target.value);
  };

  const onReset = () => {
    setUserName("");
  };

  const sessionStorageInit = () => {
    sessionStorage.clear();
  };

  // 테스트 리스트 사용하기
  const testList = async () => {
    return await axios.get("http://localhost:3001/testlist");
  };

  // server.js에서 압력받은 id 값 가져오기
  const getUserData = async (userName) => {
    return await axios.post("http://localhost:3001/searchuser", {
      name: userName,
    });
  };

  // 인게임 상태 추출
  const getUserDataInGame = async (users) => {
    return await axios.post("http://localhost:3001/userstatus", {
      name: users.name,
      accountId: users.accountId,
    });
  };

  const getTestList = (e) => {
    e.preventDefault();
    testList().then((res) => {
      res.data.map((item) => {
        const name = item.summonerName;
        const id = item.summonerId;

        const data = {
          name: name,
          accountId: id,
        };
        testLists = testLists.concat(data);
      });
      setuserList(testLists);
      console.log(testLists);
    });
  };

  // 인게임 조회
  const searchInGameState = (e) => {
    e.preventDefault();
    const userList = JSON.parse(sessionStorage.userList);
    console.log(userList);
    if (!userList || userList.length === 0) {
      alert("등록한 유저가 없습니다.");
      return;
    }

    getUserDataInGame(userList[0]).then((res) => {
      const gameState = {
        name: res.name,
        state: res.status,
      };
      setUserState(gameState);
    });
  };

  const insertUser = (e) => {
    e.preventDefault();

    if (!userName) {
      alert("값이 없습니다");
      return;
    }

    const replacedUserName = userName.trim().replace(/\s/gi, "");
    const doesExistUserName = userList.some(
      (id) =>
        id.name.toUpperCase().replace(/\s/gi, "") ===
        replacedUserName.toUpperCase()
    );
    if (doesExistUserName) {
      alert("중복된 소환사 닉네임이 있습니다.");
      onReset();
      return;
    }

    // setUserName(e.target.value);

    getUserData(replacedUserName)
      .then((res) => {
        if (res.data === null) {
          setStatus(false);
          return false;
        }

        setStatus(true);

        const user = {
          name: res.data.name,
          accountId: res.data.id,
        };
        setuserList(userList.concat(user));

        sessionStorage.setItem(
          "userList",
          JSON.stringify(userList.concat(user))
        );
      })
      .catch((err) => {
        setuserList([...userList]);
      });
    onReset();
  };

  if (load)
    return (
      <>
        {" "}
        로딩중...
        <Loading />
      </>
    );

  return (
    <>
      <hr />
      {/* <button onClick={getUserInfo}>정보 갱신</button> */}
      <button onClick={getTestList}>테스트 리스트 갱신</button>
      <button onClick={sessionStorageInit}>로컬스토리지 초기화</button>
      <button onClick={searchInGameState}>인게임 상태</button>
      <br />
      <form className="insert_form" onSubmit={insertUser}>
        <UserInsertForm
          onInsertUser={insertUser}
          inputValue={userName}
          existValue={status}
          onChangeEvent={onChangeHandle}
        />
      </form>
      <br />
      <UserList users={userList} />
      <br />
      <div className="id-list"></div>
      <InGameStateView userValue={userList} userState={userState} />
    </>
  );
}

export default ApiTest;
