// 테스트중인 페이지
// CORS policy 오류 ->브라우저에서 보내서 그럼, 서버에서 보내면 됨

import React, { useState, useEffect } from "react";
import axios from "axios";

function ApiTest() {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoad(true);
        const response = await axios.get("http://localhost:3001/lol");
        setName(response.data.name);
        setId(response.data.id);
      } catch (e) {
        console.log(e);
      }
      setLoad(false);
    };
    getData();
  }, []);

  if (load) return <> 로딩중...</>;

  return (
    <>
      소환사 아이디 : {name}
      <br />
      소환사 아이디 값 : {id}
    </>
  );
}

export default ApiTest;
