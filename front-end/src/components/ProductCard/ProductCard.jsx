import ReactStars from "react-rating-stars-component";
import React from "react";
import "./ProductCard.css";
import prodcompare from "../../images/prodcompare.svg";
import view from "../../images/view.svg";
import addcart from "../../images/add-cart.svg";
import wish from "../../images/wish.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToWishList } from "Features/product/productSlice";

const ProductCard = (props) => {
  const { grid, product } = props;
  const navigate = useNavigate();
  let location = useLocation();
  const dispatch = useDispatch();

  const handlerAddToWishlist = () => {
    dispatch(addToWishList(product._id));
  };

  return (
    <div
      className={` ${
        location.pathname === "/product" ? `gr-${grid}` : "col-3"
      } `}
    >
      <div className="product-card position-relative">
        <div className="wishlist-icon position-absolute z-3">
          <button
            className="border-0 bg-transparent"
            onClick={handlerAddToWishlist}
          >
            <img src={wish} alt="wishlist" />
          </button>
        </div>
        <div className="product-image">
          <img src={product?.images[0].url} className="img-fluid" alt="" />
        </div>
        <div className="product-details">
          <h6 className="brand">{product?.brand}</h6>
          <h5 className="product-title">{product?.title}</h5>
          <ReactStars
            count={5}
            size={24}
            value={parseInt(product?.totalRatings)}
            edit={false}
            activeColor="#ffd700"
          />

          <p
            className={`description ${grid === 12 ? "d-block" : "d-none"}`}
            dangerouslySetInnerHTML={{ __html: product?.description }}
          ></p>

          <p className="price">$ {product?.price}</p>
        </div>

        <div className="action-bar position-absolute">
          <div className="d-flex flex-column gap-15">
            <button className="border-0 bg-transparent">
              <img src={prodcompare} alt="compare" />
            </button>
            <button className="border-0 bg-transparent">
              <img
                src={view}
                alt="view"
                onClick={() => navigate(`/product/${[product._id]}`)}
              />
            </button>
            <button className="border-0 bg-transparent">
              <img src={addcart} alt="addcart" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
