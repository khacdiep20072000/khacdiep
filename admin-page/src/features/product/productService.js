import axios from "axios";
import { config } from "utils/axiosconfig";
import { base_url } from "utils/base_url";

const getProducts = async () => {
  const res = await axios.get(`${base_url}product/`);
  return res.data;
};

const createProduct = async (product) => {
  const res = await axios.post(`${base_url}product/`, product, config);
  return res.data;
};

const productService = {
  getProducts,
  createProduct,
};

export default productService;
