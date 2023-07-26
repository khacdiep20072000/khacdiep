import axios from "axios";
import { config } from "utils/axiosconfig";
import { base_url } from "utils/base_url";

const getBlogCategories = async () => {
  const res = await axios.get(`${base_url}blog-category`);
  return res.data;
};

const createBlogCategory = async (blogCategory) => {
  const response = await axios.post(
    `${base_url}blog-category/`,
    blogCategory,
    config
  );

  return response.data;
};

const getBlogCategory = async (blogCategoryId) => {
  const res = await axios.get(
    `${base_url}blog-category/${blogCategoryId}`,
    config
  );
  return res.data;
};

const updateBlogCategory = async (blogCategoryData) => {
  const res = await axios.put(
    `${base_url}blog-category/${blogCategoryData.id}`,
    {
      title: blogCategoryData.blogCategoryData.title,
    },
    config
  );
  return res.data;
};

const deleteBlogCategory = async (blogCategoryId) => {
  const res = await axios.delete(
    `${base_url}blog-category/${blogCategoryId}`,
    config
  );
  return res.data;
};

const blogCategoryService = {
  getBlogCategories,
  createBlogCategory,
  getBlogCategory,
  updateBlogCategory,
  deleteBlogCategory,
};

export default blogCategoryService;
