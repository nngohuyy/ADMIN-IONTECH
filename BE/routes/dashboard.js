const express = require('express');

const path = require('path');
const { createProduct, getProducts, updateProduct, deleteProduct, getProductById } = require('../controllers/productController');


const router = express.Router();




// API CRUD sản phẩm

// Tạo sản phẩm mới (chỉ Seller và Admin được phép)
// router.post('/create', isSeller, upload.single('img'), createProduct);
// không cần login để xem sản phẩm
router.post('/create', createItem);

// Lấy danh sách tất cả sản phẩm (User, Seller, Admin đều có quyền xem)
// router.get('/', isUser, getProducts);
router.get('/', getItem);

// Lấy thông tin chi tiết sản phẩm (User, Seller, Admin đều có quyền xem)
router.get('/:id', getItemById);

// Cập nhật sản phẩm (chỉ Seller hoặc Admin có quyền sửa sản phẩm của mình hoặc tất cả sản phẩm)
router.put('/:id', updateItem);

// Xóa sản phẩm (chỉ Seller hoặc Admin có quyền xóa sản phẩm của mình hoặc tất cả sản phẩm)
router.delete('/:id', deleteItem);

module.exports = router;
