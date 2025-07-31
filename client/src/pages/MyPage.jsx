// pages/Mypage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Mypage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError('로그인이 필요합니다.');
        return;
      }
      try {
        const api = import.meta.env.VITE_API_URL;
        const res = await axios.get(`${api}/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
      } catch (err) {
        setError('사용자 정보를 불러올 수 없습니다.');
      }
    };

    fetchUser();
  }, []);

  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;
  if (!user) return <div className="text-center mt-10">불러오는 중...</div>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">마이페이지</h2>
      <p><strong>이름:</strong> {user.name}</p>
      <p><strong>이메일:</strong> {user.email}</p>
    </div>
  );
};

export default Mypage;
