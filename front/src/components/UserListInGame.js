import React from "react";

function User({ user }) {
  return (
    <div>
      <span>({user.name})</span> - <span>{user.id}</span>
    </div>
  );
}

function UserListInGame({ users }) {
  return (
    <div>
      {users.map((user, index) => (
        <User user={user} key={index} />
      ))}
    </div>
  );
}

export default UserListInGame;
