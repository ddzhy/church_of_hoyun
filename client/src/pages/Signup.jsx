// pages/Signup.jsx
import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault()
    const api = import.meta.env.VITE_API_URL;
    axios.post(`${api}/register`, {name, email, password})
    .then(result => {console.log(result)
      navigate('/login');
    })
    .catch(err => console.log(err));
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">회원가입</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="relative">
            <input
              type="name"
              id="name"
              required
              placeholder=" "
              onChange={(e) => setName(e.target.value)}
              className="peer w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none pt-6 pb-1 bg-transparent"
            />
            <label
              htmlFor="name"
              className="absolute left-0 top-1 text-gray-500 text-sm transition-all
                peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500"
            >
              이름
            </label>
          </div>
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
            가입하기
          </button>
          <Link to="/login" className="text-blue-500 hover:underline">이미 계정이 있으신가요? 로그인하기</Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
