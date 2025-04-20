const bcrypt = require('bcrypt');
const User = require('../models/User'); // Import User model

// Yêu cầu trở thành seller
const requestSeller = async (req, res) => {
  const { userId } = req.body; // id của người dùng muốn yêu cầu lên seller

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Người dùng không tồn tại!' });
    }

    // Kiểm tra nếu người dùng đã có vai trò là seller
    if (user.role === 'seller') {
      return res.status(400).json({ message: 'Bạn đã là seller!' });
    }

    // Kiểm tra nếu người dùng đã yêu cầu trở thành seller
    if (user.requestedRole === 'seller') {
      return res.status(400).json({ message: 'Bạn đã yêu cầu trở thành seller và đang chờ xác nhận!' });
    }

    // Cập nhật trạng thái yêu cầu lên seller
    user.requestedRole = 'seller';
    user.status = 'pending';
    await user.save();

    res.status(200).json({ message: 'Yêu cầu trở thành seller đã được gửi, vui lòng chờ admin phê duyệt.' });
  } catch (error) {
    console.error('Lỗi khi yêu cầu seller:', error);
    res.status(500).json({ message: 'Lỗi server, vui lòng thử lại sau!' });
  }
};

const rejectSeller = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Người dùng không tồn tại!' });
    }

    if (user.requestedRole !== 'seller') {
      return res.status(400).json({ message: 'Người dùng này không yêu cầu làm seller!' });
    }

    user.requestedRole = null;
    user.status = 'rejected';
    await user.save();

    res.status(200).json({ message: 'Đã từ chối yêu cầu trở thành seller!' });
  } catch (error) {
    console.error('Lỗi khi từ chối seller:', error);
    res.status(500).json({ message: 'Lỗi server, vui lòng thử lại sau!' });
  }
};

const getPendingSellers = async (req, res) => {
  try {
    const pendingUsers = await User.find({
      requestedRole: 'seller',
      status: 'pending'
    }).select('-password'); // ẩn mật khẩu

    res.status(200).json(pendingUsers);
  } catch (error) {
    console.error('Lỗi khi lấy danh sách seller chờ duyệt:', error);
    res.status(500).json({ message: 'Lỗi server, vui lòng thử lại sau!' });
  }
};



// Phê duyệt trở thành seller (chỉ dành cho admin)
const approveSeller = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Người dùng không tồn tại!' });
    }

    // Kiểm tra nếu người dùng đã là seller
    if (user.role === 'seller') {
      return res.status(400).json({ message: 'Người dùng này đã là seller!' });
    }

    // Kiểm tra nếu người dùng chưa yêu cầu trở thành seller
    if (user.requestedRole !== 'seller') {
      return res.status(400).json({ message: 'Người dùng này chưa yêu cầu lên seller!' });
    }

    // Cập nhật vai trò của người dùng thành seller
    user.role = 'seller';
    user.requestedRole = null; // Xóa trạng thái yêu cầu
    user.status = 'approved';
    await user.save();

    res.status(200).json({ message: 'Đã phê duyệt trở thành seller!' });
  } catch (error) {
    console.error('Lỗi khi phê duyệt seller:', error);
    res.status(500).json({ message: 'Lỗi server, vui lòng thử lại sau!' });
  }
};

// Tạo tài khoản admin (chỉ dành cho admin)
const registerAdmin = async (req, res) => {
  const { id_user, username, password, fullname, email } = req.body;

  if (!id_user || !username || !password || !fullname || !email) {
    return res.status(400).json({ message: 'Vui lòng cung cấp đầy đủ thông tin' });
  }

  try {
    // Kiểm tra nếu email hoặc username đã tồn tại
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Email hoặc Username đã được sử dụng!' });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo người dùng admin
    const user = new User({
      id_user,
      username,
      password: hashedPassword,
      fullname,
      email,
      role: 'admin' // Gán vai trò là admin
    });

    // Lưu người dùng admin vào MongoDB
    await user.save();

    res.status(201).json({ message: 'Tạo tài khoản admin thành công!' });
  } catch (error) {
    console.error('Lỗi khi tạo tài khoản admin:', error);
    res.status(500).json({ message: 'Lỗi server, vui lòng thử lại sau!' });
  }
};

module.exports = { requestSeller,
  approveSeller,
  rejectSeller,
  getPendingSellers,
  registerAdmin };
