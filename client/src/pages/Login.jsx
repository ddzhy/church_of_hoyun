// pages/Login.jsx
import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const api = import.meta.env.VITE_API_URL;
      const result = await axios.post(`${api}/login`, { email, password });
      if (result.data.token) {
        localStorage.setItem("token", result.data.token);
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || '로그인 실패');
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">로그인</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="relative">
            <input
              type="email"
              id="email"
              required
              placeholder=" "
              onChange={(e) => setEmail(e.target.value)}
              className="peer w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none pt-6 pb-1 bg-transparent"
            />
            <label
              htmlFor="email"
              className="absolute left-0 top-1 text-gray-500 text-sm transition-all
                peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500"
            >
              이메일
            </label>
          </div>

          <div className="relative">
            <input
              type="password"
              id="password"
              required
              placeholder=" "
              onChange={(e) => setPassword(e.target.value)}
              className="peer w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none pt-6 pb-1 bg-transparent"
            />
            <label
              htmlFor="password"
              className="absolute left-0 top-1 text-gray-500 text-sm transition-all
                peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500"
            >
              비밀번호
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            로그인하기
          </button>
          <Link to="/signup" className="text-blue-500 hover:underline">계정이 없으신가요? 회원가입하기</Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
