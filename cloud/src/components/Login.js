import React, { useEffect, useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

function Login() {

  const [background, setBackground] = useState('');

  // 시간에 따른 배경색 설정 함수
  const setTimeBasedBackground = () => {
    const currentHour = new Date().getHours(); 

    if (currentHour >= 9 && currentHour < 15) {
      setBackground('linear-gradient(to bottom, #FEA0B8, #FEE8D4)'); 
    } else if (currentHour >= 15 && currentHour < 20) {
      setBackground('linear-gradient(to bottom, #79CCFF, #D5FCFF)');
    } else {
      setBackground('linear-gradient(to bottom, #635FB8, #E2DAC7)');
    }
  };

  useEffect(() => {
    setTimeBasedBackground();
    const timer = setInterval(setTimeBasedBackground, 1000 * 60);
    return () => clearInterval(timer);
  }, []);

  const [loginId, setLoginId] = useState(''); 
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigate();

  const handleLogin = async () => {
    if (!loginId || !password) { 
      setError('아이디와 비밀번호를 입력해주세요'); 
      return;
    }

    try {
      const response = await fetch('http://44.219.236.123:8080/api/auth/login', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ loginId, password }), 
      });

      if (response.ok) { 
        const data = await response.json();
        localStorage.setItem('token', data.token); 
        navigation('/');
      } else if (response.status === 401) { 
        setError('아이디 또는 비밀번호가 올바르지 않습니다.');
      } else if (response.status === 400) {
        setError('필수 입력 값이 누락되었습니다.');
      } else {
        const data = await response.json();
        setError(data.message || '로그인 중 오류가 발생했습니다.');
      }
    } catch (error) {
      setError('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="login-container" style={{ background }}>  
      {/* 로고 추가 */}
      <img src={process.env.PUBLIC_URL + "/img/Logo_img.png"} alt="Logo" className="logo-image" />

      {/* 아이디 입력 필드 */}
      <div className="input-container">
        <input
          type="text"
          placeholder="아이디" 
          value={loginId} 
          onChange={(e) => setLoginId(e.target.value)} 
          className="input-fieldA"
        />
        <div className="char-count-login">{loginId.length}/15</div>
      </div>

      {/* 비밀번호 입력 필드 */}
      <div className="input-container">
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-fieldB"
        />
        <div className="char-count-login">{password.length}/20</div>
      </div>
      
      {/* 에러 메시지 */}
      {error && (
        <p className="error-msg">
          <img src={process.env.PUBLIC_URL + "/img/icon/warning-triangle.png"} alt="Warning" />
          <span>{error}</span>
        </p>
      )}

      {/* 시작하기 버튼 */}
      <button onClick={handleLogin} className="login-button">시작하기</button>
    </div>
  );
}

export default Login;
