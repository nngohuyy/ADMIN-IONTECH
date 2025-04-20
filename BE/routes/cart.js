// routes/cartRoutes.js

const express = require('express');
const isUser = require('../middleware/isUser');
const { addToCart,addToCartLoggedIn, syncCartAfterLogin, updateCart, clearCart,getCart } = require('../controllers/cartController');

const router = express.Router();

const verifyToken = require('../middleware/verifyToken');
// Thêm sản phẩm vào giỏ hàng khi chưa đăng nhập
router.post('/add-to-cart', addToCart);

// Thêm sản phẩm vào giỏ hàng khi đã đăng nhập (MongoDB)
router.post('/add-logged-in', verifyToken, isUser, addToCartLoggedIn);

// Đồng bộ giỏ hàng từ session -> MongoDB khi đăng nhập
router.post('/sync-cart', verifyToken, isUser, syncCartAfterLogin);

// Cập nhật số lượng trong giỏ hàng
router.put('/update-cart', verifyToken, isUser, updateCart);

// Lấy giỏ hàng (Mongo hoặc session)
router.get('/get-cart', verifyToken, isUser, getCart);

// Xóa toàn bộ giỏ hàng
router.delete('/clear-cart', verifyToken, isUser, clearCart);

module.exports = router;
