import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StartPage from './components/StartPage';
import Login from './components/Login';
import Signup from './components/Signup';
import AddHabit from './components/AddHabit';
import CreateNewHabit from './components/CreateNewHabit';
import Home from './components/Home';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/add-habit" element={<AddHabit />} />
        <Route path="/create-Habit" element={<CreateNewHabit />} />
        <Route path="/home" element={<Home/>} />
        {/* 다른 경로 추가 가능 */}
      </Routes>
    </Router>
  );
}

export default App;
