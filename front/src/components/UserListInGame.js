import React from "react";

function User({ user, gameState }) {
  return (
    <div>
      <span>({user.name})</span> - <span>{gameState}</span>
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
