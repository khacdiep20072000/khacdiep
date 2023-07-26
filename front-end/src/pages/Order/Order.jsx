import { getOrdersUser } from "Features/user/userSlice";
import BreadCrumb from "components/BreadCrumb/BreadCrumb";
import Meta from "components/Meta/Meta";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Order = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrdersUser());
  }, []);

  const orderUser = useSelector((state) => state.auth.orderUser);

  console.log(orderUser);

  return (
    <>
      <Meta title={"My order"} />
      <BreadCrumb title="My order" />

      <div className="login-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="row ">
                <div className="col-3">
                  <h5>Product</h5>
                </div>
                <div className="col-2 text-center">
                  <h5>Quantity</h5>
                </div>
                <div className="col-2 text-center">
                  <h5>Total Amount</h5>
                </div>
                <div className="col-3">
                  <h5>Total Amount after Discount</h5>
                </div>
                <div className="col-1">
                  <h5>Delivery</h5>
                </div>
              </div>
            </div>

            <div className="col-12 mt-3">
              {orderUser
                ? orderUser.map((order) => (
                    <div className="row my-3 border-bottom border-secondary">
                      <div className="col-3">
                        {order.orderItems.map((item) => (
                          <p>{item.product.title}</p>
                        ))}
                      </div>
                      <div className="col-2 text-center">
                        {order.orderItems.map((item) => (
                          <p>{item.quantity}</p>
                        ))}
                      </div>
                      <div className="col-2 text-center">
                        <p>$ {order.totalPrice}</p>
                      </div>
                      <div className="col-3">Total Amount after Discount</div>
                      <div className="col-2">
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
