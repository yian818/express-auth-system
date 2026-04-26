const success = (data = null, message = '操作成功') => {
  return {
    success: true,
    message,
    data,
    timestamp: Date.now()
  };
};

const error = (message = '操作失败', code = 500, data = null) => {
  return {
    success: false,
    message,
    code,
    data,
    timestamp: Date.now()
  };
};

const unauthorized = (message = '未授权访问') => {
  return {
    success: false,
    message,
    code: 401,
    timestamp: Date.now()
  };
};

const forbidden = (message = '权限不足') => {
  return {
    success: false,
    message,
    code: 403,
    timestamp: Date.now()
  };
};

const badRequest = (message = '请求参数错误', data = null) => {
  return {
    success: false,
    message,
    code: 400,
    data,
    timestamp: Date.now()
  };
};

module.exports = {
  success,
  error,
  unauthorized,
  forbidden,
  badRequest
};
