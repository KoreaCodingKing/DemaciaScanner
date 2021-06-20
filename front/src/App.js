import React, { useEffect } from "react";
import { Link, Route } from "react-router-dom";
import Home from "./page/Home";
import About from "./page/About";
import ApiTest from "./page/ApiTest";
import axios from "axios";

import dotenv from "dotenv";

import "./assets/scss/common.scss";

function App() {
  useEffect(() => {
    console.log("useEffect임");
  });
  return (
    <div className="wrapper">
      <div className="header">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/apitest">apiTest</Link>
      </div>
      <Route path="/" exact component={Home} />
      <Route path="/about" component={About} />
      <Route path="/apiTest" component={ApiTest} />
      {/* <h1>test</h1> */}
    </div>
  );
}

export default App;
