import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MyHabit.css';

function MyHabit() {
  const [selectedTab, setSelectedTab] = useState('habit'); // 탭 상태 (나의 습관 or 통계)
  const [showAllHabits, setShowAllHabits] = useState(false); // 습관 전체보기 토글 상태
  const [habits, setHabits] = useState([]); // 습관 리스트
  const [selectedTheme, setSelectedTheme] = useState(0); // 테마 상태

  useEffect(() => {
    // localStorage에서 습관과 테마 데이터 불러오기
    const savedHabits = JSON.parse(localStorage.getItem('habits')) || [];
    const savedTheme = parseInt(localStorage.getItem('selectedTheme'), 10) || 0;
    setHabits(savedHabits);
    setSelectedTheme(savedTheme);
  }, []);

  // 테마에 따라 배경과 구름 이미지를 변경
  const themeSettings = [
    { background: 'linear-gradient(to bottom, #79CCFF, #D5FCFF)', cloudImage: 'Day_cloud.png' },  // Day 테마
    { background: 'linear-gradient(to bottom, #FEA0B8, #FEE8D4)', cloudImage: 'Evening_cloud.png' },  // Evening 테마
    { background: 'linear-gradient(to bottom, #635FB8, #E2DAC7)', cloudImage: 'night_cloud.png' }   // Night 테마
  ];

  // 습관 삭제 함수
  const deleteHabit = (id) => {
    const updatedHabits = habits.filter((_, index) => index !== id);
    setHabits(updatedHabits);
    localStorage.setItem('habits', JSON.stringify(updatedHabits)); // 습관 리스트 업데이트
  };

  return (
    <div 
      className="my-habit-container" 
      style={{ background: themeSettings[selectedTheme].background }} // 배경 그라데이션 변경
    >
      {/* 상단 헤더 */}
      <header className="header">
        <Link to="/" className="back-button">&lt; 로고</Link>
      </header>

      {/* 탭 메뉴 */}
      <div className="tab-menu">
        <div className={`tab-item ${selectedTab === 'habit' ? 'active' : ''}`} onClick={() => setSelectedTab('habit')}>
          나의 습관
        </div>
        <div className={`tab-item ${selectedTab === 'stats' ? 'active' : ''}`} onClick={() => setSelectedTab('stats')}>
          통계
        </div>
      </div>

      {/* 습관 추가 및 전체 보기 */}
      <div className="habit-actions">
        <Link to="/add-habit" className="add-habit-button">습관 추가</Link>
        <button onClick={() => setShowAllHabits(!showAllHabits)} className="toggle-habits-button">
          {showAllHabits ? '습관 숨기기' : '습관 전체보기'}
        </button>
      </div>

      {/* 구름 이미지 */}
      <div className="cloud">
        <img src={`/img/${themeSettings[selectedTheme].cloudImage}`} alt="Cloud" />
      </div>

      {/* 습관 리스트 */}
      {showAllHabits && (
        <div className="habit-list">
          {habits.map((habit, index) => (
            <div key={index} className="habit-item">
              <div className="habit-title">
                {habit.title}
                <button onClick={() => deleteHabit(index)} className="delete-habit-button">🗑️</button>
              </div>
              <div className="habit-dates">{habit.startDate} ~ {habit.endDate}</div>
            </div>
          ))}
        </div>
      )}

      {/* 수행 완료 버튼 */}
      <button className="complete-button">수행 완료</button>
    </div>
  );
}

export default MyHabit;
