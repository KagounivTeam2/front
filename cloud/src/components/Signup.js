import React, { useEffect, useState } from 'react';
import './Signup.css';
import { useNavigate } from 'react-router-dom';
import CloudBackground from './CloudBackground'; // 구름 컴포넌트 불러오기

function Signup() {
  const [background, setBackground] = useState('');
  const [loginId, setLoginId] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); 
  const navigation = useNavigate();

  // 시간에 따른 배경색 설정 함수
  const setTimeBasedBackground = () => {
    const currentHour = new Date().getHours(); 

    if (currentHour >= 9 && currentHour < 15) {
      setBackground('linear-gradient(to bottom, #FEA0B8, #FEE8D4)'); 
    } else if (currentHour >= 15 && currentHour < 20) {
      setBackground('linear-gradient(to bottom, #79CCFF, #D5FCFF)');
    } else {
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
      const response = await fetch('http://44.219.236.123:8080/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ loginId, password }),
      });

      const data = await response.json();
      if (response.status === 409) {
        setError('이미 존재하는 아이디입니다.');
        setSuccess('');
        return;
      }

      if (data.success) {
        navigation('/login');
        setSuccess(data.responseDto || '회원가입이 완료되었습니다!');
        setError('');
      } else {
        setError('아이디 또는 비밀번호를 다시 설정해주세요.');
        setSuccess('');
      }
    } catch (error) {
      setError('네트워크 오류가 발생했습니다.');
      setSuccess('');
    }
  };

  return (
    <div className="signup-container" style={{ background }}>
      <img src={process.env.PUBLIC_URL + "/img/Logo_img.png"} alt="Logo" className="logo-image" />
      {/* 구름 배경 추가 */}
      <CloudBackground />

      {/* 경고 문구를 아이디 입력 박스 위에 표시 */}
      <div id="error-msg-container">
        {error && (
          <p id="error-msg">
            <img src={process.env.PUBLIC_URL + "/img/icon/warning-triangle.png"} alt="Warning" />
            <span>{error}</span>
          </p>
        )}
      </div>

      <div className='id-container'>
        <input
          type="text"
          placeholder="아이디를 입력해주세요."
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
          maxLength={15}
          className="input-field1"
        />
        <div className="char-count-singnup">{loginId.length}/15</div>
        <div id='id'>영문/숫자 중에서 6글자 이상 작성해주세요.</div>
      </div>

      <div className='password-container'>
        <input
          type="password"
          placeholder="비밀번호를 입력해주세요."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          maxLength={20}
          className="input-field2"
        />
        <div className="char-count-singnup">{password.length}/20</div>
        <div id='pd'>영문/숫자/특수문자 중에서 8글자 이상 작성해주세요.</div>
      </div>

      <button onClick={handleSignup} className="signup-button">계정 만들기</button>
=======
import {baseAxios} from "../api/baseAxios";
function Signup() {
    const [background, setBackground] = useState('');
    const [loginId, setLoginId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigation=useNavigate();

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

    const handleSignup = async () => {
        if (!loginId || !password) {
            setError('아이디와 비밀번호를 입력해주세요');
            setSuccess('');
            return;
        }

        try {

            // 회원가입 API 요청 보내기 (axios 사용)
            const response = await baseAxios.post('/api/auth', {
                loginId,
                password
            });

            // 응답 데이터 추출
            const data = response.data; // axios는 기본적으로 JSON 데이터를 파싱하여 제공합니다.

            if (response.status === 409) {
                setError('이미 존재하는 아이디입니다.');
                setSuccess('');
                return;
            }

            if (data.success) {
                navigation('/login')
                setSuccess(data.responseDto || '회원가입이 완료되었습니다!');
                setError('');
            } else {
                setError('아이디 또는 비밀번호를 다시 설정해주세요.');
                setSuccess('');
            }
        } catch (error) {
            // 네트워크 오류 또는 서버 오류 처리
            console.error('회원가입 요청 실패:', error);
            if (error.response) {
                // 서버에서 에러 응답을 받은 경우 (예: 400, 500 등)
                setError(error.response.data.message || '회원가입 중 오류가 발생했습니다.');
            } else if (error.request) {
                // 요청을 보냈지만 응답을 받지 못한 경우 (네트워크 오류)
                setError('네트워크 오류가 발생했습니다.');
            } else {
                // 기타 에러
                setError('회원가입 중 오류가 발생했습니다.');
            }
            setSuccess('');
        }
    };


    useEffect(() => {
        setTimeBasedBackground();

        const timer = setInterval(setTimeBasedBackground, 1000 * 60);

        return () => clearInterval(timer);
    }, []);

  return (
    <div className="signup-container">
      <img src={process.env.PUBLIC_URL + "/img/Logo_img.png"} alt="Logo" className="logo-image" />
      {/* 구름 배경 추가 */}
      <CloudBackground />
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
          placeholder="비밀번호를 입력해주세요."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          maxLength={20}
          className="input-field2"
        />
        <div className="char-count-singnup">{password.length}/20</div>
        <div id='pd'>영문/숫자/특수문자 중에서 8글자 이상 작성해주세요.</div>
      </div>

      <div id="error-msg-container">
        {error && (
          <p id="error-msg">
            <img src={process.env.PUBLIC_URL + "/img/icon/warning-triangle.png"} alt="Warning" />
            <span>{error}</span>
          </p>
        )}
      </div>

      <button onClick={handleSignup} className="signup-button">계정 만들기</button>
    </div>
  );
}

export default Signup;