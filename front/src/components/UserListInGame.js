import React from "react";

function User({ user, state }) {
  return (
    <div>
      <span>({user.name})</span> - <span>{state ? "게임중" : "대기중"}</span>
    </div>
  );
}

function UserListInGame({ users, gameState }) {
  return (
    <div>
      {users.map((user, index) => (
        <User user={user} key={index} state={gameState} />
      ))}
    </div>
  );
}

export default UserListInGame;
