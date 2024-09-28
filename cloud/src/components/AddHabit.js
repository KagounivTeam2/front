import React from 'react';
import './AddHabit.css';
import { Link, useNavigate } from 'react-router-dom';

const AddHabit = () => {
  const [habitName, setHabitName] = React.useState('');
  const navigate = useNavigate();

  const handleDirectInputClick = () => {
    setHabitName('');
    navigate('/create-habit');
  };

  return (
    <div className="add-habit-container">
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
          { text: "매일 오전 9시 전 기상하기", image: "/img/recommend_img1.png", gradient: "linear-gradient(to bottom, rgba(121, 204, 255, 0.7), rgba(213, 252, 255, 0.7))" },
          { text: "매일 30분 운동하기", image: "/img/recommend_img2.png", gradient: "linear-gradient(to bottom, rgba(254, 160, 184, 0.7), rgba(254, 232, 212, 0.7))" },
          { text: "매일 물 1L 마시기", image: "/img/recommend_img3.png", gradient: "linear-gradient(to bottom, rgba(99, 95, 184, 0.7), rgba(226, 218, 199, 0.7))" }
        ].map((habit, index) => (
          <div
            key={index}
            className="daily-habit-box"
            style={{
              backgroundImage: `${habit.gradient}, url(${habit.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'  // 이미지 반복 없앰
            }}
            onClick={() => setHabitName(habit.text)}
          >
            <p className="habit-text">{habit.text}</p>
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
