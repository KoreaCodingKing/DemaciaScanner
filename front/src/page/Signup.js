import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserListContext } from "../App";

import "../assets/scss/signup.scss";

const Signup = ({ props, history }) => {
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

  function emailRuleTest(target) {
    const emailRule =
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i;
    if (!emailRule.test(target)) {
      return true;
    } else {
      //   setEmailState(true);
      return false;
    }
  }
  function passwordRuleTest(target) {
    const passRule = /^[A-Za-z0-9]{6,12}$/; //숫자와 문자 포함 형태의 6~12자리 이내의 암호 정규식
    if (!passRule.test(target)) {
      return true;
    } else {
      //   setPasswordState(true);
      return false;
    }
  }

  function nicknameRuleTest(target) {
    const nickRule = /^[A-Za-z0-9]{2,20}$/; //숫자와 문자 포함 형태의 6~20자리 이내의 암호 정규식
    if (!nickRule.test(target)) {
      return true;
    } else {
      //   setNicknameState(true);
      return false;
    }
  }

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

                <div className="rule_wrap">
                  {userName.user_email ? (
                    <div>
                      {emailRuleTest(userName.user_email) ? (
                        <span>
                          "유효한 이메일 주소를 입력해 주시기 바랍니다."
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
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
                <div className="rule_wrap">
                  {userName.user_password ? (
                    <div>
                      {passwordRuleTest(userName.user_password) ? (
                        <span>
                          "숫자와 문자 포함 형태의 6~12자리 이내의 암호 정규식"
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div
                className={`member_input__box ${
                  userName.user_nickname ? "input_value--true" : ""
                }`}
              >
                <input
                  id="member-input--nickname"
                  name="user_nickname"
                  autoComplete="off"
                  onChange={onChangeHandle}
                  value={userName.user_nickname}
                />
                <label htmlFor="member-input--nickname">닉네임</label>
                <div className="rule_wrap">
                  {userName.user_nickname ? (
                    <div>
                      {nicknameRuleTest(userName.user_nickname) ? (
                        <span>"2자리 이상, 20자 미만으로 작성하세요."</span>
                      ) : (
                        ""
                      )}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div className="signup__button_group">
                <button
                  type="button"
                  className="signup__button signup__button--cancle"
                  onClick={goBack}
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="signup__button signup__button--submit"
                  disabled={
                    !emailRuleTest(userName.user_email) &&
                    !passwordRuleTest(userName.user_password) &&
                    !nicknameRuleTest(userName.user_nickname)
                      ? false
                      : true
                  }
                >
                  가입하기
                </button>
              </div>
              <div className="signup__link">
                이미 회원 이신가요?{" "}
                <Link to="/login" className="link__login">
                  로그인
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
