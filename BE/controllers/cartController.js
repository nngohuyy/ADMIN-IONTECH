// controllers/cartController.js
/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Giỏ hàng của người dùng
 */

/**
 * @swagger
 * /cart/add:
 *   post:
 *     summary: Thêm sản phẩm vào giỏ hàng (cho người chưa đăng nhập)
 *     description: Thêm sản phẩm vào giỏ hàng cho người chưa đăng nhập và lưu trong session.
 *     tags: [Cart]
 *     requestBody:
 *       description: Thông tin sản phẩm cần thêm vào giỏ hàng
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: ID của sản phẩm cần thêm vào giỏ
 *               quantity:
 *                 type: integer
 *                 description: Số lượng của sản phẩm
 *     responses:
 *       '200':
 *         description: Sản phẩm đã được thêm vào giỏ hàng thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Sản phẩm đã được thêm vào giỏ hàng'
 *                 cart:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       productId:
 *                         type: string
 *                       quantity:
 *                         type: integer
 *       '400':
 *         description: Lỗi khi thêm sản phẩm vào giỏ hàng
 */

/**
 * @swagger
 * /cart/add-logged-in:
 *   post:
 *     summary: Thêm sản phẩm vào giỏ hàng (dành cho người đã đăng nhập)
 *     description: Thêm sản phẩm vào giỏ hàng của người đã đăng nhập và lưu vào cơ sở dữ liệu MongoDB.
 *     tags: [Cart]
 *     requestBody:
 *       description: Thông tin sản phẩm cần thêm vào giỏ hàng
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: ID của sản phẩm cần thêm vào giỏ
 *               quantity:
 *                 type: integer
 *                 description: Số lượng của sản phẩm
 *     responses:
 *       '200':
 *         description: Sản phẩm đã được thêm vào giỏ hàng
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Sản phẩm đã được thêm vào giỏ hàng'
 *                 cart:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: string
 *                     items:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           product:
 *                             type: string
 *                           quantity:
 *                             type: integer
 *       '401':
 *         description: Người dùng cần phải đăng nhập để thêm sản phẩm vào giỏ hàng
 *       '500':
 *         description: Lỗi server khi thêm sản phẩm vào giỏ hàng
 */

/**
 * @swagger
 * /cart/sync:
 *   post:
 *     summary: Đồng bộ giỏ hàng từ session vào cơ sở dữ liệu khi người dùng đăng nhập
 *     description: Đồng bộ giỏ hàng từ sessionStorage vào cơ sở dữ liệu MongoDB khi người dùng đăng nhập.
 *     tags: [Cart]
 *     requestBody:
 *       description: Giỏ hàng từ sessionStorage để đồng bộ vào cơ sở dữ liệu
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sessionCart:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                     quantity:
 *                       type: integer
 *     responses:
 *       '200':
 *         description: Giỏ hàng đã được đồng bộ thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Giỏ hàng đã được đồng bộ với tài khoản!'
 *                 cart:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: string
 *                     items:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           product:
 *                             type: string
 *                           quantity:
 *                             type: integer
 *       '401':
 *         description: Người dùng cần đăng nhập để đồng bộ giỏ hàng
 *       '500':
 *         description: Lỗi server khi đồng bộ giỏ hàng
 */

/**
 * @swagger
 * /cart/update:
 *   put:
 *     summary: Cập nhật giỏ hàng của người dùng đã đăng nhập
 *     description: Cập nhật số lượng sản phẩm trong giỏ hàng của người đã đăng nhập.
 *     tags: [Cart]
 *     requestBody:
 *       description: Thông tin sản phẩm cần cập nhật trong giỏ hàng
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: ID của sản phẩm cần cập nhật
 *               quantity:
 *                 type: integer
 *                 description: Số lượng mới của sản phẩm
 *     responses:
 *       '200':
 *         description: Cập nhật giỏ hàng thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Cập nhật giỏ hàng thành công!'
 *                 cart:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: string
 *                     items:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           product:
 *                             type: string
 *                           quantity:
 *                             type: integer
 *       '404':
 *         description: Sản phẩm không có trong giỏ hàng
 *       '500':
 *         description: Lỗi server khi cập nhật giỏ hàng
 */

