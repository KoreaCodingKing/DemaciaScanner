import React from "react";
import UserListInGame from "../components/UserListInGame";

const InGameStateView = (props) => {
  const users = props.state;
  console.log(props.state);

  return (
    <>
      <h1>InGameStateView</h1>
      <div className="view__container">
        <UserListInGame users={users} />
      </div>
    </>
  );
};

export default InGameStateView;
