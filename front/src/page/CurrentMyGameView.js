import React, {useState, useEffect, useContext} from 'react';
import {UserListContext} from '../App'


// function User({user}) {
//     console.log('user컴포넌트 : ', user)
//     return (
//         <div>
//           hi
//         </div>
//     )
// }

function Test(props) {
    return (
      'asd'
    )
  
}


function CurrentMyGameView({users}) {
  const {addUserList, loading, aaa} = useContext(UserListContext);

  const rendering = () => {
    const result = [];

    for(let i = 0; i<users.participants.length; i++) {
      result.push(<div key={i}>{users.participants[i].summonerName}<button onClick={()=> addUserList(users.participants[i], true, "userList" )}>추가</button></div>)
    }
    return result;
  }

  return (
    <div>
        {rendering()}
    </div>
  )

}

export default CurrentMyGameView