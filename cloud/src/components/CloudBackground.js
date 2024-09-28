import React, { useEffect, useState } from 'react';
import './CloudBackground.css'; // 구름 애니메이션 관련 CSS 파일

const CloudBackground = () => {
  const [background, setBackground] = useState('Day_cloud_img.png'); // 기본 낮 테마 구름 설정

  // 시간에 따른 구름 이미지 설정 함수
  const setTimeBasedClouds = () => {
    const currentHour = new Date().getHours();

    if (currentHour >= 9 && currentHour < 15) {
      setBackground('Day_cloud_img.png');  // 낮 구름
    } else if (currentHour >= 15 && currentHour < 20) {
      setBackground('Evening_cloud_img.png');  // 저녁 구름
    } else {
      setBackground('Night_cloud_img.png');  // 밤 구름
    }
  };

  useEffect(() => {
    setTimeBasedClouds(); // 처음 컴포넌트가 마운트될 때 구름을 설정

    const timer = setInterval(setTimeBasedClouds, 1000 * 60); // 1분마다 시간에 맞는 구름으로 업데이트
    return () => clearInterval(timer); // 컴포넌트 언마운트 시 타이머 제거
  }, []);

  return (
    <div className="cloud-container">
      {/* 각 구름에 시간대에 맞는 배경 이미지 설정 */}
      <div className="cloud" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/img/${background})` }}></div>
      <div className="cloud" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/img/${background})` }}></div>
      <div className="cloud" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/img/${background})` }}></div>
      <div className="cloud" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/img/${background})` }}></div>
    </div>
  );
};

export default CloudBackground;