/**
 * @swagger
 * /cart/clear:
 *   delete:
 *     summary: Xóa giỏ hàng của người dùng
 *     description: Xóa giỏ hàng của người dùng đã đăng nhập khỏi cơ sở dữ liệu MongoDB.
 *     tags: [Cart]
 *     responses:
 *       '200':
 *         description: Giỏ hàng đã được xóa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Giỏ hàng đã được xóa'
 *       '500':
 *         description: Lỗi server khi xóa giỏ hàng
 */


const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Thêm sản phẩm vào giỏ hàng (dành cho người chưa đăng nhập)
exports.addToCart = (req, res) => {
  const { productId, quantity } = req.body;

  let cart = JSON.parse(req.session.cart || '[]'); // Lấy giỏ hàng từ sessionStorage (nếu có)

  // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
  const existingProductIndex = cart.findIndex(item => item.productId === productId);

  if (existingProductIndex > -1) {
    // Nếu có, cập nhật số lượng sản phẩm
    cart[existingProductIndex].quantity += quantity;
  } else {
    // Nếu không có, thêm sản phẩm mới vào giỏ
    cart.push({ productId, quantity });
  }

  // Lưu giỏ hàng vào sessionStorage
  req.session.cart = JSON.stringify(cart);

  res.status(200).json({ message: 'Sản phẩm đã được thêm vào giỏ hàng', cart });
};

// Thêm sản phẩm vào giỏ hàng (dành cho người đã đăng nhập)
exports.addToCartLoggedIn = async (req, res) => {
  const { productId, quantity } = req.body;

  // Kiểm tra xem người dùng đã đăng nhập hay chưa
  if (!req.user) {
    return res.status(401).json({ message: 'Bạn cần phải đăng nhập để thêm sản phẩm vào giỏ hàng!' });
  }

  try {
    // Tìm giỏ hàng của người dùng trong cơ sở dữ liệu
    let userCart = await Cart.findOne({ user: req.user._id });

    // Nếu giỏ hàng chưa tồn tại trong cơ sở dữ liệu, tạo mới
    if (!userCart) {
      userCart = new Cart({ user: req.user._id, items: [] });
    }

    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    const existingProductIndex = userCart.items.findIndex(item => item.product.toString() === productId);

    if (existingProductIndex > -1) {
      // Nếu có, cập nhật số lượng sản phẩm
      userCart.items[existingProductIndex].quantity += quantity;
    } else {
      // Nếu không có, thêm sản phẩm mới vào giỏ
      userCart.items.push({ product: productId, quantity, price: product.finalPrice });
    }

    // Tính lại tổng giá trị của giỏ hàng
    userCart.totalPrice = userCart.items.reduce((total, item) => total + item.quantity * item.price, 0);

    // Lưu giỏ hàng vào cơ sở dữ liệu
    await userCart.save();

    res.status(200).json({ message: 'Sản phẩm đã được thêm vào giỏ hàng', cart: userCart });
  } catch (error) {
    console.error('Lỗi khi thêm sản phẩm vào giỏ hàng:', error);
    res.status(500).json({ message: 'Lỗi server khi thêm sản phẩm vào giỏ hàng!' });
  }
};

