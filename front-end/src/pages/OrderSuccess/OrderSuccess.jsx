import React from "react";
import { AiOutlineCheck } from "react-icons/ai";
import "./OrderSuccess.css";
import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();
  return (
    <div className="order-success-wrapper home-wrapper-2 py-5">
      <div className="container-xxl">
        <div className="row d-flex cart align-items-center justify-content-center">
          <div className="col-sm-6">
            <div className="card py-5">
              <div className="text-center order-details">
                <div className="d-flex justify-content-center mb-5 flex-column align-items-center">
                  <span className="check1">
                    <AiOutlineCheck />
                  </span>
                  <span className="font-weight-bold">Order Confirmed</span>
                  <small className="mt-2">
                    Your illustraion will go to you soon
                  </small>
                </div>
                <button
                  onClick={() => navigate("/my-order", { replace: true })}
                  className="btn btn-danger btn-block order-button"
                >
                  Go to your Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
