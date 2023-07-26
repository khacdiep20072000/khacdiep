import axios from "axios";
import { base_url } from "utils/base_url";

const createEnquiry = async (enquiry) => {
  const res = await axios.post(`${base_url}enquiry`, enquiry);
  return res.data;
};

const contactService = {
  createEnquiry,
};

export default contactService;
