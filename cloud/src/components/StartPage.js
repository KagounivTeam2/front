import React from "react";
import { Link } from "react-router-dom";
import styles from './StartPage.module.css';

function StartPage() {
  return (
      <div className={styles.startContainer}>  {/* className={styles.클래스명} */}
          <header className={styles.header}>
          </header>
          {/* 텍스트 부분 */}
      <div className={styles.contentWrapper}> {/* styles 객체로 클래스 사용 */}
          <p className={styles.introText}>
              좋은 습관을 설정하고, 매일 실천해보세요
              <br />작은 변화가 큰 성장을 만들어줄 거예요
          </p>
      </div>

      {/* 이미지 부분 */}
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
