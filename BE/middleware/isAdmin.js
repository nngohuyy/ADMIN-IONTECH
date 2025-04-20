const User = require('../models/User');

const isAdmin = async (req, res, next) => {
  try {
    // req.user đã được gắn từ middleware verifyToken
    const user = await User.findById(req.user.id);

    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Bạn không có quyền admin!' });
    }

    req.user = user; // Gắn user đầy đủ cho các middleware/route sau dùng
    next();
  } catch (err) {
    console.error('Lỗi xác thực admin:', err);
    res.status(500).json({ message: 'Lỗi server khi kiểm tra quyền admin!' });
  }
};

module.exports = isAdmin;
