import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MyHabit.css';

function MyHabit() {
  const [selectedTab, setSelectedTab] = useState('habit'); // 탭 상태 (나의 습관 or 통계)
  const [showAllHabits, setShowAllHabits] = useState(false); // 습관 전체보기 토글 상태
  const [habits, setHabits] = useState([]); // 습관 리스트
  const [selectedTheme, setSelectedTheme] = useState(0); // 테마 상태
  const [selectedHabit, setSelectedHabit] = useState(null); // 선택된 습관 정보

  // 현재 날짜 가져오기
  const today = new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' });

  useEffect(() => {
    // localStorage에서 습관과 테마 데이터 불러오기
    const savedHabits = JSON.parse(localStorage.getItem('habits')) || [];
    const savedTheme = parseInt(localStorage.getItem('selectedTheme'), 10) || 0;
    setHabits(savedHabits);
    setSelectedTheme(savedTheme);
    if (savedHabits.length > 0) {
      setSelectedHabit(savedHabits[0]); // 첫 번째 습관을 기본 선택
    }
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

  // 습관 선택 시 테마와 정보를 변경하는 함수
  const handleHabitSelection = (habit) => {
    setSelectedHabit(habit);
    setSelectedTheme(habit.theme);
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

      {/* 나의 습관 탭 내용 */}
      {selectedTab === 'habit' && (
        <>
          {/* 습관 추가 및 전체 보기 */}
          <div className="habit-actions">
            <Link to="/add-habit" className="add-habit-button"> + 습관 추가</Link>
            <button 
              onClick={() => setShowAllHabits(!showAllHabits)} 
              className="toggle-habits-button"
            >
              {showAllHabits ? '습관 숨기기' : '습관 전체보기 ▼'}
            </button>
          </div>

          {/* 습관 타이틀과 기간 */}
          {selectedHabit && (
            <div className="habit-info">
              <h2 className="habit-title-left">{selectedHabit.title}</h2>
              <p className="habit-dates-left">{selectedHabit.startDate} ~ {selectedHabit.endDate}</p>
            </div>
          )}

          {/* 구름 이미지와 습관 정보 */}
          <div className="cloud">
            <img src={`/img/${themeSettings[selectedTheme].cloudImage}`} alt="Cloud" />
          </div>

          {/* 습관 리스트 (토글로 열리는 부분) */}
          {showAllHabits && (
            <div className="habit-list">
              {habits.map((habit, index) => (
                <div key={index} className="habit-item">
                  <button 
                    onClick={() => handleHabitSelection(habit)} 
                    className={`habit-button ${selectedHabit === habit ? 'selected' : ''}`}
                  >
                    {habit.title}
                  </button>
                  <div className="habit-dates">{habit.startDate} ~ {habit.endDate}</div>
                  <button onClick={() => deleteHabit(index)} className="delete-habit-button">🗑️</button>
                </div>
              ))}
            </div>
          )}

          {/* 수행 완료 버튼 */}
          <button className="complete-button">수행 완료</button>
          
          {/* 현재 날짜와 상태 텍스트 */}
          <div className="complete-status">
            {today} 진행중
          </div>
        </>
      )}

      {/* 통계 탭 내용 */}
      {selectedTab === 'stats' && (
        <>
          <h2 className="stat-title">나의 구름</h2>
          <div className="stat-cloud-box">
            <div className="stat-cloud-info">
              <p className="stat-cloud-text">모은 구름</p>
              <p className="stat-cloud-count">27개</p>
              <p className="stat-period-left">{selectedHabit?.startDate} ~ {selectedHabit?.endDate}</p>
            </div>
            <img src="/img/State_img.png" alt="Cloud" className="stat-cloud-image" />
          </div>

          <h2 className="stat-subtitle">나의 성공</h2>
          <div className="stat-success-box">
            <div className="stat-success-info">
              <p className="stat-success-text">나의 성공 횟수</p>
              <p className="stat-success-count">21회</p>
              <p className="stat-period-left">{selectedHabit?.startDate} ~ {selectedHabit?.endDate}</p>
            </div>
            <div className="stat-bar"></div>
          </div>

          <div className="stat-success-box">
            <div className="stat-success-info">
              <p className="stat-success-text">나의 성공 확률</p>
              <p className="stat-success-percent">78%</p>
              <p className="stat-period-left">{selectedHabit?.startDate} ~ {selectedHabit?.endDate}</p>
            </div>
            <div className="stat-bar"></div>
          </div>
        </>
      )}
    </div>
  );
}

export default MyHabit;
