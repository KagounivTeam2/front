import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DeleteAccount = ({ onCancel }) => {
    const navigate = useNavigate();
    const [error,setError]=useState('');
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
        <div className='delete-container'>
            <div>정말 탈퇴 하시겠습니까??</div>
            <div className='text2'>회원 탈퇴 시 개인정보 및 습관 진행도는 모두 초기화되어 복구할 수 없어요.</div>
            <p className='cancel2'style={{ cursor: 'pointer' }}  onClick={onCancel}>취소</p>
            <p className='logout2'style={{cursor: 'pointer' }} onClick={handleDeleteAccount}>회원탈퇴</p>
        </div>
    );
};

export default DeleteAccount;

