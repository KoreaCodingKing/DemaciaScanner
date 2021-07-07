import React from "react";
import UserListInGame from "../components/UserListInGame";

const InGameStateView = (props) => {
  let stateList = props.userValue;
  let userState = props.state;
  console.log(props.state);

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
