import React from "react";
import { Link, Route } from "react-router-dom";
import Home from "./page/Home";
import About from "./page/About";

import dotenv from "dotenv";

import "./assets/scss/common.scss";

function App() {
  return (
    <div className="wrapper">
      <div className="header">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </div>
      <Route path="/" exact component={Home} />
      <Route path="/about" component={About} />
      <h1>test</h1>
    </div>
  );
}

export default App;
