import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from './StartPage.module.css';
import CloudBackground from './CloudBackground';  // 구름 컴포넌트 추가

function StartPage() {
  const [background, setBackground] = useState('');

  // 시간에 따른 배경색 설정 함수
  const setTimeBasedBackground = () => {
    const currentHour = new Date().getHours(); // 현재 시간 가져오기

    if (currentHour >= 6 && currentHour < 15) {
      // 06:00 ~ 15:00
      setBackground('linear-gradient(to bottom, #FEA0B8, #FEE8D4)'); // Day 테마
    } else if (currentHour >= 15 && currentHour < 20) {
      // 15:00 ~ 20:00
      setBackground('linear-gradient(to bottom, #79CCFF, #D5FCFF)'); // Evening 테마
    } else {
      // 20:00 ~ 06:00
      setBackground('linear-gradient(to bottom, #635FB8, #E2DAC7)'); // Night 테마
    }
  };
  
  useEffect(() => {
    // 컴포넌트 마운트 시 배경색 설정
    setTimeBasedBackground();

    // 매 분마다 배경색을 업데이트하는 타이머 설정
    const timer = setInterval(setTimeBasedBackground, 1000 * 60);

    // 컴포넌트 언마운트 시 타이머 정리
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.startContainer} style={{ background }}>  
      <CloudBackground />  {/* 구름 컴포넌트 추가 */}
      
      {/* 헤더에 로고 이미지 추가 */}
      <header className={styles.header}>
        <img src="/img/Header_img.png" alt="Logo" className={styles.logoHeader} />
      </header>
      
      {/* 텍스트 부분 */}
      <div className={styles.contentWrapper}>
        <p className={styles.introText}>
          좋은 습관을 설정하고, 매일 실천해보세요
          <br />작은 변화가 큰 성장을 만들어줄 거예요
        </p>
      </div>

      {/* 메인 로고 이미지 */}
      <img src="/img/start_2.png" alt="Logo" className={styles.logoImage} />

      <div className={styles.buttons}>
        <Link to="/my-habit">
          <button className={styles.habitBtn}>나의 습관</button>
        </Link>
        <Link to="/add-habit">
          <button className={styles.habitBtn}>습관 추가</button>
        </Link>
      </div>
    </div>
  );
}

export default StartPage;
