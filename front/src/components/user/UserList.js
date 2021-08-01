import React, { useContext, useState, useEffect } from "react";
import { UserListContext } from "../../App";

function UserTotalView({ view, userTotal, user }) {
  const targetUser = user.name;
  // console.log(user);

  const [aa, setAa] = useState("");

  const rendering = (user) => {
    const result = [];
    let statsValue = "";

    // 받은 게임리스트
    for (let gameCount = 0; gameCount < userTotal.length; gameCount++) {
      // team100의 승패
      // const team100 = "";

      // 같이 게임한 플레이어들의 상태
      console.log(`${gameCount} 번째 게임`);
      for (
        let participantCount = 0;
        participantCount < userTotal[gameCount].participants.length;
        participantCount++
      ) {
        // participantCount번의 플레이어 participantCountId
        const participantIdValue =
          userTotal[gameCount].participantIdentities[participantCount]
            .participantId;
        // 소환사 이름
        const participantNameValue =
          userTotal[gameCount].participantIdentities[participantCount].player
            .summonerName;
        // 승패 상태, true, false
        // console.log(participantNameValue);

        let myParticipantId = "";

        if (targetUser !== participantNameValue) {
          console.log(`${targetUser}와 ${participantNameValue}는 다릅니다.`);
        } else {
          myParticipantId =
            userTotal[gameCount].participantIdentities[participantCount]
              .participantId;

          console.log(`나의 myParticipantId값은 : ${myParticipantId}입니다.`);

          for (
            let findTotalValueCount = 0;
            findTotalValueCount < userTotal[gameCount].participants.length;
            findTotalValueCount++
          ) {
            if (
              myParticipantId ===
              userTotal[gameCount].participants[findTotalValueCount]
                .participantId
            ) {
              statsValue =
                userTotal[gameCount].participants[findTotalValueCount].stats
                  .win;
              // console.log("롸");

              // setAa(
              //   userTotal[gameCount].participants[findTotalValueCount].stats.win
              // );

              console.log(
                `statsValue 값, ${statsValue == false ? "패배" : "승리"}`
              );
            } else {
              // console.log(
              //   `${participantIdValue}와 ${userTotal[gameCount].participants[findTotalValueCount].participantId}가 맞지 않음`
              // );
            }
          }
        }
        // 위에서 받은 value로 다시 for문
      }

      result.push(
        <div key={gameCount}>{statsValue == true ? "승리" : "패배"}</div>
      );
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
        <UserTotalView view={view} userTotal={totalData} user={user} />
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
