
// import React from "react";
import React, { useEffect,createContext, Provider } from "react";
import { Link, Route } from "react-router-dom";
import Home from "./page/Home";
import About from "./page/About";
import ApiTest from "./page/ApiTest";
import CurrentMyState from './page/CurrentMyState';

import dotenv from "dotenv";

import "./assets/scss/common.scss";

export const ThemeContext = createContext("light");

function App() {
  return (
    <ThemeContext.Provider value="red">
    <div className="wrapper">
      <div className="header">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/apitest">apiTest</Link>
        <Link to="/currentmystate">나의 게임</Link>
      </div>
      <Route path="/" exact component={Home} />
      <Route path="/about" component={About} />
      <Route path="/apiTest" component={ApiTest} />
      <Route path="/currentMyState" component={CurrentMyState} />
      {/* <h1>test</h1> */}
    </div>
    </ThemeContext.Provider>
  );
}

export default App;
