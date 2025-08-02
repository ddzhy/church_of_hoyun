// components/Header.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="bg-gray-600 shadow-md p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">
        <img src={logo} alt="로고" className="w-35" />
      </Link>
      <nav className="space-x-4">
        {token ? (
          <>
            <Link to="/mypage" className="text-blue-200 hover:underline">마이페이지</Link>
            <Link to="/members" className="text-blue-200 hover:underline">신자목록</Link>
            <Link to="/posts" className="text-blue-200 hover:underline">게시판</Link>
            <button onClick={handleLogout} className="text-red-300 hover:underline">로그아웃</button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-blue-200 hover:underline">로그인</Link>
            <Link to="/signup" className="text-blue-200 hover:underline">회원가입</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;

