import React, { useEffect, useState } from 'react';
import './Signup.css';
import { useNavigate } from 'react-router-dom';
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

      <button onClick={handleSignup} className="signup-button">계정 만들기</button>

    </div>
  );
}

export default Signup;
