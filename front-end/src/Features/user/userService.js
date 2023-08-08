import axios from "axios";
import { base_url } from "utils/base_url";
import { config } from "utils/axiosconfig";

const register = async (user) => {
  const res = await axios.post(`${base_url}user/register`, user);
  if (res.data) {
    return res.data;
  }
};

const login = async (user) => {
  const res = await axios.post(`${base_url}user/login`, user);
  if (res.data) {
    if (res.data) {
      localStorage.setItem("customer", JSON.stringify(res.data));
    }
    return res.data;
  }
};

const getWishList = async () => {
  const res = await axios.get(`${base_url}user/wishlist`, config);
  return res.data;
};

const addToCart = async (cart) => {
  const res = await axios.post(`${base_url}user/cart`, cart, config);
  return res.data;
};

const getCart = async () => {
  const res = await axios.get(`${base_url}user/cart`, config);
  return res.data;
};

const deleteProductFromCart = async (cartId) => {
  const res = await axios.delete(
    `${base_url}user/remove-product-cart/${cartId}`,
    config
  );
  return res.data;
};

const updateQuantityProductFromCart = async (cart) => {
  const { cartId, newQuantity } = cart;

  const res = await axios.put(
    `${base_url}user/update-quantity-cart/${cartId}`,
    { newQuantity: newQuantity },
    config
  );
  return res.data;
};

const updateQuantityAddToCart = async (cart) => {
  const { cartId, newQuantity } = cart;

  const res = await axios.put(
    `${base_url}user/update-quantity-add-to-cart/${cartId}`,
    { newQuantity: newQuantity },
    config
  );
  return res.data;
};

const createOrder = async (order) => {
  const res = await axios.post(
    `${base_url}user/cart/create-order`,
    order,
    config
  );
  return res.data;
};

const getOrdersUser = async () => {
  const res = await axios.get(`${base_url}user/get-order-user`, config);
  return res.data;
};

const updateUser = async (user) => {
  const res = await axios.put(`${base_url}user/edit-user`, user, config);
  return res.data;
};

const getMyInformation = async () => {
  const res = await axios.get(`${base_url}user/my-information`, config);
  return res.data;
};

const forgotPasswordToken = async (email) => {
  const res = await axios.post(`${base_url}user/forgot-password`, email);
  return res.data;
};

const resetPassword = async (data) => {
  const { password, token } = data;
  const res = await axios.put(`${base_url}user/reset-password/${token}`, {
    password,
  });
  return res.data;
};

const emptyCart = async () => {
  const res = await axios.put(`${base_url}user/empty-cart`, config);
  return res.data;
};

const userService = {
  register,
  login,
  getWishList,
  addToCart,
  getCart,
  deleteProductFromCart,
  updateQuantityProductFromCart,
  updateQuantityAddToCart,
  createOrder,
  getOrdersUser,
  updateUser,
  getMyInformation,
  forgotPasswordToken,
  resetPassword,
  emptyCart,
};

export default userService;
