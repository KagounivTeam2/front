import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Login.css";
import { baseAxios } from "../api/baseAxios";
import { useNavigate } from "react-router-dom"; // useNavigate import

function Login() {
  const [background, setBackground] = useState('');
  const [loginId, setLoginId] = useState(''); 
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate =useNavigate();

  const handleLogin = async () => {
    if (!loginId || !password) {
      setError("이름과 비밀번호를 입력해주세요");
      return;
    }

    try {
      const response = await baseAxios.post("/api/auth/login", {
        loginId: loginId,
        password: password,
      });

      const token = response.headers.get("authorization"); // 응답에서 토큰을 추출
      localStorage.setItem("token", token); // 로컬 스토리지에 저장
      setError(""); // 오류 메시지 초기화

      // 로그인 성공 후 메인 페이지로 리다이렉트
      navigate("/"); // 메인 페이지로 리다이렉트
    } catch (error) {
      // 로그인 실패 시 오류 메시지 설정
      setError("입력하신 정보를 찾을 수 없어요");
      console.error("로그인 실패:", error);
    }
  };
  // 시간에 따른 배경색 설정 함수
  const setTimeBasedBackground = () => {
    const currentHour = new Date().getHours(); 

    if (currentHour >= 9 && currentHour < 15) {
      // 09:00 ~ 15:00
      setBackground('linear-gradient(to bottom, #FEA0B8, #FEE8D4)'); 
    } else if (currentHour >= 15 && currentHour < 20) {
      // 15:00 ~ 20:00
      setBackground('linear-gradient(to bottom, #79CCFF, #D5FCFF)');
    } else {
      // 20:00 ~ 06:00
      setBackground('linear-gradient(to bottom, #635FB8, #E2DAC7)');
    }
  };

  useEffect(() => {
    setTimeBasedBackground();
    const timer = setInterval(setTimeBasedBackground, 1000 * 60);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="login-container" style={{ background }}>  
    {/* <img src="/img/Logo_img.png" alt="Logo" className="logo-image" /> */}
      
      <input
        type="text"
        placeholder="아이디" 
        value={loginId} 
        onChange={(e) => setLoginId(e.target.value)} 
        className="input-fieldA"
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input-fieldB"
      />
            
      {error && 
        <p className="error-msg">
          <img src={process.env.PUBLIC_URL + "img/icon/warning-triangle.png"} />
            <span>{error}</span>
        </p>}
      <button onClick={handleLogin} className="login-button">시작하기</button>
    </div>
  );
}

export default Login;



