import React, { useState } from 'react';
import firebase from 'firebase';

const functions = firebase.functions();
function SignUp() {
    const id = 'scanner-sign-up';
    const [didSuccessedSignUp, setDidSuccessedSignUp] = useState(false);
    const [sendEmailLoading, setSendEmailLoading] = useState(false);
    const [userInfo, setUserInfo] = useState({
        id: '',
        lolId: '',
        password: '',
        email: ''
    });
    const [errors, setErrors] = useState({
        errorMessageFromIdField: '',
        errorMessageFromPasswordField: '',
        errorMessageFromPasswordReConfirmField: '',
        errorMessageFromEmail: '',
    });

    const checkValidityEmailAndSendEmailForAuth = (email) => {
        setSendEmailLoading(true);
        if (!email || email.length === 0) {
            setErrors({...errors, errorMessageFromEmail: '이메일을 입력해 주세요.'});
            return;
        }

        const emailRegularExpression = new RegExp('^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$');
        if (!emailRegularExpression.test(email)) {
            setErrors({...errors, errorMessageFromEmail: '이메일 형식에 맞지 않습니다. 다시 확인해 주세요.'});
            return;
        }

        const registerSendPin = functions.httpsCallable('registerSendPin');
        registerSendPin(email);
    }

    return (
        <div id={id}>
            { didSuccessedSignUp &&
                <p>ToDo: 회원가입 완료후 화면? 디자인 맞춰봐야 할듯</p>
            }
            { !didSuccessedSignUp &&
                <div className="signup_container">
                    <div className="inputs">
                        <div className="input_container">
                            <label className="form_label">아이디</label>
                            <input id="id-input" onBlur={(event) => {check}}/>
                        </div>
                        <div className="input_container">
                            <label className="form_label">롤 아이디</label>
                            <input id="name-input" />
                        </div>
                        <div className="input_container">
                            <label className="form_label">비밀번호</label>
                            <input id="password-input" />
                        </div>
                        <div className="input_container">
                            <label className="form_label">비밀번호 확인</label>
                            <input id="password-reconfirm-input" />
                        </div>
                    </div>
                    <div className="signup_botton_field">
                        <button className="btn_signup"
                            label="회원가입">
                        </button>
                    </div>
                    <div className="input_container">
                        <label className="form_label">이메일 인증</label>
                        <input id="email-input" onChange={(event) => {this.setUserInfo({ ...userInfo, email: event.target.value})}}/>
                        <button onClick={() => checkValidityEmailAndSendEmailForAuth(this.userInfo.email)}>이메일 인증하기</button>
                    </div>
                    <div className="signin_button_container">
                        <button className="signin_button">
                            로그인
                        </button>
                    </div>
                </div>
            }
        </div>
    )
}

export default SignUp();