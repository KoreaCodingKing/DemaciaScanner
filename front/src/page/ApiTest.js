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
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [idList, setIdList] = useState([]);
  const [load, setLoad] = useState(false);
  const [userState, setUserState] = useState(false);

  useEffect(() => {
    const localStorageValue = localStorage.idList;

    if (localStorageValue) {
      const reslut = JSON.parse(localStorageValue);
      setIdList(reslut);
      // *****************************************************
      // 새로고침 했을때, 서버에서도 같은 로컬 스토리지 값으로 갱신되어야 하는가
      // *****************************************************
      console.log("값이 있다", reslut);
    } else {
      console.log("값이 없다");
    }
  }, []);

  const getUserInfo = async () => {
    try {
      setLoad(true);
      const response = await axios.get("http://localhost:3001/insertuser");
      Promise.resolve(response).then((getData) => {
        // console.log(getData.data[0]);
        setName(getData.data[0].name);
        setId(getData.data[0].id);
      });
    } catch (e) {
      console.error(e);
    }
    setLoad(false);
  };

  // 인풋 값 변경 확인
  const onChangeHandle = (e) => {
    setUserName(e.target.value);
  };

  const onReset = () => {
    setUserName("");
  };

  const localStorageInit = () => {
    localStorage.clear();
  };

  // server.js에서 압력받은 id 값 가져오기
  const getUserData = async (userName) => {
    const data = new Object({
      id: userName,
    });
    return await axios.post("http://localhost:3001/insertuser", {
      id: data.id,
    });
  };

  // 인게임 상태 추출
  const getUserDataInGame = async (accountId) => {
    const data = new Object({
      name: accountId.name,
      id: accountId.id,
    });
    return await axios.post("http://localhost:3001/userstate", {
      name: data.name,
      status: data.id,
    });
  };

  // 인게임 조회
  const searchInGameState = (e) => {
    e.preventDefault();
    const result = JSON.parse(localStorage.idList);
    // console.log(result[0].name);

    getUserDataInGame(result[0]).then((res) => {
      const gameState = {
        name: res.name,
        state: res.status,
      };
      setUserState(gameState);
    });
  };

  // 아이디 조회
  const insertUser = (e) => {
    e.preventDefault();

    // const trimmedUserName
    if (!userName) {
      alert("값이 없습니다");
      return false;
    }
    const inputText = RegExp()
      // 중복제거입력 불가
      for (let i = 0; i < idList.length; i++) {
        if (idList[i].name.toUpperCase() == userName.toUpperCase()) {
          onReset();
          return alert("중복중복");
          break;
        }
      }
      getUserData(userName)
        .then((res) => {
          if (res.data === null) {
            setStatus(false);
            return false;
          }

          setStatus(true);

          const user = {
            name: res.data.name,
            id: res.data.id,
          };
          setIdList(idList.concat(user));

          // 새로고침 데이터 유실 방지 로컬 스토리지 사용
          localStorage.setItem("idList", JSON.stringify(idList.concat(user)));
        })
        .catch((err) => {
          setIdList([...idList]);
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
      <button onClick={getUserInfo}>정보 갱신</button>
      <button onClick={localStorageInit}>로컬스토리지 초기화</button>
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
      <UserList users={idList} />
      <br />
      <div className="id-list"></div>
      <InGameStateView userValue={idList} userState={userState} />
      <br />
      아이디 : {name}
      <br />
      id : {id}
    </>
  );
}

export default ApiTest;
