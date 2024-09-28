import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MyPage.css';

const MyPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  //로그아웃 로직
  const handleLogout = async () => {
    try {
      const response = await fetch('http://44.219.236.123:8080/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` 
        }
      });

      if (response.ok) {
        
        localStorage.removeItem('token');
        navigate('/login'); 
      } else {
        console.error('로그아웃 중 오류 발생');
      }
    } catch (error) {
      console.error('로그아웃 중 네트워크 오류:', error);
    }
  };

  // 회원탈퇴 로직
  const handleDeleteAccount = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/delete', { 
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.removeItem('token');
        alert('계정이 성공적으로 삭제되었습니다.');
        navigate('/login'); // 탈퇴 후 로그인 페이지로 이동
      } else if (data.error) {
        
        setError(data.error.message || '회원탈퇴 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('회원탈퇴 중 네트워크 오류:', error);
      setError('네트워크 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <>
        <div className='title-container'> 
            
        </div>
        <div className='mypage-container'>
            <img src={process.env.PUBLIC_URL + "img/icon/previous.png"} />
            <p>마이페이지</p>
            <div>계정 관리</div>
            <div onClick={handleLogout} style={{ cursor: 'pointer' }}>로그아웃</div>
            <div onClick={handleDeleteAccount} style={{ cursor: 'pointer', color: 'red' }}>회원탈퇴</div>
            {error && <p className="error-msg">{error}</p>}
        </div>
    </>
  );
};

export default MyPage;