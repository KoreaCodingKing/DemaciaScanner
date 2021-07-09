import React from "react";
import "../assets/scss/ingamestate.scss";

function User({ user, state }) {
  return (
    <div>
      <span>({user})</span> -
      <span className={state ? "state--true" : "state--false"}>
        {state ? "게임중" : "대기중"}
      </span>
    </div>
  );
}

function UserListInGame({ users }) {
  // console.log();
  return (
    <div>
      {users.map((user, index) => (
        // console.log(user)
        <User user={user.name} key={index} state={user.state} />
      ))}
    </div>
  );
}

export default UserListInGame;
