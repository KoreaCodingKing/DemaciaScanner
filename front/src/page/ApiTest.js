// 테스트중인 페이지
// CORS policy 오류 ->브라우저에서 보내서 그럼, 서버에서 보내면 됨

import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../components/Loading";

function ApiTest() {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoad(true);
        const response = await axios.get("http://localhost:3001/lol3");
        Promise.resolve(response).then((getData) => {
          setName(getData.data[0].name);
          setId(getData.data[0].id);
        });
      } catch (e) {
        console.error(e);
      }
      setLoad(false);
    };
    getData();
  }, []);

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
      아이디 : {name}
      <br />
      id : {id}
    </>
  );
}

export default ApiTest;
