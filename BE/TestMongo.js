// testMongo.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config(); // load biến môi trường từ .env

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ Kết nối MongoDB thành công!');
  mongoose.connection.close(); // đóng sau khi test xong
})
.catch(err => {
  console.error('❌ Kết nối MongoDB thất bại:', err);
});
