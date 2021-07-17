import React from 'react';

function User({user, onRemove}) {
    return (
        <div>
        <span>({user.name})</span>
        <button onClick={()=> onRemove(user.id)}>제거</button>
        </div>
    )
}

function UserList({users, onRemove}) {
    

  return (
    <div>
      {users.map((user, index) => (
        <User user={user} key={index} onRemove={onRemove} />
      ))}
    </div>
  );
}

export default UserList;