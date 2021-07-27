
// import React from "react";
import React, {createContext, Provider, useState, useEffect } from "react";
import axios from "axios";
import { Link, Route } from "react-router-dom";
import Home from "./page/Home";
import About from "./page/About";
import ApiTest from "./page/ApiTest";
import CurrentMyState from './page/CurrentMyState';

import dotenv from "dotenv";

import "./assets/scss/common.scss";

export const UserListContext = createContext();

let timer;
let isPause = false;


function App() {
  const [userList, setUserList] = useState([]);
  const [userName, setUserName] = useState("");
  const [userState, setUserState] = useState([]);
  const [loading, setLoading] = useState(false);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    
    const sessionStorageValue = sessionStorage.userList || null;

    if (sessionStorageValue) {
      const userListInSession = JSON.parse(sessionStorageValue);
      setUserList(userListInSession)
    }
  }, []);

  // 세션 스토리지 초기화
   const sessionStorageInit = () => {
    sessionStorage.clear();
  };

  // 인풋 값 변경 확인
  const onChangeHandle = (e) => {
    setUserName(e.target.value);
  };
  const onReset = () => {
    setUserName("");
  };

  const idValidate = (name) => {
    console.log(name)


    // function validate(name) {
    //   const trimmedUserName = nameType.trim();

    //   if (!trimmedUserName) {
    //     alert("값이 없습니다");
    //     return false;
    //   }

    //   const doesExistUserName = userList.some(
    //     (id) =>
    //       id.name.replace(/\s/gi, "").toUpperCase() ===
    //       trimmedUserName.replace(/\s/gi, "").toUpperCase()
    //   );

    //   if (doesExistUserName) {
    //     alert("중복된 소환사 닉네임이 있습니다.");
    //     onReset();
    //     return false;
    //   }
    // }
  }

  // 유저 찾기 
  const searchUser = (userName) => {
    return getUserData(userName)
            .then(res=> {
              if (res.data === null) {
                  return false;
                }

                const getUser = res.data;

                return getUser;
            })
            .catch(()=> {
              setUserList([...userList])
            })

  }


  // 리스트 추가 함수
  const addUserList = (addUser, saveValue, storageValue) => {

    const user = {
          name: addUser.name || addUser.summonerName,
          id: addUser.id || addUser.summonerId,
          // accountId: addUser.accountId
        };

    if(saveValue) {
      setUserList(userList.concat(user));
    }

    if(!storageValue) {
      return false;
    }
    else if(storageValue ==='userList') {
        sessionStorage.setItem(
          "userList",
          JSON.stringify(userList.concat(user))
        );
    }else {
      sessionStorage.setItem(
          "userList",
          JSON.stringify(userList.concat(user))
        );
      sessionStorage.setItem(
          `${user.name}`,
          JSON.stringify(user)
        );
    }

    return user
  }

  // remove User
  const onRemove = (targetId) => {
    
    setUserList(userList.filter(user=> user.id !== targetId))
    const data = sessionStorage.getItem('userList')
    const dataParse = JSON.parse(data);
    const removeSesstionList = dataParse.filter(user=> user.id !== targetId);
    sessionStorage.setItem('userList', JSON.stringify(removeSesstionList))

  }

  // recive data to server
  const getUserData = async (userName) => {
    return await axios.post("http://localhost:3001/searchuser", {
      name: userName,
    });
  };

  // recive ingame data to server
  const getUserDataInGame = async (users) => {
    return await axios.post("http://localhost:3001/userstatus", {
      users,
    });
  };

  // 서버로 부터 인게임 상태를 받아와 상태값 변경 함수
  function updateInGame(targetUserList) {
    if(!isPause) {
      const inGameData = getUserDataInGame(targetUserList);
      new Promise((resolve) => {
        resolve(inGameData);
      }).then((res) => {
        setUserState(res.data);
        setLoading(false);
      });
    }else {
      console.log("isPause값은 true로 스캔을 정지합니다.!")
    }
  }

  // 스캐너 시작
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

      function updateList(list) {
        const userListData = list;
        return JSON.parse(userListData);
      }
      const updateUserList = updateList(sessionStorage.userList);

      setLoading(true);
      updateInGame(updateUserList)
    },50000)
  }

  // 스캐너 중지
  const stopScanner= () => {  
      // 주시적 실행 정지
      clearInterval(timer)
      // 스캐너 플래그 상태 중지
      isPause=true;

      setScanning(false)
  }

  // todo User
  const insertUser = (e) => {
    e.preventDefault();

    // -----id 적합성 검사
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
    // -----id 적합성 검사


    searchUser(trimmedUserName)
    .then(getUserData => {
      const data =  getUserData;
      addUserList(data, true, 'userList');
    })

    onReset();
  };
  

  return (
    <div className="wrapper">
      <div className="header">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/apitest">apiTest</Link>
        <Link to="/currentmystate">나의 게임</Link>
      </div>
      <Route path="/apiTest">
        <UserListContext.Provider value={{
          userList,
          addUserList,
          onRemove,
          sessionStorageInit,
          onChangeHandle,
          insertUser,
          getUserDataInGame,
          userName,
          isPause,
          timer,
          loading,
          userState,
          startScanner,
          stopScanner,
          scanning
          }}>
          <ApiTest />
        </UserListContext.Provider>
      </Route>
      <Route path="/currentMyState">
        <UserListContext.Provider value={{
          userList,
          searchUser,
          addUserList,
          onRemove,
          onReset,
          sessionStorageInit,
          onChangeHandle,
          insertUser,
          getUserDataInGame,
          updateInGame,
          getUserData,
          userName
          }}>
          <CurrentMyState />
        </UserListContext.Provider>
      </Route>
      {/* <UserListContext.Provider value={{ userList}}>
        <Route path="/" exact component={Home} />
        <Route path="/about" component={About} />
        <Route path="/apiTest" component={ApiTest}  />
        <Route path="/currentMyState" component={CurrentMyState} />
      </UserListContext.Provider> */}
    </div>
  );
}

export default App;
