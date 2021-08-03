import React, { useContext, useState, useEffect } from "react";
import { UserListContext } from "../../App";
import "../../assets/scss/userList.scss";

function UserTotalView({ userTotal, championName, championValue }) {
  const rendering = (user) => {
    const result3 = [];
    console.log(user);

    // let statsValue = "";

    const gameNumber = user.map((item, index1) => {
      const result2 = [];
      const result = [];
      const gameUsers = Object.entries(item);

      const users = gameUsers[0][1].map((user, index2) => {
        console.log(index1, index2);

        result.push(
          <li
            className={`user_state__item user_state__item--${user.win}`}
            key={`${index1}${index2}`}
          >
            {index1} - {user.summonerName} - {user.kills} / {user.deaths} /{" "}
            {user.assists} - {user.win} -{" "}
            {user.gameMode !== "소환사의 협곡"
              ? user.gameMode
              : `${user.gameMode} - ${user.gameType}`}
          </li>
        );

        if (index2 == 9) {
          result2.push(result);
          // console.log(`${result2}`);
        } else {
          // console.log(result);
        }
      });

      return <ul className="user_state__block">{result2}</ul>;
    });
    return gameNumber;
  };

  return <div>{rendering(userTotal)}</div>;
}

function User({ user }) {
  const { onRemove, onTotalData, championName } = useContext(UserListContext);
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
        <UserTotalView
          view={view}
          userTotal={totalData}
          championName={championName}
        />
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
