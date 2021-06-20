import React, { useEffect, useState } from "react";
import "../assets/scss/userinsertform.scss";

const status = false;

const UserInsertForm = (props) => {
  // if(status) {
  //     return <p>양호</p>
  // }
  return (
    <div className="user_insert_form">
      <input
        onChange={props.onChange}
        value={props.userId}
        placeholder="아이디를 입력해주세요"
      />
      <button onClick={props.insertUser}>정보 삽입</button>
      <div className="status">실패</div>
    </div>
  );
};

export default UserInsertForm;
