import React from "react";

function Login() {
    const 
    const id = 'login-container';
    const submitLogin = (event) => {
        // todo: 로그인 submit 구현
    }

    return (
        <div id={id}>
            <form onSubmit={(event) => submitLogin(event)}>
                <input placeholder='아이디'></input>
                <input placeholder='비밀번호'></input>
            </form>
        </div>
    )
} 