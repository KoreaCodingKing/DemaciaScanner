import React, { useState } from "react";
import UserListInGame from "../components/UserListInGame";
import Loading from "../components/Loading";

const InGameStateView = (props) => {
  const users = props.state;
  // console.log(props.state.currentTime);

  return (
    <>
      <h1>InGameStateView</h1>
      <div className="view__container">
        {props.loading ? <Loading /> : <UserListInGame users={users} />}
      </div>
    </>
  );
};

export default InGameStateView;
