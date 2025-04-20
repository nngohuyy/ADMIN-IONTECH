const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import User model
const nodemailer = require('nodemailer');

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API for user authentication (Sign In/Sign Up)
 */

// Đăng ký
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Đăng ký người dùng mới
 *     tags: [Authentication]
 *     description: Đăng ký người dùng mới với username, password, fullname, email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               fullname:
 *                 type: string
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       201:
 *         description: Đăng ký thành công
 *       400:
 *         description: Email hoặc username đã được sử dụng
 *       500:
 *         description: Lỗi server
 */
const register = async (req, res) => {
  const { username, password, fullname, email, role } = req.body;

  if ( !username || !password || !fullname || !email) {
    return res.status(400).json({ message: 'Vui lòng cung cấp đầy đủ thông tin' });
  }

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Email hoặc Username đã được sử dụng!' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedID = crypto.createHash('sha256').update(email).digest('hex').substring(0, 16);
    const requestedRole = role === 'seller' ? 'seller' : 'user';
    const status = role === 'seller' ? 'pending' : 'approved';

    const user = new User({
      id_user: hashedID,
      username,
      password: hashedPassword,
      fullname,
      email,
      role: 'user',
      requestedRole,
      status,
    });

    await user.save();

    res.status(201).json({ message: 'Đăng ký thành công!' });
  } catch (error) {
    console.error('Lỗi khi đăng ký người dùng:', error);
    res.status(500).json({ message: 'Lỗi server, vui lòng thử lại sau!' });
  }
};

// Đăng nhập
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Đăng nhập người dùng
 *     tags: [Authentication]
 *     description: Đăng nhập người dùng bằng username hoặc email và mật khẩu
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Đăng nhập thành công và trả về token
 *       400:
 *         description: Thiếu thông tin username hoặc mật khẩu
 *       404:
 *         description: Người dùng không tồn tại
 *       401:
 *         description: Sai mật khẩu
 *       500:
 *         description: Lỗi server
 */
const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Vui lòng cung cấp username và mật khẩu' });
  }

  try {
    const user = await User.findOne({ $or: [{ email: username }, { username }] });
    if (!user) {
      return res.status(404).json({ message: 'Người dùng không tồn tại!' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Sai mật khẩu!' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ message: 'Đăng nhập thành công!', token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        requestedRole: user.requestedRole,
        status: user.status
      }
     });
  } catch (error) {
    console.error('Lỗi khi đăng nhập:', error);
    res.status(500).json({ message: 'Lỗi server, vui lòng thử lại sau!' });
  }
};




const { OAuth2Client } = require('google-auth-library');



const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleLogin = async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: '218670822321-gn8cedd6dhggov0gv38gnq3itm5ll6b9.apps.googleusercontent.com',
    });

    const payload = ticket.getPayload();

    let user = await User.findOne({ email: payload.email });

    if (!user) {
      user = new User({
        username: payload.name,
        email: payload.email,
        avatar: payload.picture,
        role: 'user',
      });

      await user.save();
    }

    const jwtToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Đăng nhập Google thành công!', token: jwtToken, user: payload });

  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi xác thực Google' });
  }
};




const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'Không tìm thấy người dùng!' });

  const token = crypto.randomBytes(32).toString('hex');
  resetTokens[token] = { email, expires: Date.now() + 15 * 60 * 1000 };

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    }
  });

  const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

  await transporter.sendMail({
    from: `"IonTech Support" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: "Yêu cầu đặt lại mật khẩu",
    html: `<p>Nhấn vào <a href="${resetLink}">đây</a> để đặt lại mật khẩu. Link hết hạn sau 15 phút.</p>`
  });

  res.json({ message: 'Email đặt lại mật khẩu đã được gửi!' });
};



const resetPassword = async (req, res) => {
  const { token, password } = req.body;

  if (!token || !password) {
    return res.status(400).json({ message: 'Thiếu token hoặc mật khẩu mới' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: 'Người dùng không tồn tại' });

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: 'Mật khẩu đã được cập nhật thành công!' });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: 'Token không hợp lệ hoặc đã hết hạn' });
  }
};
module.exports = {
  register,
  login,
  googleLogin,
  forgotPassword,
  resetPassword
};