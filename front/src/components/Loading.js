import React from "react";
import "../assets/scss/loading.scss";
import "../assets/scss/ingamestate.scss";

function LayoutSkeleton({ count, viewState }) {
  return (
    // <div className="user_block ">
    //   <div className="skeleton-item"></div>
    // </div>

    <div className={`user_block ${viewState}`} style={{ opacity: 0.5 }}>
      <div className="user_block__img">
        <div className="skeleton-item img"></div>
      </div>
      <div className="user_block__info">
        <div className="skeleton-item id"></div>
        <div className="skeleton-item champ_name"></div>
        <div className="skeleton-item memo"></div>
      </div>
      <div className="user_block__symbol"></div>
    </div>
  );
}

function Loading({ userList, viewState }) {
  const rendering = () => {
    const result = [];

    for (let i = 0; i < userList.length; i++) {
      result.push(<LayoutSkeleton key={i} viewState={viewState} />);
    }
    return result;
  };

  return (
    <div
      className={`ingame_view__content ingame_view__content--${viewState}`}
      style={{ width: "100%" }}
    >
      {rendering()}
    </div>
  );
}

export default Loading;
