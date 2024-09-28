import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './MyPage.css';
import Logout from './myPageComponent/Logout';
import DeleteAccount from './myPageComponent/DeleteAccount';

const MyPage = () => {
    const [showLogout, setShowLogout] = useState(false); 
    const [showDeleteAccount, setShowDeleteAccount] = useState(false); 
    const navigate = useNavigate();
    const handleLogoutClick = () => {
      setShowLogout(!showLogout); 
      setShowDeleteAccount(false);
    };

    const handleDeleteAccountClick = () => {
        setShowDeleteAccount(!showDeleteAccount); 
        setShowLogout(false); 
      };
   
      const handleCancel = () => {
        setShowLogout(false); // 취소를 누르면 로그아웃 창을 닫음
      };
  
      const handleDeleteCancel = () => {
        setShowDeleteAccount(false); // 취소를 누르면 회원탈퇴 창을 닫음
      };

  return (
    <div className='mypage-container'>
      <div className='mypage-wrapper'>
        <div className='mypage-header'>
          <div>
           <img src="img/icon/previous.png" onClick={() => navigate(-1)}/>
          </div>
          <div style={{ fontSize: '17px' }}>마이페이지</div>
          <div className='dummy'/>
        </div>
        <div className="mypage-content-container">
          <div>계정 관리</div>
          <div className='mypage-button-container'>
            <div className='mypage-button' onClick={handleLogoutClick} style={{cursor: 'pointer'}}>로그아웃</div>
            <div className='mypage-button' onClick={handleDeleteAccountClick} style={{cursor: 'pointer'}}>회원탈퇴</div>
            {showLogout && <Logout onCancel={handleCancel} />}
            {showDeleteAccount && <DeleteAccount onCancel={handleDeleteCancel} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;