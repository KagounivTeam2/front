import React, { useState } from 'react';
import './Login.css';

function Login() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!name || !password) {
      setError('이름과 비밀번호를 입력해주세요');
    } else {
      // 로그인 로직 처리
      setError('입력하신 정보를 찾을 수 없어요');
    }
  };

  return (
    <div className="login-container">
      <img src="/img/Logo_img.png" alt="Logo" className="logo-image" />
      <input
        type="text"
        placeholder="이름"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="input-field"
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input-field"
      />
      <button onClick={handleLogin} className="login-button">시작하기</button>
      {error && <p className="error-msg">{error}</p>}
    </div>
  );
}

export default Login;
