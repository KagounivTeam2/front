import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css'
const Logout = ({ onCancel }) => {
    const navigate = useNavigate();
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
  
    return (
        <div className='logout-container'>
            <div>정말 로그아웃 하시겠어요?</div>
            <p className='cancel'style={{ cursor: 'pointer' }} onClick={onCancel}>취소</p>
            <p className='logout'style={{cursor: 'pointer' }} onClick={handleLogout}>로그아웃</p>
        </div>
    );
};

export default Logout;