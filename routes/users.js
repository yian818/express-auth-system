const express = require('express');
const router = express.Router();
const { getUserProfile, getCurrentUser, updateCurrentUser } = require('../controllers/userController');
const { authenticate, authorize } = require('../middlewares/authMiddleware');
const { asyncHandler } = require('../middlewares/errorHandler');

router.get('/me', authenticate, getCurrentUser);
router.put('/me', authenticate, asyncHandler(updateCurrentUser));
router.get('/:id', authenticate, authorize('admin'), asyncHandler(getUserProfile));

module.exports = router;
