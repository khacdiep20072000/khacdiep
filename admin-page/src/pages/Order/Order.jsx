import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { getOrders, updateOrder } from "features/auth/authSlice";
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
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Date",
    dataIndex: "date",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
];

const Order = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const orders = useSelector((state) => state.auth.orders);

  const handlerUpdateOrder = (order, id) => {
    const data = { id: id, orderData: order };
    dispatch(updateOrder(data));
    toast.success("Brand Updated Successfully!");
    dispatch(getOrders());
  };

  const data1 = [];
  for (let i = 0; i < orders.length; i++) {
    data1.push({
      key: i + 1,
      name: orders[i].orderby.name,
      product: <Link to={`/admin/orders/${orders[i]._id}`}>View Orders</Link>,
      amount:
        orders[i].paymentIntent.amount + " " + orders[i].paymentIntent.currency,
      date: new Date(orders[i].createdAt).toLocaleString("en-GB"),
      status: (
        <>
          <select
            name=""
            defaultValue={
              orders[i].orderStatus ? orders[i].orderStatus : "Cash on Delivery"
            }
            className="form-control form-select"
            id=""
            onChange={(e) => handlerUpdateOrder(e.target.value, orders[i]._id)}
          >
            <option value="Not Processed">Not Processed</option>
            <option value="Cash on Delivery">Cash on Delivery</option>
            <option value="Dispatched">Dispatched</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Delivered">Delivered</option>
          </select>
        </>
      ),
    });
  }
  return (
    <div>
      <h3 className="mb-4">Orders</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Order;
