const { generateToken } = require('../utils/jwt');
const { success, error, badRequest, unauthorized } = require('../utils/response');
const { findByUsername, comparePassword } = require('../data/users');

const login = async (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json(badRequest('用户名和密码不能为空'));
  }
  
  const user = findByUsername(username);
  
  if (!user) {
    return res.status(401).json(unauthorized('用户名或密码错误'));
  }
  
  const isPasswordValid = await comparePassword(password, user.password);
  
  if (!isPasswordValid) {
    return res.status(401).json(unauthorized('用户名或密码错误'));
  }
  
  const token = generateToken({
    id: user.id,
    username: user.username,
    role: user.role
  });
  
  res.json(success({
    token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role
    }
  }, '登录成功'));
};

const logout = (req, res) => {
  res.json(success(null, '登出成功'));
};

const me = (req, res) => {
  const userData = {
    id: req.user.id,
    username: req.user.username,
    role: req.user.role
  };
  
  res.json(success(userData, '获取用户信息成功'));
};

module.exports = {
  login,
  logout,
  me
};
