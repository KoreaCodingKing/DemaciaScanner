import React from "react";
import "../assets/scss/loading.scss";
import "../assets/scss/ingamestate.scss";

function LayoutSkeleton({ count }) {
  return (
    // <div className="user_block ">
    //   <div className="skeleton-item"></div>
    // </div>

    <div className="user_block card">
      <div className="user_block__img"></div>
      <div className="user_block__info">
        <div className="skeleton-item id"></div>
        <div className="skeleton-item champ_name"></div>
        <div className="skeleton-item memo"></div>
      </div>
      <div className="user_block__symbol"></div>
    </div>
  );
}

function Loading({ userList }) {
  const rendering = () => {
    const result = [];

    for (let i = 0; i < userList.length; i++) {
      result.push(<LayoutSkeleton key={i} />);
    }
    return result;
  };

  return (
    <div className="ingame_view__content ingame_view__content--card">
      {rendering()}
    </div>
  );
}

export default Loading;
