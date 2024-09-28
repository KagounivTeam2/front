import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './MyPage.css';
import Logout from './myPageComponent/Logout';
import DeleteAccount from './myPageComponent/DeleteAccount';

const MyPage = () => {
    const [showLogout, setShowLogout] = useState(false); 
    const [showDeleteAccount, setShowDeleteAccount] = useState(false); 

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
    <>
    <div className='mypage-container'>
        <Link to='/my-habit'>
            <img src={process.env.PUBLIC_URL + "img/icon/previous.png"} style={{cursor: 'pointer'}}/>
        </Link>
            <div>마이페이지</div>
            <div>계정 관리</div>
            <div  onClick={handleLogoutClick} style={{cursor: 'pointer'}}>로그아웃</div>
            <div onClick={handleDeleteAccountClick} style={{cursor: 'pointer'}}>회원탈퇴</div>
            {showLogout && <Logout onCancel={handleCancel} />}
            {showDeleteAccount && <DeleteAccount onCancel={handleDeleteCancel} />}
    </div>
    </>
  );
};

export default MyPage;
