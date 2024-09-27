import React from 'react';
import './AddHabit.css';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅을 임포트

const AddHabit = () => {
  const [habitName, setHabitName] = React.useState('');
  const navigate = useNavigate(); // navigate 함수 생성

  const handleBackButtonClick = () => {
    navigate('/'); // 시작 페이지로 이동
  };

  const handleDirectInputClick = () => {
    setHabitName(''); // 습관 이름 초기화
    navigate('/create-habit'); // CreateHabit.js로 이동
  };

  return (
    <div className="add-habit-container">
      <div className="header">
        <button className="back-button" onClick={handleBackButtonClick}>
          &lt; {/* < 버튼 */}
        </button>
        <h1 className="add-habit-title">습관 추가</h1>
      </div>
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
          { text: "오전 10시 이전에 기상하기", gradient: "linear-gradient(to bottom, #79CCFF, #D5FCFF)" },
          { text: "저녁에 공원 한 바퀴 돌기", gradient: "linear-gradient(to bottom, #FEA0B8, #FEE8D4)" },
          { text: "불 끄고 휴대폰 하지 않기", gradient: "linear-gradient(to bottom, #635FB8, #E2DAC7)" }
        ].map((habit, index) => (
          <div key={index} className="daily-habit-box" style={{ background: habit.gradient }} onClick={() => setHabitName(habit.text)}>
            {habit.text}
          </div>
        ))}
      </div>

      <h2 className="sub-title">이런것도 있어요</h2>
      <div className="favorite-habit-box">
        {["아침마다 거울보고 웃기", "집에서 밥 차려먹기", "하루에 물 1L마시기"].map((habit, index) => (
          <div key={index} className="habit-box" onClick={() => setHabitName(habit)}>
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
