const { findById } = require('../data/users');
const { success, error, notFound } = require('../utils/response');

const getUserProfile = (req, res) => {
  const { id } = req.params;
  const userId = parseInt(id);
  
  if (isNaN(userId)) {
    return res.status(400).json({
      success: false,
      message: '用户ID格式错误',
      code: 400,
      timestamp: Date.now()
    });
  }
  
  const user = findById(userId);
  
  if (!user) {
    return res.status(404).json({
      success: false,
      message: '用户不存在',
      code: 404,
      timestamp: Date.now()
    });
  }
  
  const userProfile = {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt
  };
  
  res.json(success(userProfile, '获取用户信息成功'));
};

const getCurrentUser = (req, res) => {
  const user = findById(req.user.id);
  
  if (!user) {
    return res.status(404).json({
      success: false,
      message: '用户不存在',
      code: 404,
      timestamp: Date.now()
    });
  }
  
  const userProfile = {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt
  };
  
  res.json(success(userProfile, '获取当前用户信息成功'));
};

const updateCurrentUser = (req, res) => {
  const { email } = req.body;
  const user = findById(req.user.id);
  
  if (!user) {
    return res.status(404).json({
      success: false,
      message: '用户不存在',
      code: 404,
      timestamp: Date.now()
    });
  }
  
  if (email) {
    user.email = email;
  }
  
  const updatedUser = {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt
  };
  
  res.json(success(updatedUser, '更新用户信息成功'));
};

module.exports = {
  getUserProfile,
  getCurrentUser,
  updateCurrentUser
};
