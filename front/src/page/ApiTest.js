// 테스트중인 페이지
// CORS policy 오류 ->브라우저에서 보내서 그럼, 서버에서 보내면 됨

import React, { useState, useEffect, useRef} from "react";
import axios from "axios";
import Loading from "../components/Loading";
import UserInsertForm from "../components/UserInsertForm";

import UserList from "../components/UserList";

// import InputItem from "../components/InputItem"

function ApiTest() {
  const [status, setStatus] = useState(false)
  const [inputText, setInputText] = useState("");
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [idList, setIdList]= useState([]);
  const [load, setLoad] = useState(false);

  // const nextId = useRef(1);

  const getUserInfo = async () => {
    try {
      setLoad(true);
      const response = await axios.get("http://localhost:3001/insertuser");
      Promise.resolve(response).then((getData) => {
        console.log(getData.data[0])
        setName(getData.data[0].name);
        setId(getData.data[0].id);
      });
    } catch (e) {
      console.error(e);
    }
    setLoad(false);
  };


  // const handleSubmit = (e) => {
  //   e.preventDefault();

  // };

  // 인풋 값 변경 확인
  const onChangeHandle = (e) => {
    setInputText(e.target.value);
  };

  const onReset = () => {
    setInputText("");
  };

// server.js에서 압력받은 id 값 가져오기
 const getUserData =  async (inputText) => {
    const data = new Object({
      id: inputText,
    });
     return await axios.post("http://localhost:3001/insertuser", {
        id: data.id,
      })
  }

// 중복 아이디 값 확인 함수 return true, false
const duplicateId = (inputText) => {
}

  const insertUser = (e) => {
    e.preventDefault()

    if(!inputText) {
      alert("값이 없습니다")
      return false;

    } else if(inputText) {
      // 중복제거
      for(let i = 0; i<idList.length; i++) {
        if(idList[i].name.toUpperCase() == inputText.toUpperCase()) {
          onReset();
          return alert("중복중복");
          break;
        }
      }
      getUserData(inputText)
        .then((res) => {
          if(res.data ===null) {
            setStatus(false)
            return false;
          }
          setStatus(true);

          const user =  {
              name : res.data.name,
              id : res.data.id
            }

          setIdList(idList.concat(user))

        })
        .catch((err) => {
          setIdList([
            ...idList
          ]);
        });
      onReset();
    };
  };
  

  if (load)
    return (
      <>
        {" "}
        로딩중...
        <Loading />
      </>
    );

  return (
    <>
      <hr />
      <button onClick={getUserInfo}>정보 갱신</button>
      <br />
      <form className="insert_form" onSubmit={insertUser}>
        <UserInsertForm onInsertUser={insertUser} userValue={inputText} existValue={status} onChangeEvent={onChangeHandle} />
      </form>
      <br />
      <UserList users={idList} />
      <br />
      <div className="id-list"></div>
      <br />
      아이디 : {name}
      <br />
      id : {id}
    </>
  );
}

export default ApiTest;
