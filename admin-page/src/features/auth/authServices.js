import axios from "axios";
import { base_url } from "utils/base_url";
import { config } from "utils/axiosconfig";

const login = async (userData) => {
  const res = await axios.post(`${base_url}user/admin-login`, userData);
  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
  }
  return res.data;
};

const getOrders = async () => {
  const res = await axios.get(`${base_url}user/get-all-orders`, config);
  return res.data;
};

const getOrder = async (id) => {
  const res = await axios.get(`${base_url}user/get-order/${id}`, config);
  return res.data;
};

const updateOrder = async (order) => {
  const res = await axios.put(
    `${base_url}user/order/update-order/${order.id}`,
    { status: order.orderData },
    config
  );
  return res.data;
};

const authService = {
  login,
  getOrders,
  getOrder,
  updateOrder,
};

export default authService;
