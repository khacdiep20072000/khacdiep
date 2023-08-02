import ReactStars from "react-rating-stars-component";
import React, { useEffect, useState } from "react";
import "./ProductCard.css";
import view from "../../images/view.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToWishList } from "Features/product/productSlice";
import { getWishList } from "Features/user/userSlice";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const ProductCard = (props) => {
  const { grid, product } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handlerAddToWishlist = () => {
    setLiked((prev) => !prev);
    dispatch(addToWishList(product._id));
  };

  const wishlist = useSelector((state) => state.auth.wishList);
  const [liked, setLiked] = useState(
    wishlist?.some((item) => item._id === product._id)
  );

  useEffect(() => {
    setTimeout(() => {
      dispatch(getWishList());
    }, 300);
  }, [liked]);

  console.log(grid);

  return (
    <div
      className={` ${
        location.pathname === "/product"
          ? `gr-${grid}`
          : "col-12 col-sm-4 col-md-3"
      } `}
    >
      <div className="product-card position-relative">
        <div className="wishlist-icon position-absolute z-3">
          <button
            className={
              "border-0 bg-transparent " + (liked ? "text-danger" : " ")
            }
            onClick={handlerAddToWishlist}
          >
            {liked ? <AiFillHeart /> : <AiOutlineHeart />}
          </button>
        </div>
        <div className="product-image">
          <img src={product?.images[0].url} className="img-fluid" alt="" />
        </div>
        <div className="product-details">
          <h6 className="brand">{product?.brand}</h6>
          <Link to={`/product/${product._id}`} className="product-title">
            <h5 className="mb-0">{product?.title}</h5>
          </Link>
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
              <img
                src={view}
                alt="view"
                onClick={() => navigate(`/product/${[product._id]}`)}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
