import React, { useState, useContext } from "react";
import UserListInGame from "../components/UserListInGame";
import "../assets/scss/ingamestate.scss"
import Loading from "../components/Loading";
import Scanning from "../components/Scanning";
import {UserListContext} from "../App";

const InGameStateView = (props) => {

  let {scanning} = useContext(UserListContext);

  const users = props.state;
  console.log('스캐닝 값 -> ', scanning)

  return (
    <>
    <div className="header">
      <h1>InGameStateView</h1>{scanning ? <Scanning /> : <span></span> }
    </div>
      
      <div className="view__container">
        {props.loading ? <Loading  /> : <UserListInGame users={users} />}
      </div>
    </>
  );
};

export default InGameStateView;
