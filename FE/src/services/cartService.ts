import axiosClient from './axiosClient';

export const addToCart = async (productId: string, quantity: number) => {
    try {
      const response = await axiosClient.post('/cart/add-to-cart', {
        productId,
        quantity,
      });
      return response.data;
    } catch (error) {
      throw new Error('Thêm sản phẩm vào giỏ hàng thất bại');
    }
  };

  export const addToCartLoggedIn = async (productId: string, quantity: number) => {
    try {
      const response = await axiosClient.post('/cart/add-logged-in', {
        productId,
        quantity,
      });
      return response.data;
    } catch (error) {
      throw new Error('Thêm sản phẩm vào giỏ hàng thất bại');
    }
  };
  export const syncCartAfterLogin = async () => {
    try {
      const response = await axiosClient.post('/cart/sync-cart');
      return response.data;
    } catch (error) {
      throw new Error('Đồng bộ giỏ hàng thất bại');
    }
  };
  
  // Cập nhật số lượng sản phẩm trong giỏ hàng
  export const updateCart = async (productId: string, quantity: number) => {
    try {
      const response = await axiosClient.put('/cart/update-cart', {
        productId,
        quantity,
      });
      return response.data;
    } catch (error) {
      throw new Error('Cập nhật giỏ hàng thất bại');
    }
  };
  
  // Lấy giỏ hàng của người dùng
  export const getCart = async () => {
    try {
      const response = await axiosClient.get('/cart/get-cart');
      return response.data;
    } catch (error) {
      throw new Error('Lấy giỏ hàng thất bại');
    }
  };
  
  // Xóa toàn bộ giỏ hàng
  export const clearCart = async () => {
    try {
      const response = await axiosClient.delete('/cart/clear-cart');
      return response.data;
    } catch (error) {
      throw new Error('Xóa giỏ hàng thất bại');
    }
  };