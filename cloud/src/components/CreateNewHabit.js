import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CreateNewHabit.css';

function CreateNewHabit() {
  const [habitName, setHabitName] = useState(''); // 습관 이름 상태
  const [isGoalPeriod, setIsGoalPeriod] = useState(true); // 목표 기간/목표 횟수 상태
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 드롭다운 토글 상태
  const [goalCount, setGoalCount] = useState(1); // 목표 횟수 상태
  const [startDate, setStartDate] = useState(''); // 시작 날짜 상태
  const [endDate, setEndDate] = useState(''); // 종료 날짜 상태
  const maxChars = 20; // 최대 글자수 제한

  // 글자 초기화 함수
  const clearHabitName = () => {
    setHabitName('');
  };

  // 목표 기간/목표 횟수 전환
  const toggleGoalSelection = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // 목표 기간과 목표 횟수 선택 시의 텍스트 변경
  const selectGoalOption = (isPeriod) => {
    setIsGoalPeriod(isPeriod);
    setIsDropdownOpen(false); // 선택 후 드롭다운 닫기
  };

  return (
    <div className="create-habit-container">
      {/* 상단 헤더 */}
      <header className="header">
        <Link to="/add-habit" className="back-button">&lt;</Link>
        <h1 className="headline">습관 추가</h1>
      </header>

      {/* 습관명 타이틀 */}
      <div className="input-section">
        <label className="input-title">습관명</label> {/* 습관명 타이틀 추가 */}
        <div className="input-wrapper">
          {/* 글자수 현황 */}
          <span className="char-count">{habitName.length}/{maxChars}</span>
          {/* 텍스트 입력 필드 */}
          <input
            type="text"
            value={habitName}
            onChange={(e) => setHabitName(e.target.value.slice(0, maxChars))} // 글자수 제한
            placeholder="나만의 습관에 이름을 붙여주세요"
            className="habit-input"
            maxLength={maxChars}
          />
          {/* X 버튼으로 글자 초기화 */}
          <button className="clear-button" onClick={clearHabitName}>✕</button>
        </div>
      </div>

      {/* 즐겨찾기 저장하기 */}
      <div className="checkbox-section">
        <label className="favorite-checkbox">
          <input type="checkbox" className="checkbox" />
          즐겨찾기 저장하기
        </label>
      </div>

      {/* 일정 타이틀 및 경고문구 (나란히 배치) */}
      <div className="schedule-section">
        <div className="schedule-wrapper"> {/* 일정과 경고문구를 Flex로 감쌈 */}
          <label className="schedule-title">일정</label> {/* 일정 타이틀 추가 */}
          <p className="warning-message">목표 기간은 최대 7일까지만 설정할 수 있어요</p> {/* 회색 경고문구 추가 */}
        </div>
      </div>

      {/* 목표 기간/목표 횟수 토글 */}
      <div className="goal-toggle-container">
        <button className="goal-toggle-button" onClick={toggleGoalSelection}>
          {isGoalPeriod ? "목표 기간" : "목표 횟수"} 
          <span className="triangle-icon">▼</span>
        </button>

        {isDropdownOpen && (
          <div className="dropdown">
            <div className="dropdown-item" onClick={() => selectGoalOption(true)}>
              목표 기간
            </div>
            <div className="dropdown-item" onClick={() => selectGoalOption(false)}>
              목표 횟수
            </div>
          </div>
        )}
      </div>

      {/* 목표 기간 선택 */}
      {isGoalPeriod && !isDropdownOpen && (
        <div className="goal-period">
          <div className="date-section">
            <div className="date-input">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <span className="calendar-icon">📅</span>
            </div>
            <div className="date-input">
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
              <span className="calendar-icon">📅</span>
            </div>
          </div>
        </div>
      )}

      {/* 목표 횟수 선택 */}
      {!isGoalPeriod && !isDropdownOpen && (
        <div className="goal-count">
          <label>목표 횟수</label>
          <div className="counter">
            <button onClick={() => setGoalCount(Math.max(1, goalCount - 1))}>-</button>
            <span>{goalCount}</span>
            <button onClick={() => setGoalCount(goalCount + 1)}>+</button>
          </div>
        </div>
      )}

      {/* 습관 생성하기 버튼 */}
      <button className="create-habit-button">습관 생성하기</button>
    </div>
  );
}

export default CreateNewHabit;
