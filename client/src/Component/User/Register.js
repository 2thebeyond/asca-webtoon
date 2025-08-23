import React, {use, useState} from 'react'
import {LoginDiv} from '../../Style/UserCSS.js';
import firebase from '../../firebase.js';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Register() {
    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [PW, setPW] = useState("");
    const [PWConfirm, setPWConfirm] = useState("");
    let navigate = useNavigate();

    const RegisterFunc = async (e) => {
        e.preventDefault();
        if (!(Name && Email && PW && PWConfirm)){
            return alert("모든 값을 채워주세요!");
        }
        if (PW != PWConfirm){
            return alert("비밀번호와 비밀번호 확인 값은 같아야 합니다.");
        }
        try {
            let createdUser = await firebase
            .auth()
            .createUserWithEmailAndPassword(Email, PW);
            await createdUser.user.updateProfile({
                displayName: Name,
            });

            let body = {
                email: createdUser.user.multiFactor.user.email,
                displayName: createdUser.user.multiFactor.user.displayName,
                uid: createdUser.user.multiFactor.user.uid,
            }
            const url = process.env.REACT_APP_BACKEND_URL;
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/user/register`, body).then((response) => {
                if (response.data.success){
                    //회원가입 성공시
                    alert("회원가입이 성공하였습니다.");
                    return navigate("/login");
                } else {
                    //회원가입 실패시
                    return alert("회원가입이 실패하였습니다.");
                }
            }
        )} catch(err){
            if (err?.code === "auth/email-already-in-use") {
                return alert("이미 사용 중인 이메일입니다. 다른 이메일을 입력하세요.");
            }
            if (err?.code === "auth/invalid-email") {
                return alert("이메일 형식이 올바르지 않습니다.");
            }
            if (err?.code === "auth/weak-password") {
                return alert("비밀번호가 너무 약합니다. 6자 이상으로 설정하세요.");
            }
        }
    }

    return (
        <LoginDiv>
            <form>
                <label>이름</label>
                <input 
                    type="name" 
                    value={Name}
                    onChange={(e) => setName(e.currentTarget.value)}
                />
                <label>이메일</label>
                <input 
                    type="email" 
                    value={Email}
                    onChange={(e) => setEmail(e.currentTarget.value)}
                />
                <label>비밀번호</label>
                <input 
                    type="password" 
                    value={PW}
                    minLength={8}
                    onChange={(e) => setPW(e.currentTarget.value)}
                />
                <label>비밀번호 확인</label>
                <input 
                    type="password" 
                    value={PWConfirm}
                    minLength={8}
                    onChange={(e) => setPWConfirm(e.currentTarget.value)}
                />
                <button onClick={(e) => RegisterFunc(e)}>회원가입</button>
            </form>
        </LoginDiv>
    );
}

export default Register;