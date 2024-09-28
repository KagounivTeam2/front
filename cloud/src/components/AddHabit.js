import React, { useState, useEffect, useRef } from "react";
import "./AddHabit.css";
import { Link, useNavigate } from "react-router-dom";
import { baseAxios } from "../api/baseAxios";

const AddHabit = () => {
  const [habitName, setHabitName] = useState("");
  const [theme, setTheme] = useState("PINK");
  const [favoriteState, setFavoriteState] = useState(true);
  const [error, setError] = useState("");
  const [startDate, setStartDate] = useState(""); // 시작 날짜
  const [endDate, setEndDate] = useState(""); // 종료 날짜
  const navigate = useNavigate();
  const endDateInputRef = useRef(null); // 종료 날짜 필드를 참조

  // 시작 날짜 변경 시 종료 날짜 선택을 7일 이내로 제한
  const handleStartDateChange = (e) => {
    const selectedStartDate = e.target.value;
    setStartDate(selectedStartDate);

    // 시작 날짜로부터 7일 후의 날짜 계산
    const maxEndDate = new Date(selectedStartDate);
    maxEndDate.setDate(maxEndDate.getDate() + 7);
    const maxEndDateString = maxEndDate.toISOString().split("T")[0];

    // 종료 날짜 필드의 min과 max 값을 설정
    if (endDateInputRef.current) {
      endDateInputRef.current.min = selectedStartDate; // 최소값은 시작 날짜
      endDateInputRef.current.max = maxEndDateString; // 최대값은 시작 날짜 + 7일
    }

    setEndDate(""); // 종료 날짜 초기화
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const createHabit = async (habit, theme, favoriteState) => {
    const currentDate = new Date().toISOString().split("T")[0];

    // 필수 값 검증
    if (!habit || !startDate || !endDate) {
      setError("모든 필드를 입력해야 합니다.");
      return;
    }

    try {
      const response = await baseAxios.post("/api/habit/create", {
        habitName: habit,
        startAt: startDate,
        endAt: endDate,
        targetCount: 0,
        currentCount: 0,
        theme: theme,
        favoriteState: favoriteState,
      });

      if (response.data.success) {
        alert("습관이 성공적으로 등록되었습니다.");
        setHabitName(""); // 입력 필드 초기화
        navigate("/my-habit"); // 마이 페이지로 이동
      } else {
        alert(`에러 발생: ${response.data.error.message}`);
      }
    } catch (error) {
      console.error("API 요청 중 오류 발생", error);
      alert("습관 등록 중 오류가 발생했습니다.");
    }
  };

  const handleDirectInputClick = () => {
    setHabitName(""); // 습관 이름 초기화
    navigate("/create-habit"); // 직접 입력 페이지로 이동
  };

  const handleHabitClick = (habit) => {
    setHabitName(habit);
    navigate(`/create-habit/${habit}`);
  };

  // 컴포넌트가 마운트될 때 추천 습관 가져오기
  useEffect(() => {
    fetchRecommendations();
  }, []);

  return (
    <div className="add-habit-container">
      <div className="add-habit-wrapper">
      <header className="add-habit-header">
      <img src="img/icon/back.png" alt="뒤로 가기 버튼" className="back-button-image" onClick={() => navigate("/my-habit")}/>
        <h1 className="headline">습관 추가</h1>
        <img src="img/icon/mypage_logo_x3.png" alt="마이페이지 아이콘" className="mypage-icon" onClick={() => navigate("/mypage")}/>
      </header>

      <h2 className="sub-title">즐겨찾는 습관</h2>
      <div className="favorite-habit-box">
        {recommendations.length !== 0 && recommendations.slice(0, 3).map(
          (
            habit,
            index // 첫 3개 추천 습관 표시
          ) => (
            <div
              key={index}
              className="habit-box"
              onClick={() => handleHabitClick(habit.recommentName)}
            >
              {habit.recommentName}
            </div>
          )
        )}
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
            onClick={() => handleHabitClick(habit.text)}
          >
            <p className="habit-text">{habit.text}</p>
          </div>
        ))}
      </div>

      <h2 className="sub-title">이런것도 있어요~</h2>
      <div className="favorite-habit-box">
        {recommendations.slice(3, 6).map(
          (
            habit,
            index // 다음 3개 추천 습관 표시
          ) => (
            <div
              key={index}
              className="habit-box square-box"
              onClick={() => handleHabitClick(habit.recommentName)}
            >
              {habit.recommentName}
            </div>
          )
        )}
      </div>

      <button className="input-button" onClick={handleDirectInputClick}>
        직접 입력
      </button>

        {error && <p className="error-msg">{error}</p>}
      </div>
    </div>
  );
};

export default AddHabit;
