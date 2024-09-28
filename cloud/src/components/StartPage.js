import React from 'react';
import { Link } from 'react-router-dom';
import './StartPage.css';

function StartPage() {
  return (
    <div className="start-container">
      <header className="header">
      </header>
      
      {/* 텍스트 부분 */}
      <div className="content-wrapper"> {/* 텍스트와 이미지를 감싸는 wrapper */}
        <p className="intro-text">
          좋은 습관을 설정하고, 매일 실천해보세요
          <br />작은 변화가 큰 성장을 만들어줄 거예요
        </p>
      </div>

        {/* 이미지 부분 */}
      <img src="/img/start_2.png" alt="Logo" className="logo-image" />
      

      {/* 버튼 부분 */}
      <div className="buttons">
        <Link to="/my-habit">
          <button className="habit-btn">나의 습관</button>
        </Link>
        <Link to="/add-habit">
          <button className="habit-btn">습관 추가</button>
        </Link>
      </div>
    </div>
  );
}

export default StartPage;
