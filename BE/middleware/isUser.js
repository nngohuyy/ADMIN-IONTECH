const jwt = require('jsonwebtoken');
const User = require('../models/User');

const isUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Người dùng không tồn tại!' });
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi xác thực user!' });
  }
};

module.exports = isUser;