import { base_url } from "utils/base_url";
import axios from "axios";

const getAllCategory = async () => {
  const res = await axios.get(`${base_url}category`);
  return res.data;
};

const CategoryService = {
  getAllCategory,
};

export default CategoryService;
