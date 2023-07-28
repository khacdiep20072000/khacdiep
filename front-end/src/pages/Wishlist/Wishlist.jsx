import React from "react";
import BreadCrumb from "components/BreadCrumb/BreadCrumb";
import Meta from "components/Meta/Meta";
import "./Wishlist.css";
import { useSelector } from "react-redux";
import ProductWishListCard from "components/ProductWishListCard/ProductWishListCard";

const Wishlist = () => {
  const wishlist = useSelector((state) => state.auth.wishList);

  return (
    <>
      <Meta title={"Wishlist"} />
      <BreadCrumb title="Wishlist" />
      <div className="wishlist-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            {wishlist.length > 0 ? (
              wishlist.map((w) => <ProductWishListCard key={w._id} data={w} />)
            ) : (
              <span className="text-center">No Product Favorite</span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Wishlist;
