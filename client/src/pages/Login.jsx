import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Eye, EyeOff } from 'lucide-react'; // 아이콘 추가

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const api = import.meta.env.VITE_API_URL;
    try {
      const result = await axios.post(`${api}/login`, { email, password });
      if (result.data.token) {
        localStorage.setItem("token", result.data.token);
        navigate('/');
      }
    } catch (err) {
      alert(err.response?.data?.message || '로그인 실패');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">로그인</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* 이메일 입력 */}
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

          {/* 비밀번호 입력 + 아이콘 */}
          <div className="relative">
            <input
              type={showPwd ? 'text' : 'password'}
              id="password"
              required
              placeholder=" "
              onChange={(e) => setPassword(e.target.value)}
              className="peer w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none pt-6 pb-1 bg-transparent pr-10"
            />
            <label
              htmlFor="password"
              className="absolute left-0 top-1 text-gray-500 text-sm transition-all
                peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500"
            >
              비밀번호
            </label>
            <button
              type="button"
              onClick={() => setShowPwd(!showPwd)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showPwd ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
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
