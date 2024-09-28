import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./MyHabit.css";
import axios from "axios";
import { baseAxios } from "../api/baseAxios";

function MyHabit() {
  const [selectedTab, setSelectedTab] = useState("habit"); // 탭 상태 (나의 습관 or 통계)
  const [showAllHabits, setShowAllHabits] = useState(false); // 습관 전체보기 토글 상태
  const [habits, setHabits] = useState([]); // 습관 리스트
  const [selectedTheme, setSelectedTheme] = useState(0); // 테마 상태
  const [selectedHabit, setSelectedHabit] = useState(null); // 선택된 습관 정보
  const [isRaining, setIsRaining] = useState(false); // 비 내리는 상태
  const [plantStage, setPlantStage] = useState(0); // 식물 단계 상태
  const [completed, setCompleted] = useState(false); // 완료 상태
  const [statusText, setStatusText] = useState('진행중'); // 진행 상태 텍스트
  const [textVisible, setTextVisible] = useState(true); // 텍스트 가시성 상태
  const [buttonVisible, setButtonVisible] = useState(true); // 수행 완료 버튼의 가시성

  const [completionStatus, setCompletionStatus] = useState(""); // 수행 완료 상태 메시지
  const navigate = useNavigate();

  const [habitCount, setHabitCount] = useState(0);
  const [successCount, setSuccessCount] = useState(0); // 성공 횟수 상태

  // 현재 날짜 가져오기
  const today = new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' });



  //   // 습관 삭제 함수 (API 호출)
  // const deleteHabit = async (id) => {
  //   try {
  //     const response = await baseAxios.delete(`/api/habit/${habitid}`);

  //     if (response.data.success) {
  //       const updatedHabits = habits.filter((habit) => habit.id !== id);
  //       setHabits(updatedHabits);
  //       localStorage.setItem("habits", JSON.stringify(updatedHabits)); // 습관 리스트 업데이트
  //       setCompletionStatus("습관이 성공적으로 삭제되었습니다!"); // 성공 메시지
  //     } else {
  //       setCompletionStatus(`오류 발생: ${response.data.error.message}`);
  //     }
  //   } catch (error) {
  //     console.error("습관 삭제 중 오류가 발생했습니다:", error);
  //     setCompletionStatus("네트워크 오류가 발생했습니다.");
  //   }
  // };



  // 습관 수와 성공 횟수 가져오기
  const fetchHabitCount = async () => {
    try {
      const response = await baseAxios.get("/api/statistics/habit_count");
      setHabitCount(response.data.responseDto);
    } catch (error) {
      console.error("습관 수를 가져오는 데 오류가 발생했습니다:", error);
    }
  };

  const fetchSuccessCount = async () => {
    try {
      const response = await baseAxios.get("/api/statistics/complete_count");
      console.log(response.data.responseDto);
      setSuccessCount(response.data.responseDto);
    } catch (error) {
      console.error("성공 횟수를 가져오는 데 오류가 발생했습니다:", error);
    }
  };

  // 습관 리스트 가져오기
  const fetchHabits = async () => {
    try {
      const response = await baseAxios.get("/api/habit"); // 습관 리스트 가져오는 API 호출
      console.log(response.data.responseDto);
      setHabits(response.data.responseDto.userHabits); // API 응답을 상태에 저장
      console.log(response.data.responseDto.userHabits.length);
      if (response.data.responseDto.userHabits.length > 0) {
        setSelectedHabit(response.data.responseDto.userHabits[0]); // 첫 번째 습관을 기본 선택
      }
    } catch (error) {
      console.error("습관 리스트를 가져오는 데 오류가 발생했습니다:", error);
    }
  };

  useEffect(() => {
    fetchHabitCount(); // API 호출로 습관 수 가져오기
    fetchSuccessCount(); // 성공 횟수 가져오기
    fetchHabits(); // 습관 리스트 가져오기
  }, []);

  // 테마에 따라 배경과 구름 이미지를 변경
  const themeSettings = [
    { background: 'linear-gradient(to bottom, #79CCFF, #D5FCFF)', cloudImage: 'Day_cloud.png' }, // Day 테마
    { background: 'linear-gradient(to bottom, #FEA0B8, #FEE8D4)', cloudImage: 'Evening_cloud.png' }, // Evening 테마
    { background: 'linear-gradient(to bottom, #635FB8, #E2DAC7)', cloudImage: 'night_cloud.png' } // Night 테마
  ];


  // 습관 삭제 함수 (API 호출)
  const deleteHabit = async (id) => {
    try {
      const response = await baseAxios.delete(`/api/habit/${selectedHabit.id}`);

      if (response.data.success) {
        const updatedHabits = habits.filter((habit) => habit.id !== id);
        setHabits(updatedHabits);
        localStorage.setItem("habits", JSON.stringify(updatedHabits)); // 습관 리스트 업데이트
        setCompletionStatus("습관이 성공적으로 삭제되었습니다!"); // 성공 메시지
      } else {
        setCompletionStatus(`오류 발생: ${response.data.error.message}`);
      }
    } catch (error) {
      console.error("습관 삭제 중 오류가 발생했습니다:", error);
      setCompletionStatus("네트워크 오류가 발생했습니다.");
    }
  };

  // 습관 선택 시 테마와 정보를 변경하는 함수
  const handleHabitSelection = (habit) => {
    setSelectedHabit(habit);
    setSelectedTheme(habit.theme);
  };

  // 수행 완료 함수 (API 호출)
  const handleComplete = async () => {
    // if (!selectedHabit) return;

    setIsRaining(true);
    setButtonVisible(false); // 수행 완료 버튼 숨김
    setTextVisible(false); // 텍스트도 숨김

    setTimeout(() => {
      setIsRaining(false);
      setPlantStage(1);
      setTimeout(() => setPlantStage(2), 1000);
      setTimeout(() => setPlantStage(3), 2000);

      // 식물 애니메이션이 끝난 후 완료 체크 버튼으로 전환
      setTimeout(() => {
        setCompleted(true);
        setStatusText('달성 완료'); // 텍스트를 달성 완료로 변경
        setTextVisible(true); // 텍스트 다시 보이게 설정
      }, 3000);
    }, 2000);

    try {
      const response = await baseAxios.post(
          `/api/habit/done/${selectedHabit.id}`
      );

      if (response.data.success) {
        setCompletionStatus("습관이 성공적으로 완료되었습니다!");
        navigate("/"); // 메인 페이지로 리디렉션
      } else {
        setCompletionStatus(`오류 발생: ${response.data.error.message}`);
      }
    } catch (error) {
      setCompletionStatus("네트워크 오류가 발생했습니다.");
    }

  };



  return (
    <div
      className="my-habit-container"
      style={{ background: themeSettings[selectedTheme].background }} // 배경 그라데이션 변경
    >
      {/* 상단 헤더 */}
      <header className="header">
        <Link to="/" className="back-button">
          &lt; 로고
        </Link>
      </header>

      {/* 탭 메뉴 */}
      <div className="tab-menu">
        <div
          className={`tab-item ${selectedTab === "habit" ? "active" : ""}`}
          onClick={() => setSelectedTab("habit")}
        >
          나의 습관
        </div>
        <div
          className={`tab-item ${selectedTab === "stats" ? "active" : ""}`}
          onClick={() => setSelectedTab("stats")}
        >
          통계
        </div>
      </div>

      {/* 나의 습관 탭 내용 */}
      {selectedTab === "habit" && (
        <>
          {/* 습관 추가 및 전체 보기 */}
          <div className="habit-actions">
            <Link to="/add-habit" className="add-habit-button">
              + 습관 추가
            </Link>
            <button
              onClick={() => setShowAllHabits(!showAllHabits)}
              className="toggle-habits-button"
            >
              {showAllHabits ? "습관 숨기기" : "습관 전체보기 ▼"}
            </button>
          </div>

          {/* 습관 타이틀과 기간 */}
          {selectedHabit && (
            <div className="habit-info">
              <h2 className="habit-title-left">{selectedHabit.habitName}</h2>
              <p className="habit-dates-left">
                {selectedHabit.startAt} ~ {selectedHabit.endAt}
              </p>
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
          <div className={`complete-status ${textVisible ? '' : 'hidden'}`}>
            {`${today} ${statusText}`}
          </div>

          {/* 습관 리스트 (토글로 열리는 부분) */}
          {showAllHabits && (
            <div className="habit-list">
              {habits.map((habit) => (
                <div key={habit.id} className="habit-item">
                  <button
                    onClick={() => handleHabitSelection(habit)}
                    className={`habit-button ${
                      selectedHabit?.id === habit.id ? "selected" : ""
                    }`}
                  >
                    {habit.title}
                  </button>
                  <div className="habit-dates">
                    {habit.startDate} ~ {habit.endDate}
                  </div>
                  <button
                    onClick={() => deleteHabit(habit.id)}
                    className="delete-habit-button"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          )}



          {/* 현재 날짜와 상태 텍스트 */}
          <div className="complete-status">
            {new Date().toLocaleDateString()} 진행중
          </div>
        </>
      )}

      {/* 통계 탭 내용 */}
      {selectedTab === "stats" && (
        <>
          <h2 className="stat-title">나의 구름</h2>
          <div className="stat-cloud-box">
            <div className="stat-cloud-info">
              <p className="stat-cloud-text">모은 구름</p>
              <p className="stat-cloud-count">{habitCount}개</p>
              <p className="stat-period-left">
                {selectedHabit?.startDate} ~ {selectedHabit?.endDate}
              </p>
            </div>
            <img
              src="/img/State_img.png"
              alt="Cloud"
              className="stat-cloud-image"
            />
          </div>

          <h2 className="stat-subtitle">나의 성공</h2>
          <div className="stat-success-box">
            <div className="stat-success-info">
              <p className="stat-success-text">나의 성공 횟수</p>
              <p className="stat-success-count">{successCount}회</p>
              <p className="stat-period-left">
                {selectedHabit?.startDate} ~ {selectedHabit?.endDate}
              </p>
            </div>
            <img src="/img/State_img2.png" alt="Cloud" className="stat-cloud-image" />
          </div>

          <div className="stat-success-box">
            <div className="stat-success-info">
              <p className="stat-success-text">나의 성공 확률</p>
              <p className="stat-success-percent">78%</p>
              <p className="stat-period-left">
                {selectedHabit?.startDate} ~ {selectedHabit?.endDate}
              </p>
            </div>
            <div className="stat-bar"></div>
          </div>
        </>
      )}
    </div>
  );
}

export default MyHabit;
