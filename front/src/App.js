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
import Header from "./components/Header";

import dotenv from "dotenv";

import "./assets/scss/common.scss";
import SearchTotal from "./components/SearchTotal";

export const UserListContext = createContext();

let timer;
let isPause = false;

function App() {
  const [userList, setUserList] = useState([]);
  // const [userName, setUserName] = useState("");
  const [userName, setUserName] = useState({
    current_game_name: "",
    search_name: "",
  });
  const { current_game_name, search_name } = userName;
  const [userState, setUserState] = useState([]);
  const [loading, setLoading] = useState(false);
  const [scanning, setScanning] = useState(false);
  // const [modal, setModal] = useState(false);
  const [userTotal, setUserTotal] = useState([]);
  const [championValue, setChampionValue] = useState("");
  const [totalData1, setTotalData1] = useState([]);

  useEffect(() => {
    const sessionStorageValue = sessionStorage.userList || null;

    if (sessionStorageValue) {
      const userListInSession = JSON.parse(sessionStorageValue);
      setUserList(userListInSession);
    }

    if (userList == "") {
      return;
    } else {
      console.log("스캔할 수 있음");
    }
  }, []);

  // 세션 스토리지 초기화
  const sessionStorageInit = () => {
    sessionStorage.clear();
  };

  const onChangeHandle = (e) => {
    const { value, name } = e.target;
    // setUserName(e.target.value);
    setUserName({
      ...userName,
      [name]: value,
    });
  };

  const onReset = () => {
    // setUserName("");
    setUserName({
      current_game_name: "",
      search_name: "",
    });
  };

  // 유저 찾기
  const searchUser = (userName) => {
    return getUserData(userName)
      .then((res) => {
        if (res.data === null) {
          alert("오류");
          return;
        }
        let getUser = "";

        if (res.data[0] || res.data[1]) {
          getUser = res.data[0] ? res.data[0] : res.data[1];
        } else {
          getUser = res.data;
        }

        // const getUser = res.data[0] ? res.data[0] : res.data[1];
        // console.log("데이터는 있지?? -- ", res.data)
        // console.log(getUser);

        return getUser;
      })
      .catch(() => {
        setUserList([...userList]);
      });
  };

  // 리스트 추가 함수
  const addUserList = (addUser, saveValue, storageValue) => {
    if (addUser == null) {
      return false;
    }

    const user = {
      name: addUser.name || addUser.summonerName,
      id: addUser.id || addUser.summonerId,
      accountId: addUser.accountId,
      tier: addUser.tier,
    };

    const confirm = (addUser, onConfirm, onCancel) => {
      if (!onConfirm || typeof onConfirm !== "function") {
        return;
      }
      if (onCancel && typeof onCancel !== "function") {
        return;
      }

      const confirmAction = () => {
        if (window.confirm(addUser)) {
          onConfirm();
        } else {
          onCancel();
        }
      };

      return confirmAction;
    };

    const addConfirm = () => {
      if (saveValue) {
        setUserList(userList.concat(user));
      }

      if (!storageValue) {
        return false;
      } else if (storageValue === "userList") {
        sessionStorage.setItem(
          "userList",
          JSON.stringify(userList.concat(user))
        );
      }
    };
    const cancelConfirm = () => {
      return false;
    };

    const confirmAdd = confirm(
      `${addUser.name} - (${addUser.tier.solo.tier} - ${addUser.tier.solo.rank}) 소환사를 추가하겠습니까?`,
      addConfirm,
      cancelConfirm
    );

    confirmAdd();

    // if (saveValue) {
    //   setUserList(userList.concat(user));
    // }

    // if (!storageValue) {
    //   return false;
    // } else if (storageValue === "userList") {
    //   sessionStorage.setItem("userList", JSON.stringify(userList.concat(user)));
    // } else {
    //   // sessionStorage.setItem("userList", JSON.stringify(userList.concat(user)));
    //   // sessionStorage.setItem(`${user.name}`, JSON.stringify(user));
    // }

    return user;
  };

  // get user total data
  const onTotalData = (userData) => {
    const data = userData;

    const resultData = getUserTotalData(data)
      .then((result) => {
        console.log(result);
        const matches = result.data;

        setTotalData1(matches);

        return matches;
      })
      .catch(() => {
        console.log("데이터를 받지 못했습니다.");
      });
    return resultData;
  };

  // // 티어를 알아낼 코드
  // const onTotalData = (userData) => {
  //   const data = userData;
  //   console.log(data);

  //   const resultData = getUserTotalData(data)
  //     .then((result) => {
  //       const matches = result.data;
  //       console.log(matches[0].dataList);
  // // 한개의 데이터를 사용해서 데이터를 가져옴, map한번더 필요함
  //       matches[0].dataList.map((item, index) => {
  //         const asd = searchUser(item.summonerName);

  //       });

  //       // searchUser();

  //       return matches;
  //     })
  //     .catch(() => {
  //       console.log("데이터를 받지 못했습니다.");
  //     });
  //   return resultData;
  // };

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
    }, 60000);
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
      e = userName.search_name;
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
        <ul className="header__list">
          <li className="header__item">
            <Link className="header__link" to="/">
              Home
            </Link>
          </li>
          {/* <li className="header__item">
            <Link className="header__link" to="/searchtotal">
              전적검색하기
            </Link>
          </li> */}
          <li className="header__item">
            <Link className="header__link" to="/apitest">
              apiTest
            </Link>
          </li>
          <li className="header__item">
            <Link className="header__link" to="/currentmystate">
              나의 게임
            </Link>
          </li>
        </ul>

        {/* 서치바 및 버튼 */}
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
          <Header />
        </UserListContext.Provider>
      </div>
      <Route exact={true} path="/">
        <Home />
      </Route>
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
            totalData1,
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
      {/* <Route path="/searchtotal">
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
          <SearchTotal />
        </UserListContext.Provider>
      </Route> */}

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
