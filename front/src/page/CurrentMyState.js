import React,{useEffect, useState} from "react";
import axios from "axios";
import CurrentMyGameView from './CurrentMyGameView';



// function CurrentMyState({users, onAdd}) {
function CurrentMyState() {


  const [myName, setMyName] = useState();
  const [aaa, setAaa] = useState();
  const [loading, setLoading] = useState(true);

  // 부모에서 받은 리스트값
  // console.log(users)

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

   // 인게임 상태 추출
  const getUserDataInGame = async (users) => {
    return await axios.post("http://localhost:3001/userstatus", {
      users,
    });
  };
  // 서버로 부터 인게임 상태를 받아와 상태값 변경 함수
  function updateInGame(targetUserList) {
      const inGameData = getUserDataInGame(targetUserList);
      new Promise((resolve) => {
        resolve(inGameData);
      }).then((res) => {
        setAaa(res.data[0]);
        setLoading(false)
      })
      .catch((e)=> {
        alert("게임 중이지 않습니다")
        onReset();
        return ;
        
      })
  }


  // 유저 검색 -> function.js의 형태로 불러올 예정
  const insertUser = (e) => {
    e.preventDefault();

    if(!myName || '') {
      alert("값이 없다");
      onReset();
      return ;
    }

    const trimmedUserName = myName.trim();

    if (!trimmedUserName) {
      alert("값이 없습니다");
      return;
    }

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
        sessionStorage.setItem(
          `${res.data.name}`,
          JSON.stringify(user)
        );
        
        return user
      })
      .then(resUser=> {
        // 인게임 상태 확인
        // console.log(resUser)
        setLoading(true);
        updateInGame(resUser)


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
    <hr />
      <h1>내 상태입니다</h1>
      <form onSubmit={insertUser}>
        <input onChange={onChangeHandle} value={myName || ''} />
      </form>
      {`${loading}`}
      <br />
      <div>
      
      {loading ? 'loading...' : <CurrentMyGameView  users={aaa} />}
      </div>
    </>
  );
}

export default CurrentMyState;
