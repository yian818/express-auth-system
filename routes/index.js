const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');
const userRoutes = require('./users');

router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: '服务运行正常',
    timestamp: Date.now(),
    uptime: process.uptime()
  });
});

router.use('/auth', authRoutes);
router.use('/users', userRoutes);

module.exports = router;
