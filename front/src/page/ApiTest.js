// 테스트중인 페이지
// CORS policy 오류 ->브라우저에서 보내서 그럼, 서버에서 보내면 됨

import React, { useState, useEffect } from "react";
import dotenv from "dotenv";
import axios from "axios";

function ApiTest() {
  useEffect(() => {
    console.log("useEffect임");
    axios
      .get("http://localhost:3001/lol")
      .then((res) => console.log(res.data.name));
  });

  return <>{/* <h1>about</h1> */}</>;
}

export default ApiTest;
