// src/Component/User/Login.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LoginDiv } from '../../Style/UserCSS.js';
import firebase from '../../firebase.js';
import axios from 'axios';
import { loginUser } from '../../Reducer/userSlice'; // 경로 주의

function Login() {
  const [Email, setEmail] = useState("");
  const [PW, setPW] = useState("");
  const [ErrorMsg, setErrorMsg] = useState("");
  const reduxUser = useSelector((state) => state.user); // 디버깅용으로 남겨도 OK
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const SignInFunc = async (e) => {
    e.preventDefault();
    if (!(Email && PW)) {
      alert("모든 값을 채워주세요.");
      return;
    }

    try {
      // 1) Firebase 로그인
      const userCredential = await firebase.auth().signInWithEmailAndPassword(Email, PW);
      const fbUser = userCredential.user; // 로그인된 사용자 (여기에 uid, displayName, photoURL 등 존재)
      const url = process.env.REACT_APP_BACKEND_URL;
      // 2) DB에서 isAdmin 조회 (Redux의 user가 아니라, 방금 받은 fbUser.uid 사용!)
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/user/isAdmin/${fbUser.uid}`);
      const isAdmin = res?.data?.isAdmin ?? false;

      // 3) Redux에 저장
      dispatch(loginUser({
        displayName: fbUser.displayName || "",
        uid: fbUser.uid,
        photoURL: fbUser.photoURL || "",
        isAdmin
      }));

      alert("로그인 되었습니다.");
      navigate("/");

    } catch (err) {
      console.error("SignIn error:", err);

      // Firebase 에러 코드 처리
      const code = err?.code || "";
      if (code === "auth/user-not-found") {
        setErrorMsg("존재하지 않는 이메일입니다.");
      } else if (code === "auth/wrong-password") {
        setErrorMsg("비밀번호가 일치하지 않습니다.");
      } else if (code === "ERR_NETWORK") {
        setErrorMsg("네트워크 오류가 발생했습니다. 서버가 켜져있는지 확인하세요.");
      } else {
        setErrorMsg("로그인이 실패하였습니다.");
      }
    }
  };

  useEffect(() => {
    if (!ErrorMsg) return;
    const t = setTimeout(() => setErrorMsg(""), 5000);
    return () => clearTimeout(t);
  }, [ErrorMsg]);

  return (
    <LoginDiv>
      <form onSubmit={SignInFunc}>
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
          onChange={(e) => setPW(e.currentTarget.value)}
        />
        {ErrorMsg !== "" && <p>{ErrorMsg}</p>}
        <button type="submit">로그인</button>
        <button
          onClick={(e) => {
            e.preventDefault();
            navigate("/register");
          }}
        >
          회원가입
        </button>
      </form>
    </LoginDiv>
  );
}

export default Login;
