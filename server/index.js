require('dotenv').config(); // 맨 위에 추가
const express = require('express');
const mongoose = require('mongoose');   
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const EmployeeModel = require('./models/Employee');


const app = express();
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

const JWT_SECRET = process.env.JWT_SECRET || "yourSuperSecretKey"; // .env로 분리 추천

mongoose.connect(
    process.env.MONGO_URI || 'mongodb://localhost:27017/church-of-hoyun', // 환경변수로 MongoDB URI 설정
    { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => console.log('MongoDB connected'))
 .catch(err => console.log(err));

app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await EmployeeModel.create({ name, email, password: hashedPassword });
    res.json({ message: '회원가입 성공', user: newUser });
  } catch (err) {
    res.status(500).json({ message: '회원가입 실패', error: err });
  }
});


app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await EmployeeModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ message: "Incorrect password" });

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ message: "Login success", token });
  } catch (err) {
    res.status(500).json({ message: "Error during login", error: err });
  }
});

app.get('/me', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: '인증 필요' });

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, 'yourSuperSecretKey');
    const user = await EmployeeModel.findById(decoded.id).select('name email');
    if (!user) return res.status(404).json({ message: '사용자 없음' });

    res.json(user);
  } catch (err) {
    res.status(403).json({ message: '토큰 유효하지 않음' });
  }
});

// routes/memberRoutes.js (또는 index.js에 바로 추가해도 됨)
app.get('/members', async (req, res) => {
  try {
    const members = await EmployeeModel.find().select('name email');
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: '신자 목록 불러오기 실패', error: err });
  }
});


const PORT = process.env.PORT || 3001; // 환경변수로 포트 설정

app.listen(PORT, () => {
  console.log("Server is running on port 3001");
});
