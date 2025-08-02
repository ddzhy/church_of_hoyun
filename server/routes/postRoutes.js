// routes/postRoutes.js
const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'No token' });
  const token = authHeader.split(' ')[1];
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

// 게시글 작성
router.post('/', verifyToken, async (req, res) => {
  try {
    const post = await Post.create({
      title: req.body.title,
      content: req.body.content,
      author: req.user.id
    });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: '글 작성 실패', error: err });
  }
});

// 게시글 전체 목록
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'name').sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: '글 목록 불러오기 실패', error: err });
  }
});

module.exports = router;
