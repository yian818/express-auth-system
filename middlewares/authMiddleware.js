const { verifyToken } = require('../utils/jwt');
const { unauthorized, forbidden } = require('../utils/response');

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json(unauthorized('缺少Authorization头'));
  }
  
  const token = authHeader.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json(unauthorized('缺少Token'));
  }
  
  const decoded = verifyToken(token);
  
  if (!decoded) {
    return res.status(401).json(unauthorized('Token无效或已过期'));
  }
  
  req.user = decoded;
  next();
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json(unauthorized('请先登录'));
    }
    
    if (roles.length > 0 && !roles.includes(req.user.role)) {
      return res.status(403).json(forbidden('权限不足'));
    }
    
    next();
  };
};

const optionalAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (authHeader) {
    const token = authHeader.replace('Bearer ', '');
    const decoded = verifyToken(token);
    if (decoded) {
      req.user = decoded;
    }
  }
  
  next();
};

module.exports = {
  authenticate,
  authorize,
  optionalAuth
};
