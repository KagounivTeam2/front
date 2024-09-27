import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CreateNewHabit.css';

function CreateHabit() {
  const [goalToggle, setGoalToggle] = useState(false); // 목표 기간 토글 상태
  const [goalCount, setGoalCount] = useState(1); // 목표 횟수 상태
  const [startDate, setStartDate] = useState(''); // 시작 날짜 상태
  const [endDate, setEndDate] = useState(''); // 종료 날짜 상태
  

  return (
    <div className="create-habit-container">
      {/* 상단 헤더 */}
      <header className="header">
        <Link to="/add-habit" className="back-button">&lt;</Link>
        <h1 className="headline">습관 추가</h1>
      </header>

      {/* 습관 이름 입력 */}
      <div className="input-section">
        <label htmlFor="habit-name">나만의 습관에 이름을 붙여주세요</label>
        <input type="text" id="habit-name" maxLength="20" className="habit-input" />
        <hr className="input-underline" />
      </div>

      {/* 즐겨찾기 저장하기 */}
      <div className="checkbox-section">
        <label className="favorite-checkbox">
          <input type="checkbox" className="checkbox" />
          즐겨찾기 저장하기
        </label>
      </div>

      {/* 일정 타이틀 및 경고 메시지 */}
      <div className="schedule-section">
        <h2 className="schedule-title">일정</h2>
        <div className="warning-message">
          <span className="warning-icon">⚠️</span>
          <span>목표 기간은 최대 7일까지만 설정할 수 있어요</span>
        </div>

        {/* 목표 기간 토글 박스 */}
        <div className="goal-toggle-container">
          <div className="goal-period-box">
            <label>
              <input
                type="checkbox"
                onChange={() => setGoalToggle(!goalToggle)}
              />
              목표 기간
            </label>
            {goalToggle && (
              <div className="goal-period">
                {/* 목표 횟수 선택 */}
                <div className="goal-count">
                  <label>목표 횟수</label>
                  <div className="counter">
                    <button onClick={() => setGoalCount(Math.max(1, goalCount - 1))}>-</button>
                    <span>{goalCount}</span>
                    <button onClick={() => setGoalCount(goalCount + 1)}>+</button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 시작 날짜와 종료 날짜 선택 */}
          <div className="date-section">
            <div className="date-box">
              <div className="date-input">
                <span className="calendar-icon">📅</span>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="date-input">
                <span className="calendar-icon">📅</span>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 테마 선택 */}
      <div className="theme-section">
        <div className="theme-box" style={{ background: 'linear-gradient(to right, #FEA0B8, #FEE8D4)' }}></div>
        <div className="theme-box" style={{ background: 'linear-gradient(to right, #A0FEA8, #D4FEE8)' }}></div>
        <div className="theme-box" style={{ background: 'linear-gradient(to right, #A0A8FE, #E8D4FE)' }}></div>
      </div>

      {/* 습관 생성하기 버튼 */}
      <button className="create-habit-button">습관 생성하기</button>
    </div>
  );
}

export default CreateHabit;
