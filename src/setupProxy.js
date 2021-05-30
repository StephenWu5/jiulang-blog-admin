const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/login", {
      target: "http://localhost:8081",
      changeOrigin: true,
      ws: true,
      pathRewrite: {
        "^/api": "",
      },
    })
  );
};
