const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
  // 测试环境--后台服务器
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8081',
      changeOrigin: true,
      pathRewrite: { '^/api1': '' }
    })
  );
  // 本地模拟mock数据
  app.use(
    '/mock',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
      pathRewrite: { '^/api1': '' }
    })
  );
};
