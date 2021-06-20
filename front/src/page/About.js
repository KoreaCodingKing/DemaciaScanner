import React, { useState, useEffect } from "react";
import dotenv from "dotenv";
import axios from "axios";

function About() {
  const [asd, setAsd] = useState("test");
  axios
    .get("https://jsonplaceholder.typicode.com/todos/1")
    .then((res) => res.data)
    .then((res) => {
      const test = () => {
        setAsd(res.userId);
      };
      test();
    });

  return (
    <>
      {/* <h1>about</h1> */}
      {asd}
    </>
  );
}

export default About;
