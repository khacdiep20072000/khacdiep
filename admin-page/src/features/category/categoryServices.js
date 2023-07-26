import axios from "axios";
import { config } from "utils/axiosconfig";
import { base_url } from "utils/base_url";

const getCategories = async () => {
  const res = await axios.get(`${base_url}category`);
  return res.data;
};

const getCategory = async (categoryId) => {
  const res = await axios.get(`${base_url}category/${categoryId}`);
  return res.data;
};

const createCategory = async (category) => {
  const res = await axios.post(`${base_url}category/`, category, config);
  return res.data;
};

const updateCategory = async (categoryData) => {
  const res = await axios.put(
    `${base_url}category/${categoryData.id}`,
    { title: categoryData.categoryData.title },
    config
  );
  return res.data;
};

const deleteCategory = async (categoryId) => {
  const res = await axios.delete(`${base_url}category/${categoryId}`, config);
  return res.data;
};

const categoryService = {
  getCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
};

export default categoryService;
