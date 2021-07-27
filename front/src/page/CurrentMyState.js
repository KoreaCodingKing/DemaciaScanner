import React,{useEffect, useState, useContext} from "react";
import axios from "axios";
import CurrentMyGameView from './CurrentMyGameView';
import {UserListContext} from '../App';



// function CurrentMyState({users, onAdd}) {
function CurrentMyState() {


  // const [myName, setMyName] = useState();
  const [aaa, setAaa] = useState();
  const [loading, setLoading] = useState(true);

  let {onChangeHandle, addUserList,searchUser, onReset, userName, getUserDataInGame, getUserData } = useContext(UserListContext);

  // 부모에서 받은 리스트값
  // console.log(users)


 
  // 서버로 부터 인게임 상태를 받아와 상태값 변경 함수
  function updateInGame(targetUserList) {
      const inGameData = getUserDataInGame(targetUserList);
      new Promise((resolve) => {
        resolve(inGameData);
      }).then((res) => {
        setAaa(res.data[0]);

        sessionStorage.setItem(
          "participantsData", 
          JSON.stringify(res.data[0].participants)
        )

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

    if(!userName || '') {
      alert("값이 없다");
      onReset();
      return ;
    }

    const trimmedUserName = userName.trim();

    if (!trimmedUserName) {
      alert("값이 없습니다");
      return;
    }

    searchUser(trimmedUserName)
    .then(getUserData => {
      const data =  getUserData;
      // addUserList(data, true, 'userList');
      return data
    })
    .then(resUser=> {
      console.log(resUser)
        setLoading(true);
        
        // 인게임 상태 확인
        // updateInGame의 인자는 [리스트]형태로 받아야함
        updateInGame([resUser])
    })
    .catch((err) => {
      console.log("없는 아이디 입니다")
        onReset();
    });




    // 이전 코드
    // getUserData(trimmedUserName)
    //   .then((res) => {
    //     if (res.data === null) {
    //       return false;
    //     }


    //     const user = {
    //       name: res.data.name,
    //       id: res.data.id,
    //       accountId: res.data.accountId
    //     };
    //     // sessionStorage.setItem(
    //     //   `${res.data.name}`,
    //     //   JSON.stringify(user)
    //     // );
        
    //     return user
    //   })
    //   .then(resUser=> {
    //     setLoading(true);
    //     // 인게임 상태 확인
    //     updateInGame([resUser])


    //   })
    //   .catch((err) => {
    //     // setUserList([...userList]);
    //     console.log("없는 아이디 ㅇ비니다")
    //       onReset();
    //   });
    onReset();
  };

  return (
    <>
    <hr />
      <h1>내 상태입니다</h1>
      <form onSubmit={insertUser}>
        <input onChange={onChangeHandle} value={userName || ''} />
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
