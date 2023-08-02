import { getOrdersUser } from "Features/user/userSlice";
import BreadCrumb from "components/BreadCrumb/BreadCrumb";
import Meta from "components/Meta/Meta";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Order = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrdersUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const orderUser = useSelector((state) => state.auth.orderUser);

  return (
    <>
      <Meta title={"My order"} />
      <BreadCrumb title="My order" />

      <div className="login-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="row ">
                <div className="col-5 col-sm-4">
                  <h5>Product</h5>
                </div>
                <div className="d-none d-sm-inline-block col-3 text-center">
                  <h5>Quantity</h5>
                </div>
                <div className="col-3 text-center">
                  <h5>Total Amount</h5>
                </div>

                <div className="col-4 col-sm-2 text-center">
                  <h5>Delivery</h5>
                </div>
              </div>
            </div>

            <div className="col-12 mt-3">
              {orderUser
                ? orderUser.map((order) => (
                    <div
                      className="row my-3 border-bottom border-secondary"
                      key={order._id}
                    >
                      <div className="col-5 col-sm-4 ">
                        {order.orderItems.map((item) => (
                          <p key={item._id}>{item.product.title}</p>
                        ))}
                      </div>
                      <div className="d-none d-sm-inline-block col-sm-3 text-center">
                        {order.orderItems.map((item) => (
                          <p key={item._id}>{item.quantity}</p>
                        ))}
                      </div>
                      <div className="col-3 text-center">
                        <p>$ {order.totalPrice}</p>
                      </div>

                      <div className="col-4 col-sm-2 text-center">
                        <p>{order.orderStatus}</p>
                      </div>
                    </div>
                  ))
                : "No Data"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;
