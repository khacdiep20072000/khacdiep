import React, { useEffect, useState } from "react";
import BreadCrumb from "components/BreadCrumb/BreadCrumb";
import Meta from "components/Meta/Meta";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import "./Cart.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProductFromCart,
  getCart,
  updateQuantityProductFromCart,
} from "Features/user/userSlice";
import { toast } from "react-toastify";

const Cart = () => {
  const dispatch = useDispatch();
  const [totalAmount, setTotalAmount] = useState(0);

  const cart = useSelector((state) => state.auth.cartUser);

  const handlerDeleteProduct = (id) => {
    dispatch(deleteProductFromCart(id));
    setTimeout(() => dispatch(getCart()), [300]);
  };

  const handlerUpdateQuantity = (quantity, cartId) => {
    const data = { newQuantity: quantity, cartId: cartId };
    dispatch(updateQuantityProductFromCart(data));
    setTimeout(() => {
      dispatch(getCart());
    }, 200);
    setTimeout(() => toast.success("Quantity updated successfully."), [300]);
  };

  useEffect(() => {
    let sum = 0;
    for (let i = 0; i < cart?.length; i++) {
      sum += +cart[i].quantity * +cart[i].price;
    }
    setTotalAmount(sum);
  }, [cart]);

  return (
    <>
      <Meta title={"Cart"} />
      <BreadCrumb title="Cart" />

      <div className="cart-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="cart-header py-3 d-flex justify-content-between align-items-center">
                <h4 className="col-5">Product</h4>
                <h4 className="col-2">Price</h4>
                <h4 className="col-3">Quantity</h4>
                <h4 className="d-none d-sm-flex col-2">Total</h4>
              </div>

              {cart ? (
                cart?.map((c) => (
                  <div
                    key={c._id}
                    className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center"
                  >
                    <div className="col-5 gap-15 d-flex align-items-center">
                      <div className="d-none d-sm-flex w-25">
                        <img
                          src={c.product.images[0].url}
                          className="img-fluid"
                          alt="product"
                        />
                      </div>
                      <div className="w-75 me-2">
                        <p>{c.product.title}</p>
                        {c.product.size ? <p>Size: {c.product.size}</p> : ""}
                        <p className="d-flex align-items-center gap-3">
                          Color:
                          <span
                            className="rounded-circle "
                            style={{
                              backgroundColor: c.color.title,
                              width: "20px",
                              height: "20px",
                            }}
                          ></span>
                        </p>
                      </div>
                    </div>

                    <div className="col-2">
                      <h5 className="price w-100">$ {c.price}</h5>
                    </div>

                    <div className="col-3 d-flex align-items-center gap-15">
                      <div>
                        <input
                          className="form-control"
                          type="number"
                          name=""
                          min={1}
                          max={10}
                          id=""
                          defaultValue={c.quantity}
                          onChange={(e) =>
                            handlerUpdateQuantity(e.target.value, c._id)
                          }
                        />
                      </div>
                      <div onClick={() => handlerDeleteProduct(c?._id)}>
                        <AiFillDelete className="text-danger " />
                      </div>
                    </div>
                    <div className="d-none d-sm-flex col-2">
                      <h5 className="price">$ {c.quantity * c.price}</h5>
                    </div>
                  </div>
                ))
              ) : (
                <span>No data</span>
              )}
            </div>
            <div className="col-12 py-2 mt-4">
              <div className="d-flex flex-column justify-content-between align-items-baseline">
                <div className="d-sm-flex justify-content-between w-100">
                  <div>
                    <h4>SubTotal: $ {totalAmount}</h4>
                    <p>Taxes and shipping calculated at checkout</p>
                  </div>

                  <div>
                    <Link to="/checkout" className="button">
                      <span>Checkout</span>
                    </Link>
                  </div>
                </div>
                <Link to="/product" className="text-danger border-bottom mt-3">
                  <span>Continue To Shopping</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
