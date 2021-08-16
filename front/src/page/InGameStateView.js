import React, { useState, useContext } from "react";
import UserListInGame from "../components/UserListInGame";
import "../assets/scss/ingamestate.scss";
import Loading from "../components/Loading";
import Scanning from "../components/Scanning";
import { UserListContext } from "../App";

const InGameStateView = (props) => {
  let { scanning, userList, totalData1 } = useContext(UserListContext);

  const users = props.state;
  // console.log(userList);

  return (
    <>
      <div className="header">
        <h1>InGameStateView</h1>
        {scanning ? <Scanning /> : <span></span>}
      </div>

      <div className="view__container">
        {props.loading ? (
          <Loading userList={userList} />
        ) : (
          <UserListInGame
            users={users}
            userList={userList}
            totalData={totalData1}
          />
        )}
      </div>
    </>
  );
};

export default InGameStateView;
