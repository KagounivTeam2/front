import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // 스타일을 위한 CSS

function Home() {

  const [background, setBackground] = useState('');

  // 시간에 따른 배경색 설정 함수
  const setTimeBasedBackground = () => {
    const currentHour = new Date().getHours(); // 현재 시간 가져오기

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
    // 컴포넌트 마운트 시 배경색 설정
    setTimeBasedBackground();

    // 매 분마다 배경색을 업데이트하는 타이머 설정
    const timer = setInterval(setTimeBasedBackground, 1000 * 60);

    // 컴포넌트 언마운트 시 타이머 정리
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="home-container" style={{ background }}>
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
