import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteBrand, getBrands, resetState } from "features/brand/brandSlice";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import CustomModal from "components/CustomModal/CustomModal";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const BrandList = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [brandId, setBrandId] = useState("");
  useEffect(() => {
    dispatch(resetState());
    dispatch(getBrands());
  }, [dispatch]);

  const showModal = (id) => {
    setOpen(true);
    setBrandId(id);
  };

  const hideModal = () => {
    setOpen(false);
    setBrandId("");
  };

  const brands = useSelector((state) => state.brand.brands);

  const data1 = [];
  for (let i = 0; i < brands.length; i++) {
    data1.push({
      key: i + 1,
      name: brands[i].title,
      action: (
        <>
          <Link
            to={`/admin/brand/${brands[i]._id}`}
            className=" fs-3 text-danger"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(brands[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const handlerDeleteBrand = (brandId) => {
    dispatch(deleteBrand(brandId));
    setOpen(false);
    setTimeout(() => {
      dispatch(getBrands());
    }, 100);
  };

  return (
    <div>
      <h3 className="mb-4">Brands</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>

      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          handlerDeleteBrand(brandId);
        }}
        title="Are you sure you want to delete this brand?"
      />
    </div>
  );
};

export default BrandList;
