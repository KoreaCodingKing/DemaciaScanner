import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";

import "../assets/scss/signup.scss";

const SignupConfirmedEmail = ({ props, history }) => {
  // let { onChangeHandle, userName } = useContext(UserListContext);

  const userEmail =  window.location.pathname.slice('17');

  useEffect(() => {
    // console.log(history);
    // const unblock = history.block("정말 떠나실건가요 ㅠㅠ?");
    // return () => {
    //   unblock();
    // };
  }, [history]);

  

  return (
    <div className="signup">
      <div className="signup__wrapper">
        <div className="signup__layer">
          <div className="signup__header">
            <span>Demacia Logo</span>
          </div>
          <div className="signup__content">

              <div>
                {userEmail}로 발송된 이메일을 확인하세요.
              </div>

              <div className="signup__button">
                <button
                  type="submit"
                  className="signup__button signup__button--point"
                >
                  <Link to="/login" className="link__login" >
                     완료
                  </Link>
                </button>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupConfirmedEmail;
