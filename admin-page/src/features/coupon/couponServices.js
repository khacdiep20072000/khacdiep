import axios from "axios";
import { base_url } from "utils/base_url";
import { config } from "utils/axiosconfig";

const getCoupons = async () => {
  const res = await axios.get(`${base_url}coupon`, config);
  return res.data;
};

const createCoupon = async (coupon) => {
  const res = await axios.post(`${base_url}coupon/`, coupon, config);
  return res.data;
};

const getCoupon = async (couponId) => {
  const res = await axios.get(`${base_url}coupon/${couponId}`, config);
  return res.data;
};

const updateCoupon = async (couponData) => {
  const res = await axios.put(
    `${base_url}coupon/${couponData.id}`,
    {
      name: couponData.couponData.name,
      expiry: couponData.couponData.expiry,
      discount: couponData.couponData.discount,
    },
    config
  );
  return res.data;
};

const deleteCoupon = async (couponId) => {
  const res = await axios.delete(`${base_url}coupon/${couponId}`, config);
  return res.data;
};

const couponService = {
  getCoupons,
  createCoupon,
  getCoupon,
  updateCoupon,
  deleteCoupon,
};

export default couponService;
