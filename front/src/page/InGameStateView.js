import React from "react";
import UserListInGame from "../components/UserListInGame";

const InGameStateView = (props) => {
  let stateList = props.userValue;
  let userState = props.userState;
  // console.log("userState =>", userState);
  // console.log("idList=>", stateList.length);

  return (
    <>
      <h1>InGameStateView</h1>
      <div className="view__container">
        <UserListInGame users={stateList} />
      </div>
    </>
  );
};

export default InGameStateView;
