require('dotenv').config({ path: `${__dirname}/.env` });

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Kiểm tra BACKEND_URL đã load chưa
if (!process.env.BACKEND_URL) {
  throw new Error('⚠️ BACKEND_URL chưa được định nghĩa trong .env');
}

app.use('/api', createProxyMiddleware({
  target: process.env.BACKEND_URL,
  changeOrigin: true,
  pathRewrite: { '^/api': '' },
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 API Gateway đang chạy tại http://localhost:${PORT}`);
});