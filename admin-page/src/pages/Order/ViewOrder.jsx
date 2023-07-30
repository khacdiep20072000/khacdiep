import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getOrder } from "features/auth/authSlice";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Product Name",
    dataIndex: "name",
  },
  {
    title: "Brand",
    dataIndex: "brand",
  },
  {
    title: "Count",
    dataIndex: "count",
  },
  {
    title: "Color",
    dataIndex: "color",
  },
  {
    title: "Price",
    dataIndex: "amount",
  },
  {
    title: "Date",
    dataIndex: "date",
  },
];

const ViewOrder = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const orderId = location.pathname.split("/")[3];
  useEffect(() => {
    dispatch(getOrder(orderId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const orderState = useSelector((state) => state.auth.productOrder);

  const data1 = orderState?.orderItems.map((items, index) => ({
    key: index + 1,
    name: items?.product.title,
    brand: items?.product?.brand,
    count: items?.quantity,
    amount: items?.price,
    color: (
      <span
        className="rounded-circle d-block"
        style={{
          backgroundColor: `${items?.color.title}`,
          width: "20px",
          height: "20px",
        }}
      ></span>
    ),
    date: new Date(items.product.createdAt).toLocaleString("en-GB"),
  }));

  return (
    <div>
      <h3 className="mb-4 title">View Order</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default ViewOrder;
