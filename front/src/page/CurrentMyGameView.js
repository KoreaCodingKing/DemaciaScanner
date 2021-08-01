import React, {useState, useEffect, useContext} from 'react';
import {UserListContext} from '../App'


function CurrentMyGameView({users}) {
  const {insertUser, loading, aaa} = useContext(UserListContext);

  const rendering = () => {
    const result = [];

    for(let i = 0; i<users.participants.length; i++) {
      result.push(<div key={i}>{users.participants[i].summonerName}<button onClick={()=> insertUser(users.participants[i].summonerName )}>추가</button></div>)
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