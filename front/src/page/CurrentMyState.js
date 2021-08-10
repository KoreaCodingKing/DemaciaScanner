import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import CurrentMyGameView from "./CurrentMyGameView";
import { UserListContext } from "../App";

// function CurrentMyState({users, onAdd}) {
function CurrentMyState() {
  // const [myName, setMyName] = useState();
  const [aaa, setAaa] = useState();
  const [loading, setLoading] = useState(true);

  let {
    onChangeHandle,
    addUserList,
    searchUser,
    onReset,
    userName,
    getUserDataInGame,
    getUserData,
  } = useContext(UserListContext);

  useEffect(() => {
    const sessionStorageValue = sessionStorage.participantsData || null;

    if (sessionStorageValue) {
      const userListInSession = JSON.parse(sessionStorageValue);
      setAaa(userListInSession);
      setLoading(false);
    }
  }, []);

  // 서버로 부터 인게임 상태를 받아와 상태값 변경 함수
  function updateInGame(targetUserList) {
    const inGameData = getUserDataInGame(targetUserList);
    new Promise((resolve) => {
      resolve(inGameData);
    })
      .then((res) => {
        console.log(res.data);
        setAaa(res.data[0]);

        sessionStorage.setItem("participantsData", JSON.stringify(res.data[0]));

        setLoading(false);
      })
      .catch((e) => {
        console.log("에러야!! 에러!!");
        onReset();
        return;
      });
  }

  // 유저 검색 -> function.js의 형태로 불러올 예정
  const findUser = (e) => {
    e.preventDefault();

    if (!userName.current_game_name || "") {
      alert("값이 없다");
      onReset();
      return;
    }

    const trimmedUserName = userName.current_game_name.trim();

    if (!trimmedUserName) {
      alert("값이 없습니다");
      return;
    }

    searchUser(trimmedUserName)
      .then((getUserData) => {
        const data = getUserData;
        // 랭크 및 티어를 가져올 코드를 삽입예정
        // 로그인시)
        // 나의 캐릭터 네임을 등록 해두면, 일정 시간마다 체크함.
        // 게임 중이라면 매칭된 10명을 보여줌.
        // --------------
        // 비로그인시)
        // 나의 이름을 사용자로부터 받음.
        // 위와 같은 프로세스 실행.
        // 새로고침 시 초기화

        return data;
      })
      .then((resUser) => {
        // console.log(resUser)
        setLoading(true);

        // 인게임 상태 확인
        // updateInGame의 인자는 [리스트]형태로 받아야함
        updateInGame([resUser]);
      })
      .catch((err) => {
        console.log("없는 아이디 입니다");
        onReset();
      });

    onReset();
  };

  return (
    <>
      <hr />
      <h1>내 상태입니다</h1>
      <form onSubmit={findUser}>
        <input
          name="current_game_name"
          onChange={onChangeHandle}
          value={userName.current_game_name || ""}
        />
      </form>
      {`${loading}`}
      <br />
      <div>{loading ? "loading..." : <CurrentMyGameView users={aaa} />}</div>
    </>
  );
}

export default CurrentMyState;
