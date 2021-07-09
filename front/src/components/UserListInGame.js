import React from "react";

function User({ user, state }) {
  return (
    <div>
      <span>({user.name})</span> - <span>{state ? "게임중" : "대기중"}</span>
    </div>
  );
}

function UserListInGame({ gameState }) {
  // console.log(gameState);
  return (
    <div>
      {gameState.map((user, index) => (
        <User user={user.name} key={index} state={user.state} />
      ))}
    </div>
  );
}

export default UserListInGame;
