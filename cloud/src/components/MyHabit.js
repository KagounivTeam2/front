import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MyHabit.css';


function MyHabit() {
  const [selectedTab, setSelectedTab] = useState('habit'); // 탭 상태 (나의 습관 or 통계)
  const [showAllHabits, setShowAllHabits] = useState(false); // 습관 전체보기 토글 상태
  const [habits, setHabits] = useState([]); // 습관 리스트
  const [selectedTheme, setSelectedTheme] = useState(0); // 테마 상태
  const [selectedHabit, setSelectedHabit] = useState(null); // 선택된 습관 정보
  const [isRaining, setIsRaining] = useState(false); // 비 내리는 상태
  const [plantStage, setPlantStage] = useState(0); // 식물 단계 상태
  const [completed, setCompleted] = useState(false); // 완료 상태
  const [buttonVisible, setButtonVisible] = useState(true); // 수행 완료 버튼의 가시성

  // 현재 날짜 가져오기
  const today = new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' });

  // 더미 습관 데이터
  const dummyHabits = [
    { title: '하루 1L 물 마시기', startDate: '2023.09.01', endDate: '2023.09.07', theme: 0 },
    { title: '매일 아침 운동하기', startDate: '2023.09.08', endDate: '2023.09.14', theme: 1 },
    { title: '저녁에 명상하기', startDate: '2023.09.15', endDate: '2023.09.21', theme: 2 }
  ];

  useEffect(() => {
    // localStorage에서 습관과 테마 데이터 불러오기 (혹은 더미 데이터를 설정)
    const savedHabits = JSON.parse(localStorage.getItem('habits')) || dummyHabits; // 더미 데이터로 초기화
    const savedTheme = parseInt(localStorage.getItem('selectedTheme'), 10) || dummyHabits[0].theme;
    setHabits(savedHabits);
    setSelectedTheme(savedTheme);
    if (savedHabits.length > 0) {
      setSelectedHabit(savedHabits[0]); // 첫 번째 습관을 기본 선택
    }
  }, []);

  const handleComplete = () => {
    setIsRaining(true);
    setButtonVisible(false); // 수행 완료 버튼 숨김

    // 2초 후에 비가 멈추고 식물 애니메이션 시작
    setTimeout(() => {
      setIsRaining(false); 
      setPlantStage(1); 
      setTimeout(() => setPlantStage(2), 1000); 
      setTimeout(() => setPlantStage(3), 2000); 
      
      // 식물 애니메이션이 끝난 후 완료 체크 버튼으로 전환
      setTimeout(() => {
        setCompleted(true);
      }, 3000);
    }, 2000);
  };

  // 테마에 따라 배경과 구름 이미지를 변경
  const themeSettings = [
    { background: 'linear-gradient(to bottom, #79CCFF, #D5FCFF)', cloudImage: 'Day_cloud.png' },  // Day 테마
    { background: 'linear-gradient(to bottom, #FEA0B8, #FEE8D4)', cloudImage: 'Evening_cloud.png' },  // Evening 테마
    { background: 'linear-gradient(to bottom, #635FB8, #E2DAC7)', cloudImage: 'night_cloud.png' }   // Night 테마
  ];

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
            {isRaining && <img src="/img/rain.png" alt="Rain" className="rain-image" />}
          </div>

          {/* 식물 이미지 */}
          <div className="plant-container">
            {plantStage >= 1 && <img src="/img/plant_1_1.png" alt="Plant 1" className={`plant plant-stage-1`} />}
            {plantStage >= 2 && <img src="/img/plant_1_2.png" alt="Plant 2" className={`plant plant-stage-2`} />}
            {plantStage >= 3 && <img src="/img/plant_1_3.png" alt="Plant 3" className={`plant plant-stage-3`} />}
          </div>

          {/* 버튼 가시성에 따른 상태 처리 */}
          {buttonVisible && (
            <button className="complete-button" onClick={handleComplete}>
              수행 완료
            </button>
          )}
          {completed && <button className="complete-button">✔</button>}

          {/* 완료 여부에 따른 상태 텍스트 변경 */}
          {/* 비가 내리고 있을 때는 텍스트 숨김 */}
          {!isRaining && (
            <div className="complete-status">
              {completed ? "달성 완료" : `${today} 진행중`}
            </div>
          )}
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
            <img src="/img/State_img2.png" alt="Cloud" className="stat-cloud-image" />
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
