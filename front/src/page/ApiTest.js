// 테스트중인 페이지
// CORS policy 오류 ->브라우저에서 보내서 그럼, 서버에서 보내면 됨

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Loading from "../components/Loading";

function ApiTest() {
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
    {
      index: 0,
      id: "dummy01",
    },
    {
      index: 1,
      id: "dummy02",
    },
    {
      index: 2,
      id: "dummy03",
    },
  ];

  const insertUser = () => {
    dummyList.map((dummyItem, index) => {
      console.log(dummyItem.id);
      axios
        .post("http://localhost:3001/insertuser", {
          index: dummyItem.index,
          id: dummyItem.id,
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    });
    // const request = axios.post("http://localhost:3001/insertuser", [
    //   {
    //     index :
    //   }
    // ]);
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
      <input placeholder="아이디를 입력해주세요" />
      <button onClick={insertUser}>정보 삽입</button>
      <br />
      아이디 : {name}
      <br />
      id : {id}
    </>
  );
}

export default ApiTest;
