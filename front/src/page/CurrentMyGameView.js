import React, {useState, useEffect} from 'react';


// function User({ username1 }) {
// //   const [show, setShow] = useState(false);
//   return (
//       <div>{users.participants[0].summonerName}</div>
//   );
// }

function CurrentMyGameView({users, onAdd}) {
    console.log(users)

  return (
    <div>
    <h1>게임중입니다</h1>
    <hr />
    <div>{users.participants[0].summonerName}<button onClick={()=> onAdd(users.participants[0])}>추가</button></div>
    <div>{users.participants[1].summonerName}<button onClick={()=> onAdd(users.participants[1])}>추가</button></div>
    <div>{users.participants[2].summonerName}<button onClick={()=> onAdd(users.participants[2])}> 추가</button></div>
    <div>{users.participants[3].summonerName}<button onClick={()=> onAdd(users.participants[3])}>추가</button></div>
    <div>{users.participants[4].summonerName}<button onClick={()=> onAdd(users.participants[4])}>추가</button></div>
    <div>{users.participants[5].summonerName}<button onClick={()=> onAdd(users.participants[5])}>추가</button></div>
    <div>{users.participants[6].summonerName}<button onClick={()=> onAdd(users.participants[6])}>추가</button></div>
    <div>{users.participants[7].summonerName}<button onClick={()=> onAdd(users.participants[7])}>추가</button></div>
    <div>{users.participants[8].summonerName}<button onClick={()=> onAdd(users.participants[8])}>추가</button></div>
    <div>{users.participants[9].summonerName}<button onClick={()=> onAdd(users.participants[9])}>추가</button></div>
    </div>
  )

}

export default CurrentMyGameView