const { error, badRequest, unauthorized } = require('../utils/response');

const errorHandler = (err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] Error:`, err.message);
  console.error(err.stack);
  
  if (err.name === 'SyntaxError' && err.body !== undefined) {
    return res.status(400).json(badRequest('JSON格式错误'));
  }
  
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message);
    return res.status(400).json(badRequest('数据验证失败', errors));
  }
  
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json(unauthorized('Token无效'));
  }
  
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json(unauthorized('Token已过期'));
  }
  
  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || '服务器内部错误';
  
  res.status(statusCode).json(error(message, statusCode));
};

const notFoundHandler = (req, res) => {
  res.status(404).json({
    success: false,
    message: `请求的资源不存在: ${req.method} ${req.originalUrl}`,
    code: 404,
    timestamp: Date.now()
  });
};

const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

module.exports = {
  errorHandler,
  notFoundHandler,
  asyncHandler
};
