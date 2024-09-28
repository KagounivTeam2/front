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

  return (
    <div className="add-habit-container">
      <div className="add-habit-wrapper">
        <header className="header">
          <Link to="/my-habit" className="back-button">&lt;</Link>
          <h1 className="headline">습관 추가</h1>
        </header>

        <h2 className="sub-title">습관 이름 입력</h2>
        <input
          type="text"
          value={habitName}
          onChange={(e) => setHabitName(e.target.value)}
          placeholder="습관 이름을 입력하세요"
        />

        <h2 className="sub-title">시작 날짜</h2>
        <input
          type="date"
          value={startDate}
          onChange={handleStartDateChange}
          min={new Date().toISOString().split("T")[0]} // 오늘부터 선택 가능
        />

        <h2 className="sub-title">종료 날짜 (시작 날짜로부터 7일 이내)</h2>
        <input
          type="date"
          id="end-date"
          ref={endDateInputRef} // 종료 날짜 필드를 참조
          value={endDate}
          onChange={handleEndDateChange}
          max={new Date().toISOString().split("T")[6]} // 오늘부터 선택 가능
          disabled={!startDate} // 시작 날짜가 선택되지 않으면 비활성화
        />

        <button
          className="input-button"
          onClick={() => createHabit(habitName, theme, favoriteState)}
          disabled={!habitName || !startDate || !endDate}
        >
          습관 추가하기
        </button>

        {error && <p className="error-msg">{error}</p>}
      </div>
    </div>
  );
};

export default AddHabit;
