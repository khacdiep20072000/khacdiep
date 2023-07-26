import axios from "axios";
import { config } from "utils/axiosconfig";
import { base_url } from "utils/base_url";

const getEnquiries = async () => {
  const res = await axios.get(`${base_url}enquiry`);
  return res.data;
};

const getEnquiry = async (enquiryId) => {
  const res = await axios.get(`${base_url}enquiry/${enquiryId}`);
  return res.data;
};

const deleteEnquiry = async (enquiryId) => {
  const res = await axios.delete(`${base_url}enquiry/${enquiryId}`, config);
  return res.data;
};

const updateEnquiry = async (enq) => {
  const res = await axios.put(
    `${base_url}enquiry/${enq.id}`,
    { status: enq.enqData },
    config
  );
  return res.data;
};

const enquiryService = {
  getEnquiries,
  deleteEnquiry,
  getEnquiry,
  updateEnquiry,
};

export default enquiryService;
