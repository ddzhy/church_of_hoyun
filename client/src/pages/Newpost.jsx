// pages/NewPost.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NewPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setError('로그인이 필요합니다.');
      return;
    }
    try {
      const api = import.meta.env.VITE_API_URL;
      await axios.post(`${api}/posts`, { title, content }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate('/posts'); // 작성 후 목록으로 이동
    } catch (err) {
      setError(err.response?.data?.message || '글 작성에 실패했습니다.');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">게시글 작성</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
        <textarea
          placeholder="내용을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="w-full p-2 h-40 border border-gray-300 rounded resize-none"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          작성하기
        </button>
      </form>
    </div>
  );
};

export default NewPost;
