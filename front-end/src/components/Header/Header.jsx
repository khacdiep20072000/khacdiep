import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import compare from "../../images/compare.svg";
import wishlist from "../../images/wishlist.svg";
import user from "../../images/user.svg";
import cartIcon from "../../images/cart.svg";
import menu from "../../images/menu.svg";
import "./Header.css";
import { useSelector } from "react-redux";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";

const Header = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();
  const [paginate, setPaginate] = useState(true);
  const [productOptions, setProductOptions] = useState([]);
  const currentUser = useSelector((state) => state.auth.user);
  const cart = useSelector((state) => state.auth.cartUser);
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    let sum = 0;
    for (let i = 0; i < cart?.length; i++) {
      sum += +cart[i].quantity * +cart[i].price;
    }
    setTotalAmount(sum);
  }, [cart]);

  useEffect(() => {
    let data = [];
    products?.map((product, index) =>
      data.push({ id: index, prod: product?._id, name: product?.title })
    );
    setProductOptions(data);
  }, [products]);

  const handlerLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <>
      <header className="header-top-strip py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="d-none d-md-block col-sm-6">
              <p className="text-white mb-0">
                Free Shipping Over $100 & Free Returns
              </p>
            </div>

            <div className="col-sm-6 col-0">
              <p className="d-sm-block d-none text-md-end text-white mb-0">
                Hotline:
                <a className="text-white" href="tel:+84 374 707 502">
                  +84374707502
                </a>
              </p>
            </div>

            <div className="d-block d-sm-none col-5">
              <h2>
                <Link to="/" className="text-white">
                  Hygge.
                </Link>
              </h2>
            </div>

            <div className="d-flex justify-content-end col-md-0 col-7 col-sm-6">
              {currentUser ? (
                <div className="d-md-none d-flex align-items-center justify-content-end gap-10 text-white dropdown show">
                  <Link
                    className="d-flex align-items-center gap-10 text-white"
                    href="#"
                    role="button"
                    id="dropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <p className="mb-0">{currentUser.name}</p>
                  </Link>

                  <div
                    className="dropdown-menu mt-4"
                    aria-labelledby="dropdownMenuLink"
                  >
                    <Link
                      className="dropdown-item"
                      style={{ height: "auto", lineHeight: "20px" }}
                      to="/my-profile"
                    >
                      View Profile
                    </Link>

                    <Link
                      className="dropdown-item"
                      style={{ height: "auto", lineHeight: "20px" }}
                      to="/my-order"
                    >
                      My Order
                    </Link>

                    <button
                      className="dropdown-item"
                      style={{ height: "auto", lineHeight: "20px" }}
                      onClick={() => handlerLogout()}
                    >
                      Signout
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <Link
                    to="/login"
                    className="d-md-none justify-content-end d-flex  align-items-center gap-10 text-white"
                  >
                    <div className="">
                      <p className="mb-0">
                        <Link className="text-white " to="/login">
                          Login
                        </Link>
                      </p>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <header className="header-upper py-3">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="d-sm-block d-none col-md-2 col-3">
              <h2>
                <Link to="/" className="text-white">
                  Hygge.
                </Link>
              </h2>
            </div>

            <div className="col-9 col-sm-7 col-md-5">
              <div className="d-flex input-group">
                <Typeahead
                  id="pagination-example"
                  onPaginate={() => console.log("Results paginated")}
                  options={productOptions}
                  labelKey={"name"}
                  paginate={paginate}
                  minLength={2}
                  onChange={(selected) => {
                    if (selected.length !== 0)
                      navigate(`/product/${selected[0].prod}`, {
                        replace: true,
                      });
                  }}
                  placeholder="Search in Hygge."
                />

                <span className="input-group-text p-3" id="basic-addon2">
                  <BsSearch className="fs-6" />
                </span>
              </div>
            </div>
            <div className="col-3 col-sm-2 col-md-5 ">
              <div className="header-upper-links d-flex align-items-center justify-content-between ">
                <div>
                  <Link
                    to="/compare-product"
                    className="d-md-flex d-none align-items-center gap-10 text-white"
                  >
                    <img src={compare} alt="compare img" />
                    <p className="mb-0">Compare</p>
                  </Link>
                </div>

                <Link
                  to="/wishlist"
                  className="d-md-flex d-none align-items-center gap-10 text-white"
                >
                  <img src={wishlist} alt="wishlist img" />
                  <p className="mb-0">Wishlist</p>
                </Link>

                {currentUser ? (
                  <div className="d-md-flex d-none align-items-center gap-10 text-white dropdown show">
                    <Link
                      className="d-flex align-items-center gap-10 text-white"
                      href="#"
                      role="button"
                      id="dropdownMenuLink"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <img src={user} alt="user img" />
                      <p className="mb-0">{currentUser.name}</p>
                    </Link>

                    <div
                      className="dropdown-menu mt-4"
                      aria-labelledby="dropdownMenuLink"
                    >
                      <Link
                        className="dropdown-item"
                        style={{ height: "auto", lineHeight: "20px" }}
                        to="/my-profile"
                      >
                        View Profile
                      </Link>

                      <Link
                        className="dropdown-item"
                        style={{ height: "auto", lineHeight: "20px" }}
                        to="/my-order"
                      >
                        My Order
                      </Link>

                      <button
                        className="dropdown-item"
                        style={{ height: "auto", lineHeight: "20px" }}
                        onClick={() => handlerLogout()}
                      >
                        Signout
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <Link
                      to="/login"
                      className="d-md-flex d-none align-items-center gap-10 text-white"
                    >
                      <img src={user} alt="user img" />
                      <div className="d-flex flex-column gap-10">
                        <p className="mb-0">
                          <Link className="text-white" to="/login">
                            Login
                          </Link>{" "}
                          <br />
                          <Link className="text-white" to="/register">
                            Register
                          </Link>
                        </p>
                      </div>
                    </Link>
                  </div>
                )}

                <div>
                  <Link
                    to="/cart"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={cartIcon} alt="cart img" />
                    <div className="d-flex flex-column gap-10">
                      <span className="badge bg-white text-dark">
                        {cart?.length || 0}
                      </span>
                      <p className="d-none d-sm-flex mb-0">${totalAmount}</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <header className="header-bottom py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="menu-bottom d-sm-flex align-items-center gap-30">
                <div>
                  <div className="d-none d-sm-flex btn btn-secondary bg-transparent border-0 gap-15 d-flex align-items-center">
                    <img src={menu} alt="" />
                    <span>Shop Categories</span>
                  </div>
                </div>
                <div className="menu-links">
                  <div className="d-flex justify-content-between align-items-center gap-15">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/product">Our Store</NavLink>
                    <NavLink to="/blog">Blogs</NavLink>
                    <NavLink to="/contact">Contact</NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
