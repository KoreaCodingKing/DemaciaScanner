// 테스트중인 페이지
// CORS policy 오류 ->브라우저에서 보내서 그럼, 서버에서 보내면 됨

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import UserInsertForm from "../components/UserInsertForm";
import UserList from "../components/UserList";
import InGameStateView from "./InGameStateView";

let tempList = [];
let timer;
  let isPause = false;

function ApiTest() {
  const [status, setStatus] = useState(false);
  const [userName, setUserName] = useState("");
  const [userList, setUserList] = useState([]);
  const [userState, setUserState] = useState([]);
  const [loading, setLoading] = useState(false);
  const [scanning, setScanning] = useState(false);
  

  useEffect(() => {
    const sessionStorageValue = sessionStorage.userList || null;

    if (sessionStorageValue) {
      const userListInSession = JSON.parse(sessionStorageValue);
      setUserList(userListInSession);
    }
  }, []);

  // 인풋 값 변경 확인
  const onChangeHandle = (e) => {
    setUserName(e.target.value);
  };

// 리스트 제거 함수
  const onRemove = (targetId) => {
    
    setUserList(userList.filter(user=> user.id !== targetId))
    const data = sessionStorage.getItem('userList')
    const dataParse = JSON.parse(data);
    const removeSesstionList = dataParse.filter(user=> user.id !== targetId);
    sessionStorage.setItem('userList', JSON.stringify(removeSesstionList))

  }

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

// 서버로 부터 인게임 상태를 받아와 상태값 변경 함수
  function updateInGame(targetUserList) {
    if(!isPause) {
      const inGameData = getUserDataInGame(targetUserList);
      new Promise((resolve) => {
        resolve(inGameData);
      }).then((res) => {
        // console.log(res.data);
        setUserState(res.data);
        setLoading(false);
      });
    }else {
      console.log("isPause값은 true로 스캔을 정지합니다.!")
    }
  }

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
          id: res.data.id,
          accountId: res.data.accountId
        };
        setUserList(userList.concat(user));

        sessionStorage.setItem(
          "userList",
          JSON.stringify(userList.concat(user))
        );
      })
      .catch((err) => {
        setUserList([...userList]);
      });
    onReset();
  };

  // 인게임 조회
  const searchInGameState = (e) => {
    e.preventDefault();
    
    setLoading(true);

    if (!userList || userList.length === 0) {
      alert("등록한 유저가 없습니다.");
      return;
    }
    // 게임상태 업데이트
    updateInGame(userList)
  };
  

  // 인게임 조회 주기적인 실행
  const startScanner = (e)=> {
    e.preventDefault()
    // 스캐너 플래그 상태
     isPause = false;
     // 로딩 상태
     setLoading(true);

     setScanning(true);

    // 게임 진행 상태 체크 
    updateInGame(userList)
    // 주기적 실행 함수
    timer = setInterval(()=> {

      function updateList() {
        return JSON.parse(sessionStorage.userList);
      }
      const updateUserList = updateList();

      setLoading(true);
      updateInGame(updateUserList)
    },30000)
  }

  const stopScanner= () => {  
      // 주시적 실행 정지
      clearInterval(timer)
      // 스캐너 플래그 상태 중지
      isPause=true;

      setScanning(false)
  }

// 테스트 리스트 반환
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
      setUserList(tempList);
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
          onInsertUser={insertUser}
          inputValue={userName}
          existValue={status}
          onChangeEvent={onChangeHandle}
        />
      </form>
      <br />
      <UserList users={userList} onRemove={onRemove}  />
      <br />
      <div className="id-list"></div>
      <InGameStateView state={userState} loading={loading} scanning={scanning} />
    </>
  );
}

export default ApiTest;
