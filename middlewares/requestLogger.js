const requestLogger = (req, res, next) => {
  const startTime = Date.now();
  const { method, url, ip, headers } = req;
  const userAgent = headers['user-agent'];
  
  console.log(`[${new Date().toISOString()}] ${method} ${url} - IP: ${ip} - UA: ${userAgent}`);
  
  const originalSend = res.send;
  res.send = function(body) {
    const duration = Date.now() - startTime;
    console.log(`[${new Date().toISOString()}] ${method} ${url} - Status: ${res.statusCode} - Duration: ${duration}ms`);
    return originalSend.call(this, body);
  };
  
  next();
};

module.exports = {
  requestLogger
};
