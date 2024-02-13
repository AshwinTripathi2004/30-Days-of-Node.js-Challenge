const express = require('express');
const authenticationMiddleware = require('./authenticationMiddleware');

const app = express();

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Hii, This is my Day 11 solution');
});

// Protected route
app.get('/protected', authenticationMiddleware, (req, res) => {
  res.send('Protected Route');
});

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});