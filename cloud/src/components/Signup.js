import React, { useEffect, useState } from 'react';
import './Signup.css';
import { useNavigate } from 'react-router-dom';


function Signup() {

  const [background, setBackground] = useState('');
  const [loginId, setLoginId] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); 
  const [isIdAvailable, setIsIdAvailable] = useState(false); 
  const navigation=useNavigate();
  
  // 시간에 따른 배경색 설정 함수
  const setTimeBasedBackground = () => {
    const currentHour = new Date().getHours(); 

    if (currentHour >= 9 && currentHour < 15) {
      // 09:00 ~ 15:00
      setBackground('linear-gradient(to bottom, #FEA0B8, #FEE8D4)'); 
    } else if (currentHour >= 15 && currentHour < 20) {
      // 15:00 ~ 20:00
      setBackground('linear-gradient(to bottom, #79CCFF, #D5FCFF)');
    } else {
      // 20:00 ~ 06:00
      setBackground('linear-gradient(to bottom, #635FB8, #E2DAC7)');
    }
  };

  useEffect(() => {
    setTimeBasedBackground();

    const timer = setInterval(setTimeBasedBackground, 1000 * 60);

    return () => clearInterval(timer);
  }, []);

  
  const handleSignup = async () => {
    if (!loginId || !password) {
      setError('아이디와 비밀번호를 입력해주세요');
      setSuccess(''); 
      return;
    }

    try {
      // 회원가입 API 요청 보내기
      const response = await fetch('http://44.219.236.123:8080/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ loginId, password }),
      });

      const data = await response.json();

      if (response.status === 409) {
        setError('이미 존재하는 아이디입니다.');
        setSuccess('');
        return;
      }

      if (data.success) {
        navigation('/login')
        setSuccess(data.responseDto || '회원가입이 완료되었습니다!');
        setError('');
      } 
      // 응답이 성공하지 않았을 때 오류 메시지 처리
      else {
        setError('아이디 또는 비밀번호를 다시 설정해주세요.');
        setSuccess('');
      }
    } catch (error) {
      // 네트워크 오류 처리
      setError('네트워크 오류가 발생했습니다.');
      setSuccess('');
    }
  };


  return (
    // <div className="signup-container" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/img/background/background_blue.png)` }}>
      <div className="signup-container" style={{background}}>
      <div className='id-container'>
        <input
          type="text"
          placeholder="아이디를 입력해주세요."
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
          maxLength={15}
          className="input-field1"
        />
        <div>{loginId.length}/15</div>
      </div>
      <div id='id'>영문/숫자 중에서 6글자 이상 작성해주세요.</div>
      
      <div className='password-container'>
        <input
          type="password"
          placeholder="비밀번호를 입력해주세요. "
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          maxLength={20}
          className="input-field2"
        />
        <div>{password.length}/20</div>
      </div>
      <div id='pd'>영문/숫자/특수문자 중에서 8글자 이상 작성해주세요.</div>
      
      {error && 
      <p className="error-msg">
        <img src={process.env.PUBLIC_URL + "img/icon/warning-triangle.png"} />
          <span>{error}</span>
      </p>}
      {/* {success && <p className="success-msg">
        
        {success}</p>} */}
      <button onClick={handleSignup} className="signup-button">계정 만들기</button>
      
    </div>
  );
}

export default Signup;
