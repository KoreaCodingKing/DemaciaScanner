import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserListContext } from "../App";

import "../assets/scss/signup.scss";

const Login = ({ props, history }) => {
  let { onChangeHandle, userName } = useContext(UserListContext);

  const goBack = () => {
    history.goBack();
  };

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
            <form>
              <div
                className={`member_input__box ${
                  userName.user_email ? "input_value--true" : ""
                }`}
              >
                <input
                  id="member-input--email"
                  name="user_email"
                  autoComplete="off"
                  autoFocus
                  onChange={onChangeHandle}
                  value={userName.user_email}
                />
                <label htmlFor="member-input--email">이메일 주소</label>

                <div className="rule_wrap"></div>
              </div>
              <div
                className={`member_input__box ${
                  userName.user_password ? "input_value--true" : ""
                }`}
              >
                <input
                  id="member-input--password"
                  name="user_password"
                  autoComplete="new-password"
                  onChange={onChangeHandle}
                  value={userName.user_password}
                  type="password"
                />
                <label htmlFor="member-input--password">비밀번호</label>
                <div className="rule_wrap"></div>
              </div>

              <div className="signup__button">
                {/* <button
                  type="button"
                  className="signup__button signup__button--cancle"
                  onClick={goBack}
                >
                  취소
                </button> */}
                <button
                  type="submit"
                  className="signup__button signup__button--full signup__button--point"
                  // disabled={
                  //   !emailRuleTest(userName.user_email) &&
                  //   !passwordRuleTest(userName.user_password) &&
                  //   !nicknameRuleTest(userName.user_nickname)
                  //     ? false
                  //     : true
                  // }
                >
                  로그인
                </button>
              </div>
              <div className="signup__link">
                데마시아 요원에 가입하세요.
                <Link to="/signup" className="link__login">
                  회원가입
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
