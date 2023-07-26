import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteEnquiry,
  getEnquiries,
  resetState,
  updateEnquiry,
} from "features/enquiry/enquirySlice";
import { AiFillDelete, AiOutlineEye } from "react-icons/ai";
import CustomModal from "components/CustomModal/CustomModal";
import { toast } from "react-toastify";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
  },
  {
    title: "Status",
    dataIndex: "status",
  },

  {
    title: "Action",
    dataIndex: "action",
  },
];

const Enquiries = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [enquiryId, setEnquiryId] = useState("");

  useEffect(() => {
    dispatch(resetState());
    dispatch(getEnquiries());
  }, [dispatch]);

  const showModal = (id) => {
    setOpen(true);
    setEnquiryId(id);
  };

  const hideModal = () => {
    setOpen(false);
    setEnquiryId("");
  };

  const enquiries = useSelector((state) => state.enquiry.enquiries);
  const enqState = useSelector((state) => state.enquiry);
  const { isSuccess, isError, isLoading, updatedEnquiry } = enqState;

  useEffect(() => {
    if (isSuccess && updatedEnquiry) {
      toast.success("Brand Updated Successfully!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isError, isLoading, updatedEnquiry]);

  const setEnquiryStatus = (status, id) => {
    const data = { id: id, enqData: status };
    dispatch(updateEnquiry(data));
    setTimeout(() => {
      dispatch(resetState());
    }, 100);
    setTimeout(() => {
      dispatch(getEnquiries());
    }, 1000);
  };

  const data1 = [];
  for (let i = 0; i < enquiries.length; i++) {
    data1.push({
      key: i + 1,
      name: enquiries[i].name,
      email: enquiries[i].email,
      mobile: enquiries[i].mobile,
      status: (
        <>
          <select
            name=""
            defaultValue={
              enquiries[i].status ? enquiries[i].status : "Submitted"
            }
            className="form-control form-select"
            id=""
            onChange={(e) => setEnquiryStatus(e.target.value, enquiries[i]._id)}
          >
            <option value="Submitted">Submitted</option>
            <option value="Contacted">Contacted</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </>
      ),
      action: (
        <>
          <Link
            className="ms-3 fs-3 text-danger"
            to={`/admin/enquiries/${enquiries[i]._id}`}
          >
            <AiOutlineEye />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(enquiries[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const handlerDeleteEnquiry = (enquiryId) => {
    dispatch(deleteEnquiry(enquiryId));
    setOpen(false);
    setTimeout(() => {
      dispatch(getEnquiries());
    }, 100);
  };

  return (
    <div>
      <h3 className="mb-4">Enquiries</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>

      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          handlerDeleteEnquiry(enquiryId);
        }}
        title="Are you sure you want to delete this enquiry?"
      />
    </div>
  );
};

export default Enquiries;
