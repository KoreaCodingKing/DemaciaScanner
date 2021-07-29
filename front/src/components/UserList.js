import React, {useContext, useState} from 'react';
import {UserListContext} from "../App"

// function UserTotalView({userTotal}) {
//   console.log(userTotal)
//   return (
//     <div>

//     </div>
//   )
// }

function User({user}) {
  const {onRemove, onTotalData, userTotal} = useContext(UserListContext)
  const [view, setView] = useState(false);
  // console.log('유저 토탈 상태값',userTotal)

  // const rendering = (user) => {
  //   const result = [];

  //   for(let i = 0; i<userTotal.length; i++) {
  //     result.push(<div key={i}>{user.name}{userTotal[i].gameId}</div>)
  //   }
  //   return result ;
  // }
  // console.log(userTotal)

  const test = (user) => {
    
    onTotalData(user).then(res=>console.log(res))
    setView(true)
  }

    return (
        <div>
        <span>({user.name})</span>
        <button onClick={()=> onRemove(user.id)}>제거</button>
        <button onClick={()=> test(user)}>전적 확인하기</button>
        {/* { rendering(user)} */}
        {view ? <span>true</span> : <span>false</span>}
        </div>
    )
}

function UserList({users}) {
  // users 데이터 정보
  // [0 : {accountId, id, name}, 1: {...}, 2: {...}]
    // console.log("유저 정보",users)
    

  return (
    <div>
      {users.map((user, index) => (
        <User user={user} key={index} />
      ))}
    </div>
  );
}

export default UserList;