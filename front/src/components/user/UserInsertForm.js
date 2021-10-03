import React, { useEffect, useState } from "react";
import "../../assets/scss/userinsertform.scss";
import "../../assets/scss/header.scss";
import "../../assets/scss/loading.scss";

// const status = false;

function Loading() {
  return (
    <div class="pswp__preloader__icn">
      <div class="pswp__preloader__cut">
        <div class="pswp__preloader__donut"></div>
      </div>
    </div>
  );
}

const UserInsertForm = (props) => {
  // console.log(props.userValue)
  const user = "유저 1";
  return (
    <>
      <input
        name="search_name"
        placeholder={`${user} 님 소환사를 입력해주세요.`}
        onChange={props.onChangeEvent}
        value={props.inputValue.search_name || ""}
      />
      {props.loading ? <Loading /> : " "}
      {/* <button onClick={props.onInsertUser}>접수</button> */}
      {/* <span className="state">{props.existValue ? "true" : "false"}</span> */}
    </>
  );
};

export default UserInsertForm;
