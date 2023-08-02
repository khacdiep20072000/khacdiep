import axios from "axios";
import { base_url } from "utils/base_url";
import { config } from "utils/axiosconfig";

const getProducts = async (data) => {
  const res = await axios.get(
    `${base_url}product?${
      data?.minPrice ? `price[gte]=${data?.minPrice}&&` : "&&"
    }${data?.maxPrice ? `price[lte]=${data?.maxPrice}&&` : "&&"}${
      data?.category ? `category=${data?.category}&&` : "&&"
    }${data?.sort ? `sort=${data?.sort}&&` : "&&"}${
      data?.brand ? `brand=${data?.brand}` : "&&"
    }`
  );
  if (res.data) {
    return res.data;
  }
};

const getProduct = async (productId) => {
  const res = await axios.get(`${base_url}product/${productId}`);
  if (res.data) {
    return res.data;
  }
};

const addToWishList = async (productId) => {
  const res = await axios.put(
    `${base_url}product/wishlist`,
    { productId },
    config
  );
  if (res.data) {
    return res.data;
  }
};

const reviewProduct = async (review) => {
  const res = await axios.put(`${base_url}product/rating`, review, config);
  if (res.data) {
    return res.data;
  }
};

const brandProduct = async () => {
  const res = await axios.get(`${base_url}brand/`);
  if (res.data) {
    return res.data;
  }
};

const productService = {
  getProducts,
  addToWishList,
  getProduct,
  reviewProduct,
  brandProduct,
};

export default productService;
