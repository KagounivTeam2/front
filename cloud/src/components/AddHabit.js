import React, { useState, useEffect } from "react"; // useEffect 추가
import "./AddHabit.css";
import { Link, useNavigate } from "react-router-dom";
import { baseAxios } from "../api/baseAxios";

const AddHabit = () => {
  const [habitName, setHabitName] = useState("");
  const [theme, setTheme] = useState("PINK"); // 기본 테마는 PINK로 설정
  const [favoriteState, setFavoriteState] = useState(true); // 기본 즐겨찾기 상태는 true로 설정
  const [error, setError] = useState(""); // 에러 메시지 상태
  const [recommendations, setRecommendations] = useState([]); // 추천 습관 상태
  const navigate = useNavigate();

  const validThemes = ["PINK", "BLUE", "PURPLE"]; // 유효한 테마 목록

  const handleBackButtonClick = () => {
    navigate("/"); // 시작 페이지로 이동
  };
  // 추천 습관 가져오기
  const fetchRecommendations = async () => {
    try {
      const response = await baseAxios.get("/api/habit/recommends");
      if (response.data.success) {
        const recommendList = response.data.responseDto.recommentList;
        setRecommendations(recommendList); // 추천 습관 목록 저장
      } else {
        setError(`추천 습관 가져오기 실패: ${response.data.error.message}`);
      }
    } catch (error) {
      console.error("추천 습관 가져오기 중 오류 발생", error);
      setError("추천 습관 가져오는 데 오류가 발생했습니다.");
    }
  };

  // POST 요청을 위한 함수
  const createHabit = async (habit, theme, favoriteState) => {
    const currentDate = new Date().toISOString().split("T")[0]; // 현재 날짜 ISO 형식

    // 필수 값 검증 (habitName, theme, favoriteState)
    if (
      !habit ||
      !validThemes.includes(theme) ||
      typeof favoriteState !== "boolean"
    ) {
      setError(
        "습관 이름, 유효한 테마, 그리고 즐겨찾기 상태를 입력해야 합니다."
      );
      return;
    }

    try {
      const response = await baseAxios.post("/api/habit/create", {
        habitName: habit,
        startAt: currentDate, // 시작 날짜
        endAt: currentDate, // 종료 날짜
        targetCount: 0, // 목표 횟수
        currentCount: 0, // 현재 횟수
        theme: theme, // 선택된 테마
        favoriteState: favoriteState, // 즐겨찾기 상태
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
    createHabit(habit, theme, favoriteState); // 선택한 습관을 등록
  };

  // 컴포넌트가 마운트될 때 추천 습관 가져오기
  useEffect(() => {
    fetchRecommendations();
  }, []);

  return (
    <div className="add-habit-container">
      <div className="add-habit-wrapper">


      <header className="header">
        <Link to="/my-habit" className="back-button">&lt;</Link>
        <h1 className="headline">습관 추가</h1>
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

      {/* 에러 메시지 출력 */}
      {error && <p className="error-msg">{error}</p>}
    </div>
    </div>
  );
};

export default AddHabit;
