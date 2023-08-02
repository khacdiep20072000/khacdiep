import axios from "axios";
import { base_url } from "utils/base_url";

const getBlogs = async (data) => {
  const res = await axios.get(
    `${base_url}blog?${data.category ? `category=${data.category}` : ""}`
  );
  if (res.data) {
    return res.data;
  }
};

const getBlog = async (blogId) => {
  const res = await axios.get(`${base_url}blog/${blogId}`);
  if (res.data) {
    return res.data;
  }
};

const getCategoryBlogs = async () => {
  const res = await axios.get(`${base_url}blog-category`);
  return res.data;
};

const blogService = {
  getBlogs,
  getBlog,
  getCategoryBlogs,
};

export default blogService;
