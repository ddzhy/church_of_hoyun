// pages/MemberList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MemberList = () => {
  const [members, setMembers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const api = import.meta.env.VITE_API_URL;
        const res = await axios.get(`${api}/members`);
        setMembers(res.data);
      } catch (err) {
        setError('신자 목록을 불러올 수 없습니다.');
      }
    };
    fetchMembers();
  }, []);

  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">신자 목록</h2>
      <ul className="space-y-2">
        {members.map((member) => (
          <li key={member._id} className="border p-3 rounded">
            <p><strong>이름:</strong> {member.name}</p>
            <p><strong>이메일:</strong> {member.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MemberList;
