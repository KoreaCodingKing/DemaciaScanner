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
import HeaderSearch from "./components/HeaderSearch";

import dotenv from "dotenv";

import "./assets/scss/common.scss";
import SearchTotal from "./components/SearchTotal";
import Signup from "./page/Signup";
import SignupConfirmed from "./page/SignupConfirmed";
import SignupConfirmedEmail from "./page/SignupConfirmedEmail";
import Login from "./page/Login";

export const UserListContext = createContext();

const tempUser = "Demacia 1";

let timer;
let isPause = false;

function App() {
  const [userList, setUserList] = useState([]);
  // const [userName, setUserName] = useState("");
  const [userName, setUserName] = useState({
    current_game_name: "",
    search_name: "",
    user_email: "",
    user_id: "",
    user_password: "",
    user_nickname: "",
  });
  const {
    current_game_name,
    search_name,
    user_email,
    user_id,
    user_password,
    user_nickname,
  } = userName;
  const [userState, setUserState] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [scanning, setScanning] = useState(false);
  // const [modal, setModal] = useState(false);
  const [userTotal, setUserTotal] = useState([]);
  const [championValue, setChampionValue] = useState("");
  const [totalData1, setTotalData1] = useState([]);
  const [totalLoading, setTotalLoding] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const [headerState, setHeaderState] = useState(false);

  useEffect(() => {
    const sessionStorageValue = sessionStorage.userList || null;

    if (sessionStorageValue) {
      const userListInSession = JSON.parse(sessionStorageValue);
      setUserList(userListInSession);
    }

    // header 노출 여부
    if (
      window.location.pathname !== "/signup" &&
      window.location.pathname !== "/login" &&
      window.location.pathname !== "/confirmed_email/:email"
    ) {
      setHeaderState(true);
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
    console.log(value, name);
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
        // console.log(res.data);
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
    console.log("revisionData", addUser);
    if (addUser == null) {
      return false;
    }
    const trimmedUserName = addUser.name.trim();

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

    const user = {
      name: addUser.name || addUser.summonerName,
      id: addUser.id || addUser.summonerId,
      accountId: addUser.accountId,
      puuid: addUser.puuid,
      tier: addUser.tier,
      revisionDate: addUser.revisionDate,
      profileIconId: addUser.profileIconId,
      summonerLevel: addUser.summonerLevel,
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
    setSearchLoading(false);

    return user;
  };

  // get user total data
  const onTotalData = (userData) => {
    const data = userData;
    console.log("받은 데이터", data);

    setTotalLoding(true);

    const resultData = getUserTotalData(data)
      .then((result) => {
        console.log("결과", result.data);
        const matches = result.data;

        setTotalData1(matches);
        setUserInfo(data);
        setTotalLoding(false);
        setSearchLoading(false);

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
  const insertUser = (e, addon) => {
    // testAlign - 나의 게임 서치랑 일반 서치 차이
    let testAlign = false;
    // 메인에 insertUser 메서드는 onSubmit에 사용하기 때문에 e.preventDefault()처리가 필요함
    // 하지만 currentMyGameView페이지에 게임중인 유저를 리스트에 추가 할경우 insertUser 메서드에 파라미터(유저 정보)를 전달하기때문에,
    // e.preventDefault()처리가 불필요.
    // 따라서 그 값을 변경 해 주었음
    // console.log(e)

    if (typeof e !== "string") {
      //메인 리스트 등록
      e.preventDefault();
      e = userName.search_name;
      testAlign = true;
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

    setSearchLoading(true);

    searchUser(trimmedUserName).then((getUserData) => {
      const data = getUserData;
      console.log("넘어온 데이터 ->", data);

      if (testAlign) {
        onTotalData(data);
      } else {
        addUserList(data, true, "userList");
      }

      // 리스트 추가
      // addUserList(data, true, "userList");
    });

    onReset();
  };

  // const Header = () => {
  //   return (

  //  );
  // };

  return (
    <div className="wrapper">
      {headerState ? (
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
            <li className="header__item auth_box">
              <div className="header_item__auth_info">
                <div className="auth_info__thumb">
                  <img src="http://ddragon.leagueoflegends.com/cdn/11.13.1/img/champion/Aatrox.png" />
                </div>
                <div className="auth_info__name">{tempUser}</div>
                <div className="auth_info__login_state">
                  <button onClick={() => alert("로그인 아웃 버튼입니다")}>
                    Logout
                  </button>
                </div>
              </div>
            </li>
          </ul>

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
              searchLoading,
            }}
          >
            <HeaderSearch />
          </UserListContext.Provider>
        </div>
      ) : null}

      <Route exact={true} path="/">
        {/* <Header /> */}
        <Home />
      </Route>
      <Route path="/apiTest">
        {/* <Header /> */}
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
            totalLoading,
            userInfo,
          }}
        >
          <ApiTest />
        </UserListContext.Provider>
      </Route>
      <Route path="/currentMyState">
        {/* <Header /> */}
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
            searchLoading,
          }}
        >
          <CurrentMyState />
        </UserListContext.Provider>
      </Route>
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
          searchLoading,
        }}
      >
        <Route path="/signup" component={Signup} />
      </UserListContext.Provider>

      

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
          searchLoading,
        }}
      >
        <Route path="/signup/confirmed" component={SignupConfirmed} />
      </UserListContext.Provider>

      <Route path="/confirmed_email/:email" component={SignupConfirmedEmail} />

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
          searchLoading,
        }}
      >
        <Route path="/login" component={Login} />
      </UserListContext.Provider>
    </div>
  );
}

export default App;
