import axios from "axios";
import { config } from "utils/axiosconfig";
import { base_url } from "utils/base_url";

const getProducts = async () => {
  const res = await axios.get(`${base_url}product/`);
  return res.data;
};

const getProduct = async (productId) => {
  const res = await axios.get(`${base_url}product/${productId}`);
  return res.data;
};

const createProduct = async (product) => {
  const res = await axios.post(`${base_url}product/`, product, config);
  return res.data;
};

const deleteProduct = async (productId) => {
  const res = await axios.delete(`${base_url}product/${productId}`, config);
  return res.data;
};

const updateProduct = async (productData) => {
  const res = await axios.put(
    `${base_url}product/${productData.id}`,
    productData.productData,
    config
  );
  return res.data;
};

const productService = {
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  getProduct,
};

export default productService;
