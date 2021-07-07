import React from "react";
import UserListInGame from "../components/UserListInGame";

const InGameStateView = (props) => {
  console.log(props.userState);
  let stateList = props.userValue;
  let userState = props.userState;

  return (
    <>
      <h1>InGameStateView</h1>
      <div className="view__container">
        <UserListInGame users={stateList} gameState={userState} />
      </div>
    </>
  );
};

export default InGameStateView;
