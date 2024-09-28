import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MyHabit.css';

function MyHabit() {
  const [selectedTab, setSelectedTab] = useState('habit'); 
  const [showAllHabits, setShowAllHabits] = useState(false); 
  const [habits, setHabits] = useState([]); 
  const [selectedTheme, setSelectedTheme] = useState(0); 
  const [selectedHabit, setSelectedHabit] = useState(null); 

  // 새로운 상태들
  const [isRaining, setIsRaining] = useState(false);
  const [plantStage, setPlantStage] = useState(0); 
  const [completed, setCompleted] = useState(false); 
  const [buttonVisible, setButtonVisible] = useState(true); // 버튼의 가시성을 위한 상태

  const today = new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' });

  const dummyHabits = [
    { title: '하루 1L 물 마시기', startDate: '2023.09.01', endDate: '2023.09.07', theme: 0 },
    { title: '매일 아침 운동하기', startDate: '2023.09.08', endDate: '2023.09.14', theme: 1 },
    { title: '저녁에 명상하기', startDate: '2023.09.15', endDate: '2023.09.21', theme: 2 }
  ];

  useEffect(() => {
    const savedHabits = JSON.parse(localStorage.getItem('habits')) || dummyHabits;
    const savedTheme = parseInt(localStorage.getItem('selectedTheme'), 10) || dummyHabits[0].theme;
    setHabits(savedHabits);
    setSelectedTheme(savedTheme);
    if (savedHabits.length > 0) {
      setSelectedHabit(savedHabits[0]);
    }
  }, []);

  const handleComplete = () => {
    setIsRaining(true);
    setButtonVisible(false); // 버튼 숨김

    // 2초 후에 비가 사라지고 식물 애니메이션 시작
    setTimeout(() => {
      setIsRaining(false); 
      setPlantStage(1); 
      setTimeout(() => setPlantStage(2), 1000); 
      setTimeout(() => setPlantStage(3), 2000); 
      
      // 식물 애니메이션이 모두 끝난 후 완료 체크 표시
      setTimeout(() => {
        setCompleted(true);
      }, 3000); 
    }, 2000);
  };

  const themeSettings = [
    { background: 'linear-gradient(to bottom, #79CCFF, #D5FCFF)', cloudImage: 'Day_cloud.png' },
    { background: 'linear-gradient(to bottom, #FEA0B8, #FEE8D4)', cloudImage: 'Evening_cloud.png' },
    { background: 'linear-gradient(to bottom, #635FB8, #E2DAC7)', cloudImage: 'night_cloud.png' }
  ];

  return (
    <div 
      className="my-habit-container" 
      style={{ background: themeSettings[selectedTheme].background }}
    >
      <header className="header">
        <Link to="/" className="back-button">&lt; 로고</Link>
      </header>

      <div className="tab-menu">
        <div className={`tab-item ${selectedTab === 'habit' ? 'active' : ''}`} onClick={() => setSelectedTab('habit')}>
          나의 습관
        </div>
        <div className={`tab-item ${selectedTab === 'stats' ? 'active' : ''}`} onClick={() => setSelectedTab('stats')}>
          통계
        </div>
      </div>

      {selectedTab === 'habit' && (
        <>
          {selectedHabit && (
            <div className="habit-info">
              <h2 className="habit-title-left">{selectedHabit.title}</h2>
              <p className="habit-dates-left">{selectedHabit.startDate} ~ {selectedHabit.endDate}</p>
            </div>
          )}

          <div className="cloud">
            <img src={`/img/${themeSettings[selectedTheme].cloudImage}`} alt="Cloud" />
            {isRaining && <img src="/img/rain.png" alt="Rain" className="rain-image" />}
          </div>

          <div className="plant-container">
            {plantStage >= 1 && <img src="/img/plant_1_1.png" alt="Plant 1" className={`plant plant-stage-1`} />}
            {plantStage >= 2 && <img src="/img/plant_1_2.png" alt="Plant 2" className={`plant plant-stage-2`} />}
            {plantStage >= 3 && <img src="/img/plant_1_3.png" alt="Plant 3" className={`plant plant-stage-3`} />}
          </div>

          {/* 버튼 상태에 따른 가시성 처리 */}
          {buttonVisible && (
            <button className="complete-button" onClick={handleComplete}>
              수행 완료
            </button>
          )}
          {completed && <button className="complete-button">✔</button>}

          <div className="complete-status">{today} 진행중</div>
        </>
      )}
    </div>
  );
}

export default MyHabit;
