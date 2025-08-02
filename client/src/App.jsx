// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Mypage from './pages/MyPage';
import MemberList from './pages/MemberList';
import NewPost from './pages/Newpost';
import PostList from './pages/PostList';

const App = () => (
  <Router>
    <div className="min-h-screen bg-gray-400">
      <Header />
      <main className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/members" element={<MemberList />} />
          <Route path="/posts/new" element={<NewPost />} />
          <Route path="/posts" element={<PostList />} />
        </Routes>
      </main>
    </div>
  </Router>
);

export default App;
