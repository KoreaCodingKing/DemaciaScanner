import React, { useContext, useState, useEffect } from "react";
import { UserListContext } from "../../App";

function UserTotalView({ view, userTotal }) {
  const rendering = (user) => {
    const result = [];

    console.log("테스트 ", user);

    // for(let i = 0; i<userTotal.length; i++) {
    //   result.push(<div key={i}>{userTotal[i].gameCreation} - {userTotal[i].participants[i].stats.win ? "WIN" : "LOSE"}</div>)

    // }
    for (let gameCount = 0; gameCount < userTotal.length; gameCount++) {
      // team100의 승패
      const team100 = userTotal[gameCount].team[0].win;
      const team200 = userTotal[gameCount].team[1].win;

      // const myTeamNumber =

      result.push(<div key={gameCount}>{team100 ? "WIN" : "LOSE"}</div>);
    }

    return result;
  };

  return (
    <div>
      {/* {
      userTotal[0].participants[0].stats.win ? "win" : "lose"
    } */}
      {rendering(userTotal)}
      {/* asd */}
    </div>
  );
}

function User({ user }) {
  const { onRemove, onTotalData } = useContext(UserListContext);
  const [view, setView] = useState(false);

  const [totalData, setTotalData] = useState([]);

  const test = (user) => {
    onTotalData(user).then((res) => {
      setTotalData(res);
      setView(true);
    });
    // view 주석 해제하면 보임
    // setTimeout(()=> {
    // setView(true)
    // },3000)
  };

  return (
    <div>
      <span>({user.name})</span>
      <button onClick={() => onRemove(user.id)}>제거</button>
      <button onClick={() => test(user)}>전적 확인하기</button>
      {/* { rendering(user)} */}
      {/* {
          userTotal.map((item, index)=> {
            (x=> {
              setTimeout(()=> {
                <UserTotalView  view={view} userTotal={totalData} />
              }, 100*x)
            })(index)
          })
        } */}
      {view ? (
        <UserTotalView view={view} userTotal={totalData} />
      ) : (
        <span>false</span>
      )}
    </div>
  );
}

function UserList({ users }) {
  // users 데이터 정보
  // [0 : {accountId, id, name}, 1: {...}, 2: {...}]
  // console.log("유저 정보",users)

  useEffect(() => {
    console.log("랜더");
  });

  return (
    <div>
      {users.map((user, index) => (
        <User user={user} key={index} />
      ))}
    </div>
  );
}

export default UserList;
