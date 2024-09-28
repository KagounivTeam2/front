import React, { useEffect, useState } from 'react';
import styles from './Signup.module.css'; // CSS 모듈 사용
import { useNavigate } from 'react-router-dom';
import CloudBackground from './CloudBackground'; // 구름 컴포넌트 불러오기
import { baseAxios } from "../api/baseAxios";

function Signup() {
    const [loginId, setLoginId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

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

            const data = response.data; // axios는 기본적으로 JSON 데이터를 파싱하여 제공합니다.

            if (response.status === 409) {
                setError('이미 존재하는 아이디입니다.');
                setSuccess('');
                return;
            }

            if (data.success) {
                navigate('/login');
                setSuccess(data.responseDto || '회원가입이 완료되었습니다!');
                setError('');
            } else {
                setError('아이디 또는 비밀번호를 다시 설정해주세요.');
                setSuccess('');
            }
        } catch (error) {
            console.error('회원가입 요청 실패:', error);
            if (error.response) {
                setError(error.response.data.message || '회원가입 중 오류가 발생했습니다.');
            } else if (error.request) {
                setError('네트워크 오류가 발생했습니다.');
            } else {
                setError('회원가입 중 오류가 발생했습니다.');
            }
            setSuccess('');
        }
    };

    return (
        <div className={styles.signupContainer}>
            <img src={process.env.PUBLIC_URL + "/img/Logo_img.png"} alt="Logo" className={styles.logoImage} />
            <CloudBackground /> {/* 구름 배경 추가 */}

            {/* 경고 문구를 아이디 입력 박스 위에 표시 */}
            {error && (
                <div id={styles.errorMsgContainer}>
                    <p id={styles.errorMsg}>
                        <img src={process.env.PUBLIC_URL + "/img/icon/warning-triangle.png"} alt="Warning" />
                        <span>{error}</span>
                    </p>
                </div>
            )}

            <div className={styles.idContainer}>
                <input
                    type="text"
                    placeholder="아이디를 입력해주세요."
                    value={loginId}
                    onChange={(e) => setLoginId(e.target.value)}
                    maxLength={15}
                    className={styles.inputField1}
                />
                <div className={styles.charCountSignup}>{loginId.length}/15</div>
                <div className={styles.idInfo}>영문/숫자 중에서 6글자 이상 작성해주세요.</div>
            </div>

            <div className={styles.passwordContainer}>
                <input
                    type="password"
                    placeholder="비밀번호를 입력해주세요."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    maxLength={20}
                    className={styles.inputField2}
                />
                <div className={styles.charCountSignup}>{password.length}/20</div>
                <div className={styles.passwordInfo}>영문/숫자/특수문자 중에서 8글자 이상 작성해주세요.</div>
            </div>

            <button onClick={handleSignup} className={styles.signupButton}>계정 만들기</button>
        </div>
    );
}

export default Signup;
