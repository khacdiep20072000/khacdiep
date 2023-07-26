import axios from "axios";
import { config } from "utils/axiosconfig";
import { base_url } from "utils/base_url";

const getBlogs = async () => {
  const res = await axios.get(`${base_url}blog`);
  return res.data;
};

const createBlog = async (blog) => {
  const res = await axios.post(`${base_url}blog/`, blog, config);
  return res.data;
};

const getBlog = async (blogId) => {
  const res = await axios.get(`${base_url}blog/${blogId}`);
  return res.data;
};

const updateBlog = async (blogData) => {
  const res = await axios.put(
    `${base_url}blog/${blogData.id}`,
    {
      title: blogData.blogData.title,
      description: blogData.blogData.description,
      category: blogData.blogData.category,
      images: blogData.blogData.images,
    },
    config
  );
  return res.data;
};

const deleteBlog = async (blogId) => {
  const res = await axios.delete(`${base_url}blog/${blogId}`, config);
  return res.data;
};

const blogService = {
  getBlogs,
  createBlog,
  getBlog,
  updateBlog,
  deleteBlog,
};

export default blogService;
