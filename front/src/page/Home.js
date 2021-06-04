import React from "react";
import dotenv from "dotenv";
import axios from "axios";

const Home = () => {
  const state = {
    region: "https://kr.api.riotgames.com",
    key: process.env.REACT_APP_TEST_API_KEY,
    summonerName: "kovolt",
  };

  const url = `${state.region}/lol/summoner/v4/summoners/by-name/${state.summonerName}?api_key=${state.key}`;

  let result = url;
  console.log(result);

  fetch(url).then((res) => console.log("rest", res));

  return (
    <>
      <h1>Home</h1>
    </>
  );
};

export default Home;
