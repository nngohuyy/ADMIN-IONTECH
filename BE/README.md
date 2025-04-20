## Mô Tả Hệ thống phân quyền gồm 3 loại người dùng chính:

1. **User**: Người dùng bình thường, có thể mua sắm và yêu cầu nâng cấp lên seller.
2. **Seller**: Người bán, có quyền quản lý sản phẩm và đơn hàng của mình.
3. **Admin**: Quản trị viên hệ thống, có quyền tạo, chỉnh sửa và xóa người dùng, quản lý quyền của người dùng khác, và phê duyệt yêu cầu nâng cấp lên seller.

## Các Chức Năng
http://localhost:5500/api
### 1. **Đăng Ký Tài Khoản**
- **Đối tượng**: Người dùng có thể đăng ký tài khoản với vai trò `user`.
- **Đường dẫn**: `POST auth/register`
- **Chi tiết**: Người dùng cung cấp thông tin đăng ký (username, password, email, fullname) và được tạo tài khoản với vai trò là `user` mặc định.

### 2. **Yêu Cầu Nâng Cấp Thành Seller**
- **Đối tượng**: Người dùng bình thường (`user`) có thể yêu cầu admin nâng cấp quyền thành seller.
- **Đường dẫn**: `POST /permission/request-seller`
- **Chi tiết**: Người dùng gửi yêu cầu nâng cấp quyền lên seller. Yêu cầu này sẽ được admin phê duyệt sau.

### 3. **Phê Duyệt Yêu Cầu Seller**
- **Đối tượng**: Chỉ có admin mới có quyền phê duyệt yêu cầu trở thành seller từ người dùng.
- **Đường dẫn**: `POST /permission/approve-seller/:userId`
- **Chi tiết**: Admin kiểm tra yêu cầu từ người dùng, và nếu phù hợp, cấp quyền seller cho người dùng đó.

### 4. **Tạo Tài Khoản Admin**
- **Đối tượng**: Chỉ admin có quyền tạo tài khoản `admin`.
- **Đường dẫn**: `POST /permission/register-admin`
- **Chi tiết**: Admin có thể tạo tài khoản mới với vai trò `admin`. Tài khoản này có quyền quản lý toàn bộ hệ thống.

### 5. **Đăng Nhập**
- **Đối tượng**: Tất cả các loại người dùng đều có thể đăng nhập.
- **Đường dẫn**: `POST auth/login`
- **Chi tiết**: Người dùng đăng nhập bằng username/email và mật khẩu. Sau khi đăng nhập thành công, hệ thống sẽ trả về một JWT token. Token này sẽ được sử dụng để xác thực người dùng cho các API yêu cầu quyền truy cập.

### 6. **Xác Thực Quyền Admin**
- **Đối tượng**: Admin
- **Đường dẫn**: Các API yêu cầu quyền admin, ví dụ: `POST /permission/register-admin`, `POST /permission/approve-seller/:userId`
- **Chi tiết**: Chỉ admin mới có quyền truy cập vào các API yêu cầu xác thực quyền admin, như tạo tài khoản admin hoặc phê duyệt yêu cầu seller.



# API Đăng Ký và Đăng Nhập
http://localhost:5500/api/auth
## 1. Đăng Ký Tài Khoản (Sign Up)

**Yêu cầu:**

- **Phương thức:** `POST`
- **Đường dẫn:** `/api/auth/register`

**Yêu cầu body:**

```json
{
  "username": "johndoe",
  "password": "password123",
  "fullname": "John Doe",
  "email": "john.doe@example.com"
}
```

## 2. Đăng Nhập Tài Khoản (Login)

### Yêu cầu:

- **Phương thức:** `POST`
- **Đường dẫn:** `/api/auth/login`

### Yêu cầu body:

```json
{
  "username": "johndoe",
  "password": "password123"
}
Phản hồi:
Trạng thái: 200 OK
{
  "message": "Đăng nhập thành công!",
  "token": "<JWT_TOKEN>"
}
```
#  API quản lý Sản phẩm
```
http://localhost:5500/api/products

```
## 1. Tạo sản phẩm

**ADD**: `POST /create`

Điểm này cho phép bạn tạo một sản phẩm mới bằng cách cung cấp các thông tin về sản phẩm.

### Yêu cầu:

- **URL**: `http://localhost:5000/api/products/create`
- **Phương thức**: `POST`
- **Tiêu đề**:
  - Content-Type: `multipart/form-data`
- **Dữ liệu trong Body (Form Data)**:
  - `name` (string): Tên sản phẩm (ví dụ: "Áo")
  - `price` (number): Giá sản phẩm (ví dụ: 100000)
  - `describe` (string): Mô tả sản phẩm (ví dụ: "Mô tả sản phẩm")
  - `gender` (string): Giới tính của sản phẩm (`"male"`, `"female"`, `"unisex"`)
  - `number` (number): Số lượng sản phẩm (ví dụ: 10)
  - `img` (file): Hình ảnh của sản phẩm (chỉ chấp nhận JPG, PNG, JPEG)

### Ví dụ yêu cầu:

```json
{
  "name": "Áo",
  "price": 100000,
  "describe": "Mô tả sản phẩm",
  "gender": "unisex",
  "number": 10,
  "img": "<tệp hình ảnh>"
}

Phản hồi:
Trạng thái: 201 Created
Phản hồi
{
  "message": "Sản phẩm đã được tạo thành công!",
  "product": {
    "name": "Áo",
    "price": 100000,
    "img": "imgRepo/abcd1234-image.jpg",
    "describe": "Mô tả sản phẩm",
    "gender": "unisex",
    "number": 10,
    "_id": "60c72b2f9e4f4a3f8f5eb8fa",
    "createdAt": "2024-12-02T12:00:00.000Z",
    "updatedAt": "2024-12-02T12:00:00.000Z"
  }
}
```
### Tóm tắt các điểm cuối:

| Điểm cuối  | Phương thức | Mô tả                       |
|------------|-------------|-----------------------------|
| `/create`  | `POST`      | Tạo sản phẩm mới            |
| `/`        | `GET`       | Lấy danh sách sản phẩm      |
| `/:id`     | `PUT`       | Cập nhật sản phẩm theo ID   |
| `/:id`     | `DELETE`    | Xóa sản phẩm theo ID        |
