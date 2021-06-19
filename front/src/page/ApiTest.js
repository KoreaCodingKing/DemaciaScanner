// 테스트중인 페이지
// CORS policy 오류 ->브라우저에서 보내서 그럼, 서버에서 보내면 됨

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Loading from "../components/Loading";

// import InputItem from "../components/InputItem"

function ApiTest() {
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [load, setLoad] = useState(false);

  const getUserInfo = async () => {
    try {
      // insertUser();
      setLoad(true);
      const response = await axios.get("http://localhost:3001/userinfo");
      Promise.resolve(response).then((getData) => {
        setName(getData.data[0].name);
        setId(getData.data[0].id);
      });
    } catch (e) {
      console.error(e);
    }
    setLoad(false);
  };

  let dummyList = [
    // {
    //   id: "dummy01",
    // },
    // {
    //   id: "dummy02",
    // },
    // {
    //   id: "dummy03",
    // },
  ];

  // 인풋 값 변경 확인
  const onChange = (e) => {
    setText(e.target.value);
    console.log("onchange", text);
  };

  const onReset = () => {
    setText("");
  };

  const insertUser = () => {
    const data = new Object({
      id: text,
    });
    axios
      .post("http://localhost:3001/insertuser", {
        id: data.id,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    inputAreaInfo(data.id);
    onReset();
  };

  const inputAreaInfo = (userId) => {
    console.log(userId);
    return <p>{userId}</p>;
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
      <input
        onChange={onChange}
        value={text}
        placeholder="아이디를 입력해주세요"
      />
      <button onClick={insertUser}>정보 삽입</button>
      <br />
      <div className="id-list">{inputAreaInfo}</div>
      <br />
      아이디 : {name}
      <br />
      id : {id}
    </>
  );
}

export default ApiTest;
