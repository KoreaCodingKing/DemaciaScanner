import React, {useContext} from 'react';
import {UserListContext} from "../App"

function User({user}) {
  const {onRemove} = useContext(UserListContext)
    return (
        <div>
        <span>({user.name})</span>
        <button onClick={()=> onRemove(user.id)}>제거</button>
        </div>
    )
}

function UserList({users}) {
    

  return (
    <div>
      {users.map((user, index) => (
        <User user={user} key={index} />
      ))}
    </div>
  );
}

export default UserList;