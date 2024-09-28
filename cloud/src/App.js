import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StartPage from './components/StartPage';
import Login from './components/Login';
import Signup from './components/Signup';
import AddHabit from './components/AddHabit';
import CreateNewHabit from './components/CreateNewHabit';
import Home from './components/Home';
import MyHabit from './components/MyHabit';
import MyPage from './components/MyPage';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<StartPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/add-habit" element={<AddHabit />} />
        <Route path="/create-habit" element={<CreateNewHabit />} />
        <Route path="/my-habit" element={<MyHabit />} />
        <Route path="/mypage" element={<MyPage />} />

        {/* 다른 경로 추가 가능 */}
      </Routes>
    </Router>
  );
}

export default App;
