import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useNavigate } from "react-router-dom";
import "./SpecialProduct.css";

const SpecialProduct = (props) => {
  const { product } = props;
  const navigate = useNavigate();

  return (
    <>
      <div className="col-6 mb-3">
        <div className="special-product-card">
          <div className="d-flex justify-content-between">
            <div>
              <img
                src={product?.images[0].url}
                className="img-fluid"
                alt="watch"
              />
            </div>
            <div className="special-product-content">
              <h5 className="brand">{product?.brand}</h5>
              <h6
                className="title"
                onClick={() => navigate(`/product/${[product._id]}`)}
              >
                {product?.title}
              </h6>
              <ReactStars
                count={5}
                size={24}
                value={parseInt(product?.totalRatings)}
                edit={false}
                activeColor="#ffd700"
              />
              <p className="price">
                <span className="red-p">${product?.price}</span> &nbsp;{" "}
                <strike>${product?.price + 80}</strike>
              </p>
              <div className="discount-till d-flex align-items-center gap-10">
                <p className="mb-0">
                  <b>5 </b>days
                </p>
                <div className="d-flex gap-10 align-items-center">
                  <span className="badge rounded-circle p-3 bg-danger">1</span>:
                  <span className="badge rounded-circle p-3 bg-danger">1</span>:
                  <span className="badge rounded-circle p-3 bg-danger">1</span>
                </div>
              </div>
              <div className="prod-count my-3">
                <p>Products: {product?.quantity}</p>
                <div className="progress">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{
                      width:
                        (product?.sold / (product?.quantity + product?.sold)) *
                          100 +
                        "%",
                    }}
                    aria-valuenow={
                      (product?.sold / (product?.quantity + product?.sold)) *
                      100
                    }
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
              <Link className="button">
                <span className="text-black">Add to Cart</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SpecialProduct;
