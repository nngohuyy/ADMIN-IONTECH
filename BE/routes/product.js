const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  approveProduct,
  rejectProduct,
  getApprovedProducts
} = require("../controllers/productController");
const isAdmin = require("../middleware/isAdmin");
const isSeller = require("../middleware/isSeller");
const isUser = require("../middleware/isUser");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();



router.get("/approved", getApprovedProducts);
router.put("/approve/:id", verifyToken, isAdmin, approveProduct);
router.put("/reject/:id", verifyToken, isAdmin, rejectProduct);

// Multer: Cấu hình lưu trữ hình ảnh
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "imgRepo/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Định dạng file không hợp lệ! Chỉ chấp nhận JPEG, PNG."));
  }
};

const upload = multer({ storage, fileFilter });

// API CRUD sản phẩm

// Tạo sản phẩm mới (chỉ Seller và Admin được phép)
// router.post('/create', isSeller, upload.single('img'), createProduct);
// không cần login để xem sản phẩm
router.post(
  "/create",
  verifyToken,
  isSeller,
  upload.single("img"),
  createProduct
);

// Lấy danh sách tất cả sản phẩm (User, Seller, Admin đều có quyền xem)
// router.get('/', isUser, getProducts);
router.get("/", getProducts);

// Lấy thông tin chi tiết sản phẩm (User, Seller, Admin đều có quyền xem)
router.get("/:id", getProductById);

// Cập nhật sản phẩm (chỉ Seller hoặc Admin có quyền sửa sản phẩm của mình hoặc tất cả sản phẩm)
router.put("/:id", verifyToken, isSeller, upload.single("img"), updateProduct);

// Xóa sản phẩm (chỉ Seller hoặc Admin có quyền xóa sản phẩm của mình hoặc tất cả sản phẩm)
router.delete("/:id", verifyToken, isSeller, deleteProduct);

module.exports = router;
