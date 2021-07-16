import React, { useState } from "react";
import UserListInGame from "../components/UserListInGame";
import "../assets/scss/ingamestate.scss"
import Loading from "../components/Loading";
import Scanning from "../components/Scanning";

const InGameStateView = (props) => {
  const users = props.state;
  console.log(props.state)
  // console.log(props.state.currentTime);

  return (
    <>
    <div className="header">
      <h1>InGameStateView</h1>{props.scanning ? <Scanning /> : <span></span> }
    </div>
      
      <div className="view__container">
        {props.loading ? <Loading  /> : <UserListInGame users={users} />}
      </div>
    </>
  );
};

export default InGameStateView;
