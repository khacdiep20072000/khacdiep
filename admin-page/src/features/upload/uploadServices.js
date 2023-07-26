import axios from "axios";
import { base_url } from "utils/base_url";
import { config } from "utils/axiosconfig";

const uploadImg = async (data) => {
  const res = await axios.post(`${base_url}upload`, data, config);
  return res.data;
};

const deleteImg = async (id) => {
  const res = await axios.delete(`${base_url}upload/delete-img/${id}`, config);
  return res.data;
};

const uploadService = {
  uploadImg,
  deleteImg,
};

export default uploadService;
