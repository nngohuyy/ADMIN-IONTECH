const express = require('express');
const router = express.Router();
const {
  requestSeller,
  approveSeller,
  rejectSeller,
  getPendingSellers,
  registerAdmin
} = require('../controllers/permissionController'); // Import các function từ controller
const isAdmin = require('../middleware/isAdmin');  // Middleware kiểm tra quyền admin
const verifyToken = require('../middleware/verifyToken');


// Route yêu cầu trở thành seller
router.post('/request-seller', requestSeller);

router.post('/approve-seller/:userId', verifyToken, isAdmin, approveSeller);
router.post('/reject-seller/:userId', verifyToken, isAdmin, rejectSeller);
router.get('/pending-sellers', verifyToken, isAdmin, getPendingSellers);
router.post('/register-admin', verifyToken, isAdmin, registerAdmin);

module.exports = router;
