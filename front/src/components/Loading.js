import React from "react";
import "../assets/scss/loading.scss";
import "../assets/scss/ingamestate.scss";

function LayoutSkeleton({count}) {

  return (
    <div className="user_block " >
      <div className="skeleton-item"></div>
    </div>
  )
}

function Loading(props) {


  return (
    <div>
      <LayoutSkeleton />
      <LayoutSkeleton />
      <LayoutSkeleton />
      <LayoutSkeleton />
      <LayoutSkeleton />
      <LayoutSkeleton />
      <LayoutSkeleton />
      <LayoutSkeleton />
      <LayoutSkeleton />
      <LayoutSkeleton />
      <LayoutSkeleton />
      <LayoutSkeleton />
    </div>
  );
}

export default Loading;
  