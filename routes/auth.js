const express = require('express');
const router = express.Router();
const { login, logout, me } = require('../controllers/authController');
const { authenticate } = require('../middlewares/authMiddleware');
const { asyncHandler } = require('../middlewares/errorHandler');

router.post('/login', asyncHandler(login));
router.post('/logout', authenticate, logout);
router.get('/me', authenticate, me);

module.exports = router;
