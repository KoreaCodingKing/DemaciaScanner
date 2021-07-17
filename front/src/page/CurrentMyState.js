import React,{useEffect, useState} from "react";
import axios from "axios";

function CurrentMyState() {
  const [myName, setMyName] = useState();

  const onChangeHandle = (e) => {
    setMyName(e.target.value)
  }

    const onReset = () => {
    setMyName("");
  };


  // server.js에서 압력받은 id 값 가져오기
  const getUserData = async (userName) => {
    return await axios.post("http://localhost:3001/searchuser", {
      name: userName,
    });
  };


  // 유저 검색 -> function.js의 형태로 불러올 예정
  const insertUser = (e) => {
    e.preventDefault();

    const trimmedUserName = myName.trim();

    if (!trimmedUserName) {
      alert("값이 없습니다");
      return;
    }

    // const doesExistUserName = userList.some(
    //   (id) =>
    //     id.name.replace(/\s/gi, "").toUpperCase() ===
    //     trimmedUserName.replace(/\s/gi, "").toUpperCase()
    // );
    // if (doesExistUserName) {
    //   alert("중복된 소환사 닉네임이 있습니다.");
    //   onReset();
    //   return;
    // }

    // setMyName(e.target.value);

    getUserData(trimmedUserName)
      .then((res) => {
        if (res.data === null) {
          // setStatus(false);
          return false;
        }

        // setStatus(true);

        const user = [{
          name: res.data.name,
          id: res.data.id,
          accountId: res.data.accountId
        }];
        // setUserList(userList.concat(user));

        sessionStorage.setItem(
          `${res.data.name}`,
          JSON.stringify(user)
        );
      })
      .catch((err) => {
        // setUserList([...userList]);
        console.log("없는 아이디 ㅇ비니다")
          onReset();
      });
    onReset();
  };

  return (
    <>
      <h1>내 상태입니다</h1>
      <form onSubmit={insertUser}>
        <input onChange={onChangeHandle} value={myName || ''} />
      </form>
      {myName}
    </>
  );
}

export default CurrentMyState;
