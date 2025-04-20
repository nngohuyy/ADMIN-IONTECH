const Product = require('../models/Product');
/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Quản lý sản phẩm
 */

/**
 * @swagger
 * /products/create:
 *   post:
 *     summary: Tạo sản phẩm mới
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               brand:
 *                 type: string
 *               category:
 *                 type: string
 *                 enum: [Laptop, Smartphone, Tablet, Tai nghe, Phụ kiện]
 *               description:
 *                 type: string
 *               netPrice:
 *                 type: number
 *               discount:
 *                 type: number
 *               stock:
 *                 type: number
 *               releaseDate:
 *                 type: string
 *                 format: date
 *               specifications:
 *                 type: string
 *                 description: JSON string of specifications
 *               img:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Tạo sản phẩm thành công.
 *       400:
 *         description: Lỗi request.
 *       500:
 *         description: Lỗi server.
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Lấy danh sách tất cả sản phẩm
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách sản phẩm.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Lỗi server.
 */

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Cập nhật sản phẩm
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID sản phẩm
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               brand:
 *                 type: string
 *               category:
 *                 type: string
 *                 enum: [Laptop, Smartphone, Tablet, Tai nghe, Phụ kiện]
 *               description:
 *                 type: string
 *               netPrice:
 *                 type: number
 *               discount:
 *                 type: number
 *               stock:
 *                 type: number
 *               releaseDate:
 *                 type: string
 *                 format: date
 *               specifications:
 *                 type: string
 *                 description: JSON string of specifications
 *               img:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Cập nhật sản phẩm thành công.
 *       404:
 *         description: Không tìm thấy sản phẩm.
 *       500:
 *         description: Lỗi server.
 */

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Xóa sản phẩm
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID sản phẩm
 *     responses:
 *       200:
 *         description: Xóa sản phẩm thành công.
 *       404:
 *         description: Không tìm thấy sản phẩm.
 *       500:
 *         description: Lỗi server.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         brand:
 *           type: string
 *         category:
 *           type: string
 *           enum: [Laptop, Smartphone, Tablet, Tai nghe, Phụ kiện]
 *         description:
 *           type: string
 *         netPrice:
 *           type: number
 *         discount:
 *           type: number
 *         finalPrice:
 *           type: number
 *         image:
 *           type: string
 *         stock:
 *           type: number
 *         releaseDate:
 *           type: string
 *           format: date
 *         specifications:
 *           type: object
 *           additionalProperties:
 *             type: object
 */

// Tạo sản phẩm mới
exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      brand,
      category,
      description,
      netPrice,
      discount,
      stock,
      releaseDate,
      specifications,
    } = req.body;

    const finalPrice = netPrice - (netPrice * (discount || 0)) / 100;
    const img = req.file ? req.file.path : req.body.img;

    if (!img) {
      return res.status(400).json({ message: 'Ảnh sản phẩm là bắt buộc!' });
    }
    

    let parsedSpecifications;
    if (typeof specifications === 'string') {
      parsedSpecifications = JSON.parse(specifications); // Chỉ parse nếu specifications là chuỗi
    } else if (typeof specifications === 'object') {
      parsedSpecifications = specifications; // Nếu là object, giữ nguyên
    } else {
      return res.status(400).json({ message: 'Thông số kỹ thuật không hợp lệ!' });
    }

    const product = new Product({
      name,
      brand,
      category,
      description,
      netPrice,
      discount,
      finalPrice,
      image: img,
      stock,
      releaseDate,
      specifications: parsedSpecifications,
      status: 'pending',
    });

    await product.save();
    res.status(201).json({ message: 'Tạo sản phẩm thành công!', product });
  } catch (error) {
    console.error('Lỗi khi tạo sản phẩm:', error);
    res.status(500).json({ message: 'Lỗi server khi tạo sản phẩm!' });
  }
};
// approve san pham
exports.approveProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Product.findByIdAndUpdate(id, { status: 'approved' }, { new: true });

    if (!updated) return res.status(404).json({ message: 'Không tìm thấy sản phẩm!' });
    res.status(200).json({ message: 'Duyệt sản phẩm thành công!', product: updated });
  } catch (error) {
    console.error('Lỗi khi duyệt sản phẩm:', error);
    res.status(500).json({ message: 'Lỗi server!' });
  }
};
// reject san pham
exports.rejectProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Product.findByIdAndUpdate(id, { status: 'rejected' }, { new: true });

    if (!updated) return res.status(404).json({ message: 'Không tìm thấy sản phẩm!' });
    res.status(200).json({ message: 'Từ chối sản phẩm thành công!', product: updated });
  } catch (error) {
    console.error('Lỗi khi từ chối sản phẩm:', error);
    res.status(500).json({ message: 'Lỗi server!' });
  }
};
// Lấy danh sách tất cả sản phẩm
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({status: 'approved'});
    res.status(200).json(products);
  } catch (error) {
    console.error('Lỗi khi lấy danh sách sản phẩm:', error);
    res.status(500).json({ message: 'Lỗi server khi lấy sản phẩm!' });
  }
};

exports.getApprovedProducts = async (req, res) => {
  try {
    const products = await Product.find({ status: "approved" });
    res.status(200).json(products);
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm đã duyệt:", error);
    res.status(500).json({ message: "Lỗi server khi lấy sản phẩm!" });
  }
};
// Lấy thông tin sản phẩm theo ID
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm!' });
    }

    res.status(200).json(product);

  } catch (error) {
    console.error('Lỗi khi lấy thông tin sản phẩm:', error);
    res.status(500).json({ message: 'Lỗi server khi lấy thông tin sản phẩm!' });
  }
}

// Cập nhật sản phẩm
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      brand,
      category,
      description,
      netPrice,
      discount,
      stock,
      releaseDate,
      specifications,
      img, // Chấp nhận chuỗi URL/đường dẫn ảnh
    } = req.body;

    const updateData = {
      name,
      brand,
      category,
      description,
      netPrice,
      discount,
      finalPrice: netPrice - (netPrice * (discount || 0)) / 100,
      image: img || undefined, // Cập nhật nếu img được gửi
      stock,
      releaseDate,
      specifications: JSON.parse(specifications), // Chuyển đổi chuỗi JSON sang object
    };

    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm!' });
    }

    res.status(200).json({ message: 'Cập nhật sản phẩm thành công!', updatedProduct });
  } catch (error) {
    console.error('Lỗi khi cập nhật sản phẩm:', error);
    res.status(500).json({ message: 'Lỗi server khi cập nhật sản phẩm!' });
  }
};

// Xóa sản phẩm
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm!' });
    }

    res.status(200).json({ message: 'Xóa sản phẩm thành công!' });
  } catch (error) {
    console.error('Lỗi khi xóa sản phẩm:', error);
    res.status(500).json({ message: 'Lỗi server khi xóa sản phẩm!' });
  }
};
