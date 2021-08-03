import React, { useContext, useState, useEffect } from "react";
import { UserListContext } from "../../App";
import "../../assets/scss/userList.scss";

function UserTotalView({ userTotal, championName, championValue }) {
  // console.log(userTotal);

  const rendering = (user) => {
    const result = [];
    const result2 = [];
    let statsValue = "";

    user.map((item, index1) => {
      const gameUsers = Object.entries(item);
      // console.log(gameUsers[0][1]);

      console.log(`#${index1}번째 게임의 유저목록`);

      gameUsers[0][1].map((user, index2) => {
        console.log(user.summonerName);

        result.push(
          // <ul className="user_state__block">
          <li className={`user_state__item--${user.win}`} key={index1}>
            {index1} - {user.summonerName} - {user.kills} / {user.deaths} /{" "}
            {user.assists} - {user.win}
          </li>
          // </ul>
        );
      });
    });

    // 받은 게임리스트
    for (let gameCount = 0; gameCount < userTotal.length; gameCount++) {
      // const summonerName = userTotal.dataList[userTotal.length].summonerName;
      // team100의 승패
      // const team100 = "";
      // 같이 게임한 플레이어들의 상태
      // console.log(`${gameCount} 번째 게임`);
      // for (
      //   let participantCount = 0;
      //   participantCount < userTotal[gameCount].participants.length;
      //   participantCount++
      // ) {
      //   // 소환사 이름
      //   const participantNameValue =
      //     userTotal[gameCount].participantIdentities[participantCount].player
      //       .summonerName;
      //   let myParticipantId = "";
      //   if (targetUser !== participantNameValue) {
      //     console.log(`${targetUser}와 ${participantNameValue}는 다릅니다.`);
      //   } else {
      //     myParticipantId =
      //       userTotal[gameCount].participantIdentities[participantCount]
      //         .participantId;
      //     console.log(`나의 myParticipantId값은 : ${myParticipantId}입니다.`);
      //     for (
      //       let findTotalValueCount = 0;
      //       findTotalValueCount < userTotal[gameCount].participants.length;
      //       findTotalValueCount++
      //     ) {
      //       if (
      //         myParticipantId ===
      //         userTotal[gameCount].participants[findTotalValueCount]
      //           .participantId
      //       ) {
      //         championName(
      //           userTotal[gameCount].participants[findTotalValueCount]
      //             .championId
      //         );
      //         statsValue =
      //           userTotal[gameCount].participants[findTotalValueCount].stats
      //             .win;
      //         console.log(
      //           `statsValue 값, ${statsValue == false ? "패배" : "승리"}`
      //         );
      //       }
      //     }
      //   }
      //   // 위에서 받은 value로 다시 for문
      // }
      // result.push(
      //   <div key={gameCount}>리스트 뿌려야하다, 데이터는 받아옴</div>
      // );
    }

    // if (user.length == 10) {
    //   console.log("10");
    //   result2.push(result)
    // }

    return result;
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
