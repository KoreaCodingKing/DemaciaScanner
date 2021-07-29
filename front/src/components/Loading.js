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

function Loading({userList}) {


const rendering = () => {
    const result = [];

    for(let i = 0; i<userList.length; i++) {
      result.push(<LayoutSkeleton key={i}/>)
    }
    return result;
  }  

  return (
    <div>
    {
      rendering()
    }
      {/* <LayoutSkeleton />
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
      <LayoutSkeleton /> */}
    </div>
  );
}

export default Loading;
  