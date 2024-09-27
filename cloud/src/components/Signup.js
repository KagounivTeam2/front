import React, { useState } from 'react';
import './Signup.css';

function Signup() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = () => {
    if (!name || !password) {
      setError('이름과 비밀번호를 입력해주세요');
    } else {
      // 회원가입 로직 처리
    }
  };

  return (
    <div className="signup-container">
      <img src="/img/Logo_img.png" alt="Logo" className="logo-image" />
      <input
        type="text"
        placeholder="이름"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="input-field" // 추가한 클래스명
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input-field" // 추가한 클래스명
      />
      <button onClick={handleSignup} className="signup-button">계정 만들기</button>
      {error && <p className="error-msg">{error}</p>}
    </div>
  );
}

export default Signup;
