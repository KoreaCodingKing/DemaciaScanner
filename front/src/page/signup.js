import React, { useState } from 'react';

function SignUp() {
    const id = 'scanner-sign-up'
    const [didSuccessedSignUp, setDidSuccessedSignUp] = useState(false);

    // ToDo: 회원가입 기능 구현
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
                            <input id="id-input" />
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