import React from 'react';
import { Link } from 'react-router-dom';
import './StartPage.css';

function StartPage() {
  return (
    <div className="start-container">
      <header className="header">
      </header>
      <img src="/img/start_img.png" alt="Logo" className="logo-image" />
      <p>당신의 습관을 어쩌구</p>
      <p>대충 감성있는 말 적기</p>
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
