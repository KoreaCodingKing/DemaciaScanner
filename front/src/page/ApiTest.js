// 테스트중인 페이지
// CORS policy 오류 ->브라우저에서 보내서 그럼, 서버에서 보내면 됨

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import UserInsertForm from "../components/UserInsertForm";
import UserList from "../components/UserList";
import InGameStateView from "./InGameStateView";

let tempList = [];
let statusList = [];

function ApiTest() {
  const [status, setStatus] = useState(false);
  const [userName, setUserName] = useState("");
  const [userList, setuserList] = useState([]);
  const [load, setLoad] = useState(false);
  const [userState, setUserState] = useState([]);

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

  // server.js에서 압력받은 id 값 가져오기
  const getUserData = async (userName) => {
    return await axios.post("http://localhost:3001/searchuser", {
      name: userName,
    });
  };

  // 인게임 상태 추출
  const getUserDataInGame = async (users) => {
    return await axios.post("http://localhost:3001/userstatus", {
      users,
    });
  };

  // 테스트 리스트 사용하기
  const testList = async () => {
    return await axios.get("http://localhost:3001/testlist");
  };

  // 인게임 조회
  const searchInGameState = (e) => {
    e.preventDefault();
    // const userList = JSON.parse(sessionStorage.userList);
    if (!userList || userList.length === 0) {
      alert("등록한 유저가 없습니다.");
      return;
    }
    const inGameData = getUserDataInGame(userList);
    new Promise((resolve) => {
      resolve(inGameData);
    }).then((res) => {
      console.log(res.data);
      setUserState(res.data);
    });

    // 기존 코드(1)
    // inGameData.then((res) => {
    //   res.map((item) => {
    //     const response = new Promise((resolve, reject) => {
    //       resolve(item);
    //     });
    //     response.then((resData) => {
    //       const uState = resData.data.status;
    //       const uName = resData.data.name;

    //       const data = {
    //         name: uName,
    //         state: uState,
    //       };

    //       // if (resData.data.status === true) {
    //       // 게임중
    //       statusList = statusList.concat(data);
    //     });
    //     // 값을 모두 들고있기 때문에, catch필요 없을 듯하다
    //   });
    //   // console.log(statusList);
    //   return setUserState(userState.concat(statusList));
    //   // console.log(statusList);
    // });
  };

  // 유저 검색
  const insertUser = (e) => {
    e.preventDefault();

    const trimmedUserName = userName.trim();

    if (!trimmedUserName) {
      alert("값이 없습니다");
      return;
    }

    const doesExistUserName = userList.some(
      (id) =>
        id.name.replace(/\s/gi, "").toUpperCase() ===
        trimmedUserName.replace(/\s/gi, "").toUpperCase()
    );
    if (doesExistUserName) {
      alert("중복된 소환사 닉네임이 있습니다.");
      onReset();
      return;
    }

    setUserName(e.target.value);

    getUserData(trimmedUserName)
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
        tempList = tempList.concat(data);
      });
      setuserList(tempList);
      sessionStorage.setItem("userList", JSON.stringify(tempList));
    });
  };

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
      <InGameStateView state={userState} />
    </>
  );
}

export default ApiTest;
