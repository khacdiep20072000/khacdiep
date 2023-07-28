import axios from "axios";
import { base_url } from "utils/base_url";
import { config } from "utils/axiosconfig";

const getBrands = async () => {
  const res = await axios.get(`${base_url}brand`);
  return res.data;
};

const getBrand = async (brandId) => {
  const res = await axios.get(`${base_url}brand/${brandId}`);
  return res.data;
};

const createBrand = async (brand) => {
  const res = await axios.post(`${base_url}brand/`, brand, config);
  return res.data;
};

const updateBrand = async (brandData) => {
  const res = await axios.put(
    `${base_url}brand/${brandData.id}`,
    { title: brandData.brandData.title, images: brandData.brandData.images },
    config
  );
  return res.data;
};

const deleteBrand = async (brandId) => {
  const res = await axios.delete(`${base_url}brand/${brandId}`, config);
  return res.data;
};

const brandService = {
  getBrands,
  getBrand,
  createBrand,
  updateBrand,
  deleteBrand,
};

export default brandService;
