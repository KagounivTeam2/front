import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // 스타일을 위한 CSS

function Home() {
  return (
    <div className="home-container">
      <img src="/img/Logo_img.png" alt="Logo" className="logo-image" />
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
