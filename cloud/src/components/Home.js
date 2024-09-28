import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // 스타일을 위한 CSS
import CloudBackground from './CloudBackground'; // 구름 컴포넌트 불러오기

function Home() {

  const [background, setBackground] = useState('');



  return (
    <div className="home-container" style={{ background }}>
      {/* 구름 배경 추가 */}
      <CloudBackground />
      
      <img src="/img/Logo_img.png" alt="Logo" className="logo-image-main" />
      <div className="buttons">
        <Link to="/login">
          <button className="login-btn">로그인</button>
        </Link>
        <Link to="/signup">
          <button className="signup-btn">회원가입</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
