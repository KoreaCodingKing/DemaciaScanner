import React,{useContext} from "react";
import {TodoContext} from './ApiTest'

function About() {
  const {userList} = useContext(TodoContext);
  console.log(userList)
  return (
    <>
      <h1>about</h1>

    </>
  );
}

export default About;
