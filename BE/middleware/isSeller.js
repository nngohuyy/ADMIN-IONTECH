const jwt = require('jsonwebtoken');
const User = require('../models/User');

const isSeller = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user || (user.role !== 'seller' && user.role !== 'admin')) {
      return res.status(403).json({ message: 'Bạn không có quyền seller!' });
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi xác thực seller!' });
  }
};

module.exports = isSeller;
