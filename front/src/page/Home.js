import React from "react";
import dotenv from "dotenv";
import axios from "axios";

const Home = () => {
  const state = {
    region: "https://kr.api.riotgames.com",
    key: process.env.REACT_APP_TEST_API_KEY,
    summonerName: "kovolt",
  };

  return (
    <>
      <h1>Home</h1>
    </>
  );
};

export default Home;
