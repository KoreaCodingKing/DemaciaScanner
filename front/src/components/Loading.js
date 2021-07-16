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

  const tempNumb = props.users;
  

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
    // <>...loading</>
    // <div className="loading__bg">
    //   <div className="loading"></div>
    // </div>
    // {tempNumb.map()}
  );
}

export default Loading;
  