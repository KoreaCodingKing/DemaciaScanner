// import React from "react";
import React, {
  createContext,
  Provider,
  useState,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";
import { Link, Route } from "react-router-dom";
import Home from "./page/Home";
import CurrentMyGame from "./page/CurrentMyGame";
import ApiTest from "./page/ApiTest";
import CurrentMyState from "./page/CurrentMyState";

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
  // const [modal, setModal] = useState(false);
  const [userTotal, setUserTotal] = useState([]);
  const [championValue, setChampionValue] = useState("");

  useEffect(() => {
    const sessionStorageValue = sessionStorage.userList || null;

    if (sessionStorageValue) {
      const userListInSession = JSON.parse(sessionStorageValue);
      setUserList(userListInSession);
    }
  }, []);

  // 세션 스토리지 초기화
  const sessionStorageInit = () => {
    sessionStorage.clear();
  };

  // 인풋 값 변경 확인
  // const onChangeHandle = (e) => {
  //   setUserName(e.target.value);
  // };
  const onChangeHandle = useCallback(
    (e) => {
      // const {name} = e.target.value
      setUserName(e.target.value);
    },
    [userName]
  );

  const onReset = () => {
    setUserName("");
  };

  // 유저 찾기
  const searchUser = (userName) => {
    return getUserData(userName)
      .then((res) => {
        if (res.data === null) {
          alert("오류");
          return;
        }

        const getUser = res.data;

        return getUser;
      })
      .catch(() => {
        setUserList([...userList]);
      });
  };

  // 리스트 추가 함수
  const addUserList = (addUser, saveValue, storageValue) => {
    // if(addUser.accountId === '') {
    //   console.log("accountId 값이 없습니다")
    //   // const result = searchUser(addUser.summonerName);
    //   // console.log(result)
    // }
    if (addUser == null) {
      return false;
    }

    const user = {
      name: addUser.name || addUser.summonerName,
      id: addUser.id || addUser.summonerId,
      accountId: addUser.accountId,
    };

    if (saveValue) {
      setUserList(userList.concat(user));
    }

    if (!storageValue) {
      return false;
    } else if (storageValue === "userList") {
      sessionStorage.setItem("userList", JSON.stringify(userList.concat(user)));
    } else {
      sessionStorage.setItem("userList", JSON.stringify(userList.concat(user)));
      sessionStorage.setItem(`${user.name}`, JSON.stringify(user));
    }

    return user;
  };

  // modal show, hide
  // const modalView = (target) => {
  //   setModal(true)
  // }

  // get user total data
  const onTotalData = (userData) => {
    const data = userData;

    const resultData = getUserTotalData(data)
      .then((result) => {
        // console.log(result.data.matches)

        // setUserTotal(result.data.matches)
        const matches = result.data;
        console.log(matches);

        return matches;
      })
      .catch(() => {
        console.log("데이터를 받지 못했습니다.");
      });
    return resultData;
  };

  // remove User
  const onRemove = (targetId) => {
    setUserList(userList.filter((user) => user.id !== targetId));
    const data = sessionStorage.getItem("userList");
    const dataParse = JSON.parse(data);
    const removeSesstionList = dataParse.filter((user) => user.id !== targetId);
    sessionStorage.setItem("userList", JSON.stringify(removeSesstionList));
  };

  // recive data to server
  const getUserData = async (userName) => {
    return await axios.post("http://localhost:3001/searchuser", {
      name: userName,
    });
  };

  // 유저의 게임 전적 가져오기
  // 보낼 필수 값 : accountId
  // 추가로 보낼 값 : name
  // 받을 값 : gameId = 해당 게임의 승패 여부를 알 수 있음
  // champion, tiemstamp
  const getUserTotalData = async (user) => {
    return await axios.post("http://localhost:3001/usertotal", {
      user,
    });
  };

  // recive ingame data to server
  const getUserDataInGame = async (users) => {
    return await axios.post("http://localhost:3001/userstatus", {
      users,
    });
  };

  const getChampionName = async (championId) => {
    return await axios.post("http://localhost:3001/champion", {
      championId,
    });
  };

  // 서버로 부터 인게임 상태를 받아와 상태값 변경 함수
  function updateInGame(targetUserList) {
    if (!isPause) {
      const inGameData = getUserDataInGame(targetUserList);
      new Promise((resolve) => {
        resolve(inGameData);
      }).then((res) => {
        setUserState(res.data);
        setLoading(false);
      });
    } else {
      console.log("isPause값은 true로 스캔을 정지합니다.!");
    }
  }

  function championName(championId) {
    getChampionName(championId).then((res) => {
      const data = res.data;
      setChampionValue(data);
      // console.log(data);
    });
  }

  // 스캐너 시작
  const startScanner = (e) => {
    e.preventDefault();
    // 스캐너 플래그 상태
    isPause = false;
    // 로딩 상태
    setLoading(true);

    setScanning(true);

    // 게임 진행 상태 체크
    updateInGame(userList);
    // 주기적 실행 함수
    timer = setInterval(() => {
      function updateList(list) {
        const userListData = list;
        return JSON.parse(userListData);
      }
      const updateUserList = updateList(sessionStorage.userList);

      setLoading(true);
      updateInGame(updateUserList);
    }, 20000);
  };

  // 스캐너 중지
  const stopScanner = () => {
    // 주시적 실행 정지
    clearInterval(timer);
    // 스캐너 플래그 상태 중지
    isPause = true;

    setScanning(false);
  };

  // todo User
  const insertUser = (e) => {
    // 메인에 insertUser 메서드는 onSubmit에 사용하기 때문에 e.preventDefault()처리가 필요함
    // 하지만 currentMyGameView페이지에 게임중인 유저를 리스트에 추가 할경우 insertUser 메서드에 파라미터(유저 정보)를 전달하기때문에,
    // e.preventDefault()처리가 불필요.
    // 따라서 그 값을 변경 해 주었음
    // console.log(e)
    if (typeof e !== "string") {
      //메인 리스트 등록
      e.preventDefault();
      e = userName;
    }

    // -----id 적합성 검사
    const trimmedUserName = e.trim();

    if (!trimmedUserName || "") {
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

    searchUser(trimmedUserName).then((getUserData) => {
      const data = getUserData;
      addUserList(data, true, "userList");
    });

    onReset();
  };

  return (
    <div className="wrapper">
      <div className="header">
        <Link to="/">Home</Link>
        <Link to="/currentmygame">CurrentMyGame</Link>
        <Link to="/apitest">apiTest</Link>
        <Link to="/currentmystate">나의 게임</Link>
      </div>
      <Route path="/apiTest">
        <UserListContext.Provider
          value={{
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
            scanning,
            // modalView,
            // modal,
            onTotalData,
            userTotal,
            championName,
            championValue,
          }}
        >
          <ApiTest />
        </UserListContext.Provider>
      </Route>
      <Route path="/currentMyState">
        <UserListContext.Provider
          value={{
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
            userName,
          }}
        >
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
