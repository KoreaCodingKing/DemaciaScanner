import React, { useEffect, useState } from "react";
import "../assets/scss/userinsertform.scss";

const status = false;

const UserInsertForm = (props) => {
  return (
    <>
    <input onChange={props.onChangeEvent} value={props.userValue} />
      <button onClick={props.onInsertUser}>접수</button>
      <span className="state">{props.existValue ? "true" : "false"}</span>
    </>
  );
};

export default UserInsertForm;
