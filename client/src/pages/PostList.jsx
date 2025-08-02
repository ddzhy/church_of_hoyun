// pages/PostList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const api = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${api}/posts`);
        setPosts(res.data);
      } catch (err) {
        console.error('글 목록 불러오기 실패:', err);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">게시판</h2>
        <Link to="/posts/new" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          글쓰기
        </Link>
      </div>
      {posts.length === 0 ? (
        <p className="text-center text-gray-500">게시글이 없습니다.</p>
      ) : (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post._id} className="border p-4 rounded">
              <h3 className="text-lg font-semibold">{post.title}</h3>
              <p className="text-gray-700">{post.content}</p>
              <p className="text-sm text-gray-500 mt-2">
                작성자: {post.author?.name || '알 수 없음'} | {new Date(post.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PostList;
