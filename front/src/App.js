
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

function App() {
  const [userList, setUserList] = useState([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    
    const sessionStorageValue = sessionStorage.userList || null;

    if (sessionStorageValue) {
      const userListInSession = JSON.parse(sessionStorageValue);
      setUserList(userListInSession)
    }
  }, []);

  // 인풋 값 변경 확인
  const onChangeHandle = (e) => {
    setUserName(e.target.value);
  };
  const onReset = () => {
    setUserName("");
  };

  // 리스트 추가 함수
  const onAdd = (target) => {

    const trimmedUserName = target.summonerName.trim();
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

    const user = {
          name: target.summonerName,
          id: target.summonerId,
          // accountId: target.accountId
        };
        setUserList(userList.concat(user));

        sessionStorage.setItem(
          "userList",
          JSON.stringify(userList.concat(user))
        );
  }

  const getUserData = async (userName) => {
    return await axios.post("http://localhost:3001/searchuser", {
      name: userName,
    });
  };

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
          // setStatus(false);
          return false;
        }

        // setStatus(true);

        const user = {
          name: res.data.name,
          id: res.data.id,
          accountId: res.data.accountId
        };
        setUserList(userList.concat(user));
        console.log("userList 추가된 값", userList)

        sessionStorage.setItem(
          "userList",
          JSON.stringify(userList.concat(user))
        );

      })
      .catch((err) => {
        setUserList([...userList])
        // console.log(err)
      });
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
        <UserListContext.Provider value={{userList,onAdd, onChangeHandle, insertUser, userName}}>
          <ApiTest />
        </UserListContext.Provider>
      </Route>
      <Route path="/currentMyState">
        <UserListContext.Provider value={{userList,onAdd, onChangeHandle, insertUser, userName}}>
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
