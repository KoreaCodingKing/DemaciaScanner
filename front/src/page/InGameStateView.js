import React, { useState, useContext, useEffect } from "react";
import UserListInGame from "../components/UserListInGame";
import "../assets/scss/ingamestate.scss";
import Loading from "../components/Loading";
import Scanning from "../components/Scanning";
import { UserListContext } from "../App";

const InGameStateView = (props) => {
  let { scanning, userList, totalData1 } = useContext(UserListContext);

  const [viewState, setViewState] = useState("card");

  const users = props.state;
  // console.log("유저 리스트 데이터", users);

  // useEffect(() => {
  //   return () => {
  //     qqq = "";
  //   };
  // }, []);

  const [doing, setDoing] = useState("");
  let count = 0;

  users.map((user, index) => {
    if (user.state) {
      count += 1;
    }
    console.log(`index-> ${index} / users.length-> ${users.length - 1} `);
    if (index == users.length + 1) {
      return count;
    }
  });
  // console.log(count);

  return (
    <>
      <div className="ingame_view__header">
        <div className="ingame_view__wrap" style={{ display: "flex" }}>
          <div className="ingame_view__list_info">
            <span>리스트 총 갯수 - {userList.length}/20 </span>
            <span>
              게임중 {count}/{userList.length}
            </span>
          </div>
          <div
            className={`view_state view_state--${viewState}`}
            style={{ marginLeft: "100px" }}
          >
            <button
              type="button"
              onClick={() => setViewState("card")}
              className="view_state__btn card"
            >
              card
            </button>
            <button
              type="button"
              onClick={() => setViewState("list")}
              className="view_state__btn list"
            >
              list
            </button>
          </div>
        </div>
        {scanning ? <Scanning /> : <span></span>}
      </div>

      <div className="view__container">
        <UserListInGame
          viewState={viewState}
          loading={props.loading}
          users={users}
          userList={userList}
          totalData={totalData1}
        />
      </div>
    </>
  );
};

export default InGameStateView;
