import axios from "axios";
import { base_url } from "utils/base_url";

const getBlogs = async () => {
  const res = await axios.get(`${base_url}blog`);
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

const blogService = {
  getBlogs,
  getBlog,
};

export default blogService;