// Đồng bộ giỏ hàng với cơ sở dữ liệu khi người dùng đăng nhập
exports.syncCartAfterLogin = async (req, res) => {
  const sessionCart = JSON.parse(req.body.sessionCart); // Giả sử giỏ hàng từ sessionStorage được gửi qua body

  // Kiểm tra xem người dùng đã đăng nhập hay chưa
  if (!req.user) {
    return res.status(401).json({ message: 'Bạn cần phải đăng nhập để đồng bộ giỏ hàng!' });
  }

  try {
    let userCart = await Cart.findOne({ user: req.user._id });

    // Nếu giỏ hàng chưa tồn tại trong cơ sở dữ liệu, tạo mới
    if (!userCart) {
      userCart = new Cart({ user: req.user._id, items: [] });
    }

    // Duyệt qua giỏ hàng từ sessionStorage và thêm vào giỏ hàng của người dùng
    sessionCart.forEach(item => {
      const productIndex = userCart.items.findIndex(cartItem => cartItem.product.toString() === item.productId);
      if (productIndex > -1) {
        userCart.items[productIndex].quantity += item.quantity;
      } else {
        userCart.items.push({ product: item.productId, quantity: item.quantity, price: product.finalPrice });
      }
    });

    // Tính lại tổng giá trị của giỏ hàng
    userCart.totalPrice = userCart.items.reduce((total, item) => total + item.quantity * item.price, 0);
    await userCart.save();

    res.status(200).json({ message: 'Giỏ hàng đã được đồng bộ với tài khoản!', cart: userCart });
  } catch (error) {
    console.error('Lỗi khi đồng bộ giỏ hàng:', error);
    res.status(500).json({ message: 'Lỗi server khi đồng bộ giỏ hàng!' });
  }
};
// Lấy giỏ hàng của người dùng
exports.getCart = async (req, res) => {
    try {
      // Kiểm tra người dùng đã đăng nhập chưa
      if (req.user) {
        // Nếu đã đăng nhập, lấy giỏ hàng từ cơ sở dữ liệu
        let userCart = await Cart.findOne({ user: req.user._id });
  
        if (!userCart) {
          return res.status(404).json({ message: 'Giỏ hàng của bạn hiện tại chưa có!' });
        }
  
        // Trả về giỏ hàng
        res.status(200).json({ message: 'Lấy giỏ hàng thành công', cart: userCart });
      } else {
        // Nếu chưa đăng nhập, lấy giỏ hàng từ sessionStorage
        let cart = JSON.parse(req.session.cart || '[]');
        res.status(200).json({ message: 'Lấy giỏ hàng thành công', cart });
      }
    } catch (error) {
      console.error('Lỗi khi lấy giỏ hàng:', error);
      res.status(500).json({ message: 'Lỗi server khi lấy giỏ hàng!' });
    }
  };
  
// Cập nhật giỏ hàng trong cơ sở dữ liệu
exports.updateCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Sản phẩm không tồn tại!' });
    }

    // Tìm giỏ hàng của người dùng
    let userCart = await Cart.findOne({ user: req.user._id });

    if (!userCart) {
      return res.status(404).json({ message: 'Giỏ hàng không tồn tại!' });
    }

    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    const itemIndex = userCart.items.findIndex(item => item.product.toString() === productId);

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Sản phẩm không có trong giỏ hàng!' });
    }

    // Cập nhật số lượng sản phẩm
    userCart.items[itemIndex].quantity = quantity;
    userCart.totalPrice = userCart.items.reduce((total, item) => total + item.price * item.quantity, 0);

    await userCart.save();
    res.status(200).json({ message: 'Cập nhật giỏ hàng thành công!', cart: userCart });
  } catch (error) {
    console.error('Lỗi khi cập nhật giỏ hàng:', error);
    res.status(500).json({ message: 'Lỗi server khi cập nhật giỏ hàng!' });
  }
};

// Xóa giỏ hàng của người dùng
exports.clearCart = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ user: req.user._id });
    res.status(200).json({ message: 'Giỏ hàng đã được xóa' });
  } catch (error) {
    console.error('Lỗi khi xóa giỏ hàng:', error);
    res.status(500).json({ message: 'Lỗi server khi xóa giỏ hàng!' });
  }
};
