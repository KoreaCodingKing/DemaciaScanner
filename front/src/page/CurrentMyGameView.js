import React, {useState, useEffect, useContext} from 'react';
import {UserListContext} from '../App'


function User({user}) {
  
    console.log(user)
    return (
        <div>
        {user.name}
        </div>
    )
}


function CurrentMyGameView({users}) {
  const {addUserList} = useContext(UserListContext);
    
  return (
    <div>
        <h1>게임중입니다</h1>
        <hr />
        <div>{users.participants[0].summonerName}<button onClick={()=> addUserList(users.participants[0], true, "userList" )}>추가</button></div>
        <div>{users.participants[1].summonerName}<button onClick={()=> addUserList(users.participants[1], true, "userList" )}>추가</button></div>
        <div>{users.participants[2].summonerName}<button onClick={()=> addUserList(users.participants[2], true, "userList" )}> 추가</button></div>
        <div>{users.participants[3].summonerName}<button onClick={()=> addUserList(users.participants[3], true, "userList" )}>추가</button></div>
        <div>{users.participants[4].summonerName}<button onClick={()=> addUserList(users.participants[4], true, "userList" )}>추가</button></div>
        <div>{users.participants[5].summonerName}<button onClick={()=> addUserList(users.participants[5], true, "userList" )}>추가</button></div>
        <div>{users.participants[6].summonerName}<button onClick={()=> addUserList(users.participants[6], true, "userList" )}>추가</button></div>
        <div>{users.participants[7].summonerName}<button onClick={()=> addUserList(users.participants[7], true, "userList" )}>추가</button></div>
        <div>{users.participants[8].summonerName}<button onClick={()=> addUserList(users.participants[8], true, "userList" )}>추가</button></div>
        <div>{users.participants[9].summonerName}<button onClick={()=> addUserList(users.participants[9], true, "userList" )}>추가</button></div>
    </div>
  )

}

export default CurrentMyGameView