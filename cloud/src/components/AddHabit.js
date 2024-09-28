import React from 'react';
import './AddHabit.css';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate 훅을 임포트

const AddHabit = () => {
  const [habitName, setHabitName] = React.useState('');
  const navigate = useNavigate(); // navigate 함수 생성

  const handleDirectInputClick = () => {
    setHabitName(''); // 습관 이름 초기화
    navigate('/create-habit'); // CreateHabit.js로 이동
  };

  return (
    <div className="add-habit-container">
      {/* 상단 헤더 */}
      <header className="header">
        <Link to="/my-habit" className="back-button">&lt;</Link>
        <h1 className="headline">습관 추가</h1>
      </header>

      <h2 className="sub-title">즐겨찾는 습관</h2>
      <div className="favorite-habit-box">
        {["커피 하루에 한 잔 이상 금지", "주말마다 동네 산 오르기", "아침 든든히 챙겨먹기"].map((habit, index) => (
          <div key={index} className="habit-box" onClick={() => setHabitName(habit)}>
            {habit}
          </div>
        ))}
      </div>

      <h2 className="sub-title">매일매일 꾸준히</h2>
      <div className="daily-habit-container">
        {[
          { text: "매일 오전 9시 전 기상하기", gradient: "linear-gradient(to bottom, #79CCFF, #D5FCFF)" },
          { text: "매일 30분 운동하기", gradient: "linear-gradient(to bottom, #FEA0B8, #FEE8D4)" },
          { text: "매일 물 1L 마시기", gradient: "linear-gradient(to bottom, #635FB8, #E2DAC7)" }
        ].map((habit, index) => (
          <div key={index} className="daily-habit-box" style={{ background: habit.gradient }} onClick={() => setHabitName(habit.text)}>
            {habit.text}
          </div>
        ))}
      </div>

      <h2 className="sub-title">이런것도 있어요~</h2>
      <div className="favorite-habit-box">
        {["10분 이상 책 읽기", "깨끗이 방 청소", "코딩테스트 1문제 풀기", "특별한 구름 찾기"].map((habit, index) => (
          <div key={index} className="habit-box square-box" onClick={() => setHabitName(habit)}>
            {habit}
          </div>
        ))}
      </div>

      <button className="input-button" onClick={handleDirectInputClick}>
        직접 입력
      </button>
    </div>
  );
};

export default AddHabit;
