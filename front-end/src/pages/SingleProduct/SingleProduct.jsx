/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import BreadCrumb from "components/BreadCrumb/BreadCrumb";
import Meta from "components/Meta/Meta";
import ReactStars from "react-rating-stars-component";
import Color from "components/Color/Color";
import { TbGitCompare } from "react-icons/tb";
import { AiOutlineHeart } from "react-icons/ai";
import "./SingleProduct.css";
import ProductCard from "components/ProductCard/ProductCard";
import { toast } from "react-toastify";
import Zoom from "react-img-zoom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getProduct, reviewProduct } from "Features/product/productSlice";
import {
  addToCart,
  getCart,
  updateQuantityProductAddToCart,
} from "Features/user/userSlice";

const SingleProduct = (props) => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const [orderedProduct, setOrderedProduct] = useState(true);
  const [color, setColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cartId, setCartId] = useState(null);
  const [alreadyAdded, setAlreadyAdded] = useState(false);
  const [rating, setRating] = useState(0);

  const copyToClipboard = (text) => {
    console.log("text", text);
    const textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };

  useEffect(() => {
    dispatch(getProduct(productId));
    dispatch(getCart());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    for (let i = 0; i < cart?.length; i++) {
      if (productId === cart[i]?.product?._id) {
        setAlreadyAdded(true);
        setCartId(cart[i]._id);
      }
    }
  }, []);

  const product = useSelector((state) => state.product.product);
  const cart = useSelector((state) => state.auth.cartUser);
  const products = useSelector((state) => state.product.products);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      comment: "",
    },
    onSubmit: (values) => {
      dispatch(
        reviewProduct({
          productId: product._id,
          star: rating,
          comment: values.comment,
        })
      );
      setTimeout(() => {
        dispatch(getProduct(productId));
      }, 300);
    },
  });

  const handlerAddToCard = () => {
    if (color === null) {
      toast.error("Please Choose Color!");
      return false;
    }
    if (alreadyAdded === false) {
      const newCart = {
        product: product._id,
        quantity: quantity,
        color: color,
        price: product.price,
      };
      dispatch(addToCart(newCart));
    } else {
      const data = { newQuantity: quantity, cartId: cartId };
      dispatch(updateQuantityProductAddToCart(data));
      setTimeout(() => dispatch(getCart()), [300]);
    }
  };

  return (
    <>
      <Meta title={"Product Name"} />
      <BreadCrumb title="Product Name" />

      <div className="main-product-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <div className="main-product-image">
                <div>
                  <Zoom
                    img={product?.images[0]?.url}
                    height={500}
                    width={600}
                    zoomScale={2}
                  />
                </div>
              </div>
              <div className="other-product-images d-flex flex-wrap gap-15">
                {product?.images.map((image, index) => (
                  <div key={index}>
                    <img src={image.url} className="img-fluid" alt="" />
                  </div>
                ))}
              </div>
            </div>
            <div className="col-6">
              <div className="main-product-details">
                <div className="border-bottom">
                  <h3 className="title">{product?.title}</h3>
                </div>
                <div className="border-bottom py-3">
                  <p className="price">$ {product?.price}</p>
                  <div className="d-flex align-items-center gap-10">
                    <ReactStars
                      count={5}
                      size={24}
                      value={parseInt(product?.totalRatings)}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <p className="mb-0 t-review">
                      ( {product?.ratings?.length} Reviews )
                    </p>
                  </div>
                  <a className="review-btn" href="#review">
                    Write a Review
                  </a>
                </div>

                <div className=" py-3">
                  <div className="d-flex gap-10 align-items-center my-2">
                    <h3 className="product-heading">Type :</h3>
                    <p className="product-data">Watch</p>
                  </div>
                  <div className="d-flex gap-10 align-items-center my-2">
                    <h3 className="product-heading">Brand :</h3>
                    <p className="product-data">{product?.brand}</p>
                  </div>
                  <div className="d-flex gap-10 align-items-center my-2">
                    <h3 className="product-heading">Category :</h3>
                    <p className="product-data">{product?.category}</p>
                  </div>
                  <div className="d-flex gap-10 align-items-center my-2">
                    <h3 className="product-heading">Tags :</h3>
                    <p className="product-data">{product?.tags}</p>
                  </div>
                  <div className="d-flex gap-10 align-items-center my-2">
                    <h3 className="product-heading">Availablity :</h3>
                    <p className="product-data">In Stock</p>
                  </div>

                  {product?.size ? (
                    <div className="d-flex gap-10 flex-column mt-2 mb-3">
                      <h3 className="product-heading">Size :</h3>
                      <div className="d-flex flex-wrap gap-15">
                        <span className="badge border border-1 bg-white text-dark border-secondary">
                          S
                        </span>
                        <span className="badge border border-1 bg-white text-dark border-secondary">
                          M
                        </span>
                        <span className="badge border border-1 bg-white text-dark border-secondary">
                          XL
                        </span>
                        <span className="badge border border-1 bg-white text-dark border-secondary">
                          XXL
                        </span>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}

                  <div className="d-flex gap-10 flex-column mt-2 mb-3">
                    <h3 className="product-heading">Color :</h3>
                    <Color setColor={setColor} color={product?.color} />
                  </div>
                  <div className="d-flex align-items-center gap-15 flex-row mt-2 mb-3">
                    <h3 className="product-heading">Quantity :</h3>
                    <div className="">
                      <input
                        type="number"
                        name=""
                        min={1}
                        max={10}
                        className="form-control"
                        style={{ width: "70px" }}
                        id=""
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                      />
                    </div>
                    <div className="d-flex align-items-center gap-30 ms-5">
                      <button
                        className="button"
                        type="button"
                        onClick={() => handlerAddToCard()}
                      >
                        <span>Add to Cart</span>
                      </button>
                      <button className="button signup">
                        <span>Buy It Now</span>
                      </button>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-15">
                    <div>
                      <a href="">
                        <TbGitCompare className="fs-5 me-2" /> Add to Compare
                      </a>
                    </div>
                    <div>
                      <a href="">
                        <AiOutlineHeart className="fs-5 me-2" /> Add to Wishlist
                      </a>
                    </div>
                  </div>
                  <div className="d-flex gap-10 flex-column  my-3">
                    <h3 className="product-heading">Shipping & Returns :</h3>
                    <p className="product-data">
                      Free shipping and returns available on all orders! <br />{" "}
                      We ship all US domestic orders within
                      <b>5-10 business days!</b>
                    </p>
                  </div>
                  <div className="d-flex gap-10 align-items-center my-3">
                    <h3 className="product-heading">Product Link:</h3>
                    <a
                      // href="javascript:void(0);"
                      onClick={() => {
                        copyToClipboard(window.location.href);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      Copy Product Link
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="description-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h4>Description</h4>
              <div className="bg-white p-3">
                <p
                  dangerouslySetInnerHTML={{ __html: product?.description }}
                ></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="reviews-wrapper home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 id="review">Reviews</h3>
              <div className="review-inner-wrapper">
                <div className="review-head d-flex justify-content-between align-items-end">
                  <div>
                    <h4 className="mb-2">Customer Reviews</h4>
                    <div className="d-flex align-items-center gap-10">
                      <ReactStars
                        count={5}
                        size={24}
                        value={parseInt(product?.totalRatings)}
                        edit={false}
                        activeColor="#ffd700"
                      />
                      <p className="mb-0">
                        Based on {product?.ratings?.length} Reviews
                      </p>
                    </div>
                  </div>
                  {orderedProduct && (
                    <div>
                      <a
                        className="text-dark text-decoration-underline"
                        href="#"
                      >
                        Write a Review
                      </a>
                    </div>
                  )}
                </div>
                <div className="review-form py-4">
                  <h4>Write a Review</h4>
                  <form
                    action=""
                    className="d-flex flex-column gap-15"
                    onSubmit={formik.handleSubmit}
                  >
                    <div>
                      <ReactStars
                        count={5}
                        size={24}
                        edit={true}
                        activeColor="#ffd700"
                        value={rating}
                        onChange={(e) => setRating(e)}
                      />
                    </div>
                    <div>
                      <textarea
                        name=""
                        id=""
                        className="w-100 form-control"
                        cols="30"
                        rows="4"
                        placeholder="Comments"
                        onChange={formik.handleChange("comment")}
                        onBlur={formik.handleBlur("comment")}
                        value={formik.values.comment}
                      ></textarea>
                    </div>
                    <div className="d-flex justify-content-end">
                      <button className="button" type="submit">
                        <span>Submit Review</span>
                      </button>
                    </div>
                  </form>
                </div>
                <div className="reviews mt-4">
                  {product &&
                    product?.ratings?.map((rating) => (
                      <div className="review" key={rating._id}>
                        <div className="d-flex gap-10 align-items-center">
                          <h6 className="mb-0">{rating?.postedby.name}</h6>
                          <ReactStars
                            count={5}
                            size={24}
                            value={parseInt(rating?.star)}
                            edit={false}
                            activeColor="#ffd700"
                          />
                        </div>
                        <p className="mt-3">{rating?.comment}</p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="popular-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading">Our Popular Products</h3>
            </div>
          </div>
          <div className="row">
            {products &&
              products?.map((product) => {
                if (product.tags === "popular") {
                  return <ProductCard key={product._id} product={product} />;
                }
              })}
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleProduct;