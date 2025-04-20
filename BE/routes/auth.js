const express = require('express');
const { register, login } = require('../controllers/authController'); // Import controller
const router = express.Router();
const { googleLogin } = require('../controllers/authController');
const { forgotPassword } = require('../controllers/authController');
const { resetPassword } = require('../controllers/authController');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const ResetToken = require('../models/ResetToken');
// Route đăng ký
router.post('/register', register);

// Route đăng nhập
router.post('/login', login);
router.post('/google', googleLogin);

router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = router;