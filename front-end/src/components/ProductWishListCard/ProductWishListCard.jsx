import React from "react";
import cross from "../../images/cross.svg";
import { useDispatch } from "react-redux";
import { addToWishList } from "Features/product/productSlice";
import "./ProductWishListCard.css";

const ProductWishListCard = (props) => {
  const { data } = props;
  const dispatch = useDispatch();

  const handlerDeleteWishlist = () => {
    dispatch(addToWishList(data._id));
    window.location.reload();
  };

  return (
    <div className="col-3">
      <div className="wishlist-card position-relative">
        <img
          src={cross}
          alt="cross"
          className="position-absolute cross img-fluid"
          onClick={handlerDeleteWishlist}
        />
        <div className="wishlist-card-image">
          <img
            src={data.images[0].url}
            className="img-fluid w-100"
            alt="watch"
          />
        </div>
        <div className="py-3 px-3">
          <h5 className="title">{data.title}</h5>
          <h6 className="price">$ {data.price}</h6>
        </div>
      </div>
    </div>
  );
};

export default ProductWishListCard;
