import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './MyHabit.css'; // CSS 파일 연결

function MyHabit() {
  const [selectedTab, setSelectedTab] = useState('habit'); // 탭 상태 (나의 습관 or 통계)
  const [showAllHabits, setShowAllHabits] = useState(false); // 습관 전체보기 토글 상태
  const [habits, setHabits] = useState([
    { id: 1, title: '하루에 물 1L 마시기', startDate: '2024.01.01', endDate: '2024.01.07' },
    { id: 2, title: '아침 스트레칭 하기', startDate: '2024.01.02', endDate: '2024.01.09' },
    { id: 3, title: '저녁 명상하기', startDate: '2024.01.03', endDate: '2024.01.10' },
    { id: 4, title: '책 20페이지 읽기', startDate: '2024.01.04', endDate: '2024.01.11' },
    { id: 5, title: '주 3회 운동하기', startDate: '2024.01.05', endDate: '2024.01.12' },
  ]);
  
  const [selectedTheme, setSelectedTheme] = useState(0); // 0: Day, 1: Evening, 2: Night
  
  // 테마에 따라 배경과 구름 이미지를 변경
  const themeSettings = [
    { background: 'linear-gradient(to bottom, #79CCFF, #D5FCFF)', cloudImage: 'Day_cloud.png' },  // Day 테마
    { background: 'linear-gradient(to bottom, #FEA0B8, #FEE8D4)', cloudImage: 'Evening_cloud.png' },  // Evening 테마
    { background: 'linear-gradient(to bottom, #635FB8, #E2DAC7)', cloudImage: 'night_cloud.png' }   // Night 테마
  ];

  // 습관 삭제 함수
  const deleteHabit = (id) => {
    setHabits(habits.filter(habit => habit.id !== id));
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
          {habits.map(habit => (
            <div key={habit.id} className="habit-item">
              <div className="habit-title">
                {habit.title}
                <button onClick={() => deleteHabit(habit.id)} className="delete-habit-button">🗑️</button>
              </div>
              <div className="habit-dates">{habit.startDate} ~ {habit.endDate}</div>
            </div>
          ))}
        </div>
      )}

      {/* 테마 변경 버튼 */}
      <div className="theme-section">
        <h2 className="theme-title">테마 변경</h2>
        <div className="theme-buttons">
          <button onClick={() => setSelectedTheme(0)} className={selectedTheme === 0 ? 'active' : ''}>Day</button>
          <button onClick={() => setSelectedTheme(1)} className={selectedTheme === 1 ? 'active' : ''}>Evening</button>
          <button onClick={() => setSelectedTheme(2)} className={selectedTheme === 2 ? 'active' : ''}>Night</button>
        </div>
      </div>

      {/* 수행 완료 버튼 */}
      <button className="complete-button">수행 완료</button>
    </div>
  );
}

export default MyHabit;
