import React from "react";
import UserListInGame from "../components/UserListInGame";

const InGameStateView = (props) => {
  // let stateList = props.userValue;
  let userState = props.state;
  // let userName = props.state.name;
  console.log(userState);

  return (
    <>
      <h1>InGameStateView</h1>
      <div className="view__container">
        <UserListInGame gameState={userState} />
      </div>
    </>
  );
};

export default InGameStateView;
