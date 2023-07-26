import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteColor, getColors, resetState } from "features/color/colorSlice";
import CustomModal from "components/CustomModal/CustomModal";

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
    title: "Action",
    dataIndex: "action",
  },
];

const ColorList = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [colorId, setColorId] = useState("");

  const showModal = (id) => {
    setOpen(true);
    setColorId(id);
  };

  const hideModal = () => {
    setOpen(false);
    setColorId("");
  };

  useEffect(() => {
    dispatch(getColors());
    dispatch(resetState());
  }, [dispatch]);

  const colors = useSelector((state) => state.color.colors);
  const data1 = [];
  for (let i = 0; i < colors.length; i++) {
    data1.push({
      key: i + 1,
      name: colors[i].title,
      action: (
        <>
          <Link
            to={`/admin/color/${colors[i]._id}`}
            className=" fs-3 text-danger"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(colors[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const handlerDeleteColor = (colorId) => {
    dispatch(deleteColor(colorId));
    setOpen(false);
    setTimeout(() => {
      dispatch(getColors());
    }, 100);
  };

  return (
    <div>
      <h3 className="mb-4">Colors</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>

      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          handlerDeleteColor(colorId);
        }}
        title="Are you sure you want to delete this color?"
      />
    </div>
  );
};

export default ColorList;
