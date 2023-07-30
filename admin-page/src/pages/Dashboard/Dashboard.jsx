import React, { useEffect, useState } from "react";
import { Column } from "@ant-design/plots";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getMonthOrders,
  getOrders,
  getYearOrders,
} from "features/auth/authSlice";

const Dashboard = () => {
  const [dataMonth, setDataMonth] = useState([]);
  const [dataOrder, setDataOrder] = useState([]);
  const dispatch = useDispatch();

  const monthOrders = useSelector((state) => state.auth.monthOrders);
  const yearOrders = useSelector((state) => state.auth.yearOrders);
  const orders = useSelector((state) => state.auth.orders);

  useEffect(() => {
    dispatch(getMonthOrders());
    dispatch(getYearOrders());
    dispatch(getOrders());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const data = monthOrders?.map((item) => {
      return {
        type: `Month ${item._id?.month}`,
        sales: item?.count,
        amount: item?.amount,
      };
    });
    setDataMonth(data);

    const data1 = orders?.map((order, index) => {
      return {
        key: index + 1,
        name: order?.shippingInfo?.name,
        product: order?.orderItems?.length,
        amount: order?.totalPrice,
        status: order?.orderStatus,
      };
    });
    setDataOrder(data1);
  }, [monthOrders, yearOrders, orders]);

  const config = {
    data: dataMonth ? dataMonth : [],
    xField: "type",
    yField: "sales",
    color: ({ type }) => {
      return "#ffd333";
    },
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Sales",
      },
    },
  };

  const config1 = {
    data: dataMonth ? dataMonth : [],
    xField: "type",
    yField: "amount",
    color: ({ type }) => {
      return "#ffd333";
    },
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Income",
      },
    },
  };

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
      title: "Order Quantity",
      dataIndex: "product",
    },
    {
      title: "Total Amount",
      dataIndex: "amount",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];

  return (
    <div>
      <h3 className="mb-4 title">Dashboard</h3>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex gap-3 justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p className="desc">Total Income</p>
            <h4 className="mb-0 sub-title">
              {yearOrders && yearOrders[0]?.amount}$
            </h4>
          </div>

          {/* <div className="d-flex flex-column align-items-end">
            <h6 className="red">
              <BsArrowDownRight /> 32%
            </h6>
            <p className="mb-0 desc">Compared to April 2022</p>
          </div> */}
        </div>
        <div className="d-flex gap-3 justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p className="desc">Total Sales</p>
            <h4 className="mb-0 sub-title">
              {yearOrders && yearOrders[0]?.count}
            </h4>
          </div>

          {/* <div className="d-flex flex-column align-items-end">
            <h6 className="red">
              <BsArrowDownRight />
              32%
            </h6>
            <p className="mb-0 desc">Compared to April 2022</p>
          </div> */}
        </div>
      </div>

      <div className="d-flex gap-3 justify-content-between">
        <div className="mt-4 w-50">
          <h3 className="mb-4">Sales Statics</h3>
          <div>
            <Column {...config} />
          </div>
        </div>

        <div className="mt-4 w-50">
          <h3 className="mb-4">Income Statics</h3>
          <div>
            <Column {...config1} />
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="mb-4">Recent Orders</h3>
        <div>
          <Table columns={columns} dataSource={dataOrder} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
