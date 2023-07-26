import axios from "axios";
import { config } from "utils/axiosconfig";
import { base_url } from "utils/base_url";

const getColors = async () => {
  const res = await axios.get(`${base_url}color`);
  return res.data;
};

const createColor = async (color) => {
  const response = await axios.post(`${base_url}color/`, color, config);

  return response.data;
};

const updateColor = async (color) => {
  const res = await axios.put(
    `${base_url}color/${color.id}`,
    { title: color.colorData.title },
    config
  );

  return res.data;
};

const getColor = async (id) => {
  const res = await axios.get(`${base_url}color/${id}`, config);

  return res.data;
};

const deleteColor = async (colorId) => {
  const res = await axios.delete(`${base_url}color/${colorId}`, config);
  return res.data;
};

const colorService = {
  getColors,
  createColor,
  deleteColor,
  getColor,
  updateColor,
};

export default colorService;
