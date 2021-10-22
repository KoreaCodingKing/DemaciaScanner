import React, { useEffect, useContext, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserListContext } from "../App";

import "../assets/scss/signup.scss";

const Signup = ({ props, history }) => {
  let { onChangeHandle, userName } = useContext(UserListContext);

  const [stepIndex, setStepIndex] = useState(1);

  const [loading, setLoading] = useState(false);
  const [checkPinNumber, setCheckPinNumber] = useState(false);
  const [nextStep, setNextStep] = useState(false);
  const [countDown, setCountDown] = useState({ minutes: "", seconds: "" });
  // const pinlength = 6;
  const testPinNumber = 12345;

  // 핀번호 상태값
  const [pinNumber, setPinNumber] = useState({
    pin1: "",
    pin2: "",
    pin3: "",
    pin4: "",
    pin5: "",
  });

  const { pin1, pin2, pin3, pin4, pin5 } = pinNumber;

  const onChange = (e) => {
    const { value, name } = e.target;
    setPinNumber({
      ...pinNumber,
      [name]: value,
    });
  };

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
  function idRuleTest(target) {
    const idRule = /^([a-zA-Z])[-a-zA-Z0-9_.]{5,11}$/;
    if (!idRule.test(target) || target.includes("admin")) {
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

  function startTimer(duration, display) {
    let timer = duration,
      minutes,
      seconds;
    let interval = setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      let view = minutes + ":" + seconds;
      setCountDown({
        minutes: minutes,
        seconds: seconds,
      });
      console.log(view);

      if (--timer < 0) {
        return (timer = duration);
      }
      if (timer === 0) {
        clearInterval(interval);
        return "세션 만료!";
      }
      if (timer === "done") {
        clearInterval(interval);
        return "인증완료";
      }
    }, 1000);
  }

  const listRef = useRef();

  const inputRef1 = useRef();
  const inputRef2 = useRef();
  const inputRef3 = useRef();
  const inputRef4 = useRef();
  const inputRef5 = useRef();

  function focusMove(e, number) {
    const targetInput = e.target;
    function doneCheck() {
      if (
        pinNumber.pin1 &&
        pinNumber.pin2 &&
        pinNumber.pin3 &&
        pinNumber.pin4 &&
        pinNumber.pin5
      ) {
        console.log("ok");
        let dataList12 = []; //문자열 변환 리스트
        const data = Object.entries(pinNumber).map((item, index) => {
          // let dataList = [];
          dataList12 += item[1];

          if (index == 4) {
            return console.log(dataList12);
          }
        });
        console.log("result = ", dataList12.toString());

        if (dataList12.toString() == testPinNumber) {
          setNextStep(true);
          startTimer("done");
          setStepIndex(2);
        } else {
          console.log("틀렸음");
        }
      } else {
        console.log("no");
      }
    }
    // if(testPinNumber == )
    switch (number) {
      case 1:
        doneCheck();
        inputRef2.current.focus();
        break;
      case 2:
        doneCheck();
        inputRef3.current.focus();
        break;
      case 3:
        doneCheck();
        inputRef4.current.focus();
        break;
      case 4:
        doneCheck();
        inputRef5.current.focus();
        break;
      case 5:
        doneCheck();
    }
  }

  // console.log(inputRef1.current.attributes);

  // inputRef1.

  for (let i = 0; i < 6; i++) {}

  return (
    <div className="signup">
      <div className="signup__wrapper">
        <div className="signup__layer">
          <div className="signup__header">
            <span>Demacia Logo</span>
          </div>
          이메일 인증 : {nextStep ? "완료." : "대기중!"}
          stepIndex 값 : {stepIndex}
          <div className="signup__content">
            <form>
              <div
                className={`member_input__box member_input__box--info ${
                  userName.user_email ? "input_value--true" : ""
                }`}
              >
                <input
                  id="member-input--email"
                  name="user_email"
                  autoComplete="off"
                  autoFocus
                  onChange={onChangeHandle}
                  disabled={checkPinNumber}
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
              {checkPinNumber ? (
                <div className="member_input__box member_input__box--pin">
                  <ul className="pin_group" ref={listRef}>
                    <li className="pin_item">
                      <input
                        onKeyUp={(e) => focusMove(e, 1)}
                        ref={inputRef1}
                        name="pin1"
                        autoComplete="off"
                        pattern={"10-9*"}
                        inputMode={"numeric"}
                        disabled={nextStep}
                        onChange={onChange}
                        maxLength="1"
                        value={pinNumber.pin1}
                      />
                    </li>
                    <li className="pin_item">
                      <input
                        onKeyUp={(e) => focusMove(e, 2)}
                        ref={inputRef2}
                        name="pin2"
                        autoComplete="off"
                        pattern={"10-9*"}
                        inputMode={"numeric"}
                        disabled={nextStep}
                        onChange={onChange}
                        maxLength="1"
                        value={pinNumber.pin2}
                      />
                    </li>
                    <li className="pin_item">
                      <input
                        onKeyUp={(e) => focusMove(e, 3)}
                        ref={inputRef3}
                        name="pin3"
                        autoComplete="off"
                        pattern={"10-9*"}
                        inputMode={"numeric"}
                        disabled={nextStep}
                        onChange={onChange}
                        maxLength="1"
                        value={pinNumber.pin3}
                      />
                    </li>
                    <li className="pin_item">
                      <input
                        onKeyUp={(e) => focusMove(e, 4)}
                        ref={inputRef4}
                        name="pin4"
                        autoComplete="off"
                        pattern={"10-9*"}
                        inputMode={"numeric"}
                        disabled={nextStep}
                        onChange={onChange}
                        maxLength="1"
                        value={pinNumber.pin4}
                      />
                    </li>
                    <li className="pin_item">
                      <input
                        onKeyUp={(e) => focusMove(e, 5)}
                        ref={inputRef5}
                        name="pin5"
                        autoComplete="off"
                        pattern={"10-9*"}
                        inputMode={"numeric"}
                        disabled={nextStep}
                        onChange={onChange}
                        maxLength="1"
                        value={pinNumber.pin5}
                      />
                    </li>
                  </ul>
                  {/* 시간 디스카운트 노출되야함 */}
                  {nextStep
                    ? ""
                    : `시간 ${countDown.minutes}: ${countDown.seconds}`}
                </div>
              ) : (
                ""
              )}
              {nextStep ? (
                <div>
                  <h2 style={{ margin: "50px 0 0" }}>추가 정보입력</h2>
                  <div
                    className={`add_info__section ${nextStep ? "active" : ""}`}
                  >
                    <div
                      className={`member_input__box member_input__box--info ${
                        userName.user_id ? "input_value--true" : ""
                      }`}
                    >
                      <input
                        id="member-input--id"
                        name="user_id"
                        autoComplete="off"
                        autoFocus
                        onChange={onChangeHandle}
                        value={userName.user_id}
                      />
                      <label htmlFor="member-input--id">아이디</label>

                      <div className="rule_wrap">
                        {userName.user_id ? (
                          <div>
                            {idRuleTest(userName.user_id) ? (
                              <span>
                                "영문 + 숫자 또는 영문만 6~12자를 입력해주세요"
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
                      className={`member_input__box member_input__box--info ${
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
                                "숫자와 문자 포함 형태의 6~12자리 이내의 암호
                                정규식"
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
                      className={`member_input__box member_input__box--info ${
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
                              <span>
                                "2자리 이상, 20자 미만으로 작성하세요."
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
                  </div>
                </div>
              ) : (
                ""
              )}

              <div className="signup__button signup__button--group">
                <button
                  type="button"
                  className="signup__button signup__button--cancle"
                  onClick={goBack}
                >
                  취소
                </button>
                {/* <Link to={`/confirmed_email/${userName.user_email}`}> */}
                {!nextStep ? (
                  <button
                    type="submit"
                    className="signup__button signup__button--point"
                    onClick={(e) => {
                      e.preventDefault();
                      setLoading(true);
                      // axios
                      //   .post("http://localhost:8080/signup", {
                      //     email: userName.user_email,
                      //   })
                      //   .then((res) => {
                      //     setLoading(false);
                      //     // setCheckPinNumber(true);
                      //     // 핀값 받기
                      //     console.log(res.data.pin);
                      //     // if (!res.data.success) {
                      //     //   return alert("오류");
                      //     // }
                      //   })
                      //   .catch((e) => {
                      //     setCheckPinNumber(true);
                      //     console.log(e);
                      //   });
                      setTimeout(() => {
                        setCheckPinNumber(true);
                        setLoading(false);
                        startTimer(60 * 5 - 1);
                      }, 1000);
                    }}
                    disabled={
                      !emailRuleTest(userName.user_email) ? false : true
                    }
                  >
                    이메일 인증
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="signup__button signup__button--point"
                    onClick={(e) => {
                      e.preventDefault();
                      setLoading(true);
                      setStepIndex(3);
                      // axios
                      //   .post("http://localhost:8080/signup", {
                      //     email: userName.user_email,
                      //   })
                      //   .then((res) => {
                      //     setLoading(false);
                      //     // setCheckPinNumber(true);
                      //     // 핀값 받기
                      //     console.log(res.data.pin);
                      //     // if (!res.data.success) {
                      //     //   return alert("오류");
                      //     // }
                      //   })
                      //   .catch((e) => {
                      //     setCheckPinNumber(true);
                      //     console.log(e);
                      //   });
                      setTimeout(() => {
                        setCheckPinNumber(true);
                        setLoading(false);
                      }, 1000);
                    }}
                    disabled={
                      !idRuleTest(userName.user_id) &&
                      !passwordRuleTest(userName.user_password) &&
                      !nicknameRuleTest(userName.user_nickname)
                        ? false
                        : true
                    }
                  >
                    가입하기
                  </button>
                )}

                {/* </Link> */}
              </div>
            </form>
          </div>
          <div className="signup__link">
            이미 회원 이신가요?{" "}
            <Link to="/login" className="link__login">
              로그인
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
