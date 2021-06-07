// import dotenv from "dotenv";
const axios = require("axios");

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 3001;

const cors = require("cors");

function lolApi() {
  axios
    .get(
      "https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/kovolt?api_key=RGAPI-95c1f6e8-c4f6-4c16-9acb-8940f7060b02"
    )
    .then((res) => res.data)
    .then((post) => {
      lolName = post.name;
      lolId = post.id;
    });
}
lolApi();

app.use(cors());

app.use(bodyParser.json());
app.use("/api", (req, res) => res.json({ username: "bryan" }));
app.use("/lol", (req, res) => res.json({ name: lolName, id: lolId }));
// app.use(
//   "https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/kovolt?api_key=RGAPI-95c1f6e8-c4f6-4c16-9acb-8940f7060b02",
//   (res) => res.json({ id: res.id })
// );

app.listen(port, () => {
  console.log(`express is running on ${port}`);
});
