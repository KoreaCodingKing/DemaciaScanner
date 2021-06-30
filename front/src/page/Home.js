import React from "react";
import dotenv from "dotenv";
import axios from "axios";
import {ThemeContext} from '../App';

const Home = () => {
  return (
    <ThemeContext.Consumer>
      {value => <span>테마 색상 : {value}</span>}
    </ThemeContext.Consumer>
  );
};

export default Home;
