/* eslint-disable array-callback-return */
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Marquee from "react-fast-marquee";

import "./Home.css";
import banner from "../../images/main-banner-1.jpg";
import catBanner1 from "../../images/catbanner-01.jpg";
import catBanner2 from "../../images/catbanner-02.jpg";
import catBanner3 from "../../images/catbanner-03.jpg";
import catBanner4 from "../../images/catbanner-04.jpg";
import services1 from "../../images/service.png";
import services2 from "../../images/service-02.png";
import services3 from "../../images/service-03.png";
import services4 from "../../images/service-04.png";
import services5 from "../../images/service-05.png";
import BlogCard from "components/BlogCard/BlogCard";
import ProductCard from "components/ProductCard/ProductCard";
import SpecialProduct from "components/SpecialProduct/SpecialProduct";
import famous1 from "../../images/famous-1.webp";
import famous2 from "../../images/famous-2.webp";
import famous3 from "../../images/famous-3.webp";
import famous4 from "../../images/famous-4.webp";
import { useDispatch, useSelector } from "react-redux";
import { getBrandProduct, getProducts } from "Features/product/productSlice";
import { getBlogs } from "Features/Blog/BlogSlice";
import { getCart, getWishList } from "Features/user/userSlice";
import { getAllCategories } from "Features/Category/CategorySlice";
import Meta from "components/Meta/Meta";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const currentUser = useSelector((state) => state.auth.user);
  const products = useSelector((state) => state.product.products);
  const blogs = useSelector((state) => state.blog.blogs);
  const brands = useSelector((state) => state.product.brandProduct);
  const categories = useSelector((state) => state.category.allCategories);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getBlogs());
    dispatch(getBrandProduct());
    dispatch(getAllCategories());
    dispatch(getCart());
    dispatch(getWishList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Meta title={"Hygge."} />

      <section className="home-wrapper-1 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-md-6 col-12">
              <div className="main-banner position-relative">
                <img src={banner} alt="" className="img-fluid rounded-3" />
                <div className="main-banner-content position-absolute">
                  <h4>SUPPER CHARGED FOR PROS.</h4>
                  <h5 className="d-none d-sm-block">Ipad S13+ Pro.</h5>
                  <h2 className="d-sm-none">Ipad S13+ Pro.</h2>
                  <p>From $999 or $41.62/mo.</p>
                  <Link className="button">
                    <span>Buy Now</span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-0">
              <div className="d-md-flex d-none flex-wrap gap-10 justify-content-between align-items-center">
                <div className="small-banner position-relative">
                  <img
                    src={catBanner1}
                    alt=""
                    className="img-fluid rounded-3"
                  />
                  <div className="small-banner-content position-absolute">
                    <h4>BEST SALE</h4>
                    <h5>MacBook Pro M2</h5>
                    <p>
                      From $999 <br /> or $41.62/mo.
                    </p>
                  </div>
                </div>

                <div className="small-banner position-relative">
                  <img
                    src={catBanner2}
                    alt=""
                    className="img-fluid rounded-3"
                  />
                  <div className="small-banner-content position-absolute">
                    <h4>new arrival</h4>
                    <h5>Buy Ipad Air</h5>
                    <p>
                      From $999 <br /> or $41.62/mo.
                    </p>
                  </div>
                </div>

                <div className="small-banner position-relative">
                  <img
                    src={catBanner3}
                    alt=""
                    className="img-fluid rounded-3"
                  />
                  <div className="small-banner-content position-absolute">
                    <h4>15% off</h4>
                    <h5>Smart watch 7</h5>
                    <p>
                      Shop the latest band <br /> styles and colors.
                    </p>
                  </div>
                </div>

                <div className="small-banner position-relative">
                  <img
                    src={catBanner4}
                    alt=""
                    className="img-fluid rounded-3"
                  />
                  <div className="small-banner-content position-absolute">
                    <h4>Free engraving</h4>
                    <h5>AirPods Max</h5>
                    <p>
                      High-fidelity playback <br /> & ultra-low distortion
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home-wrapper-2 py-md-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="services d-none d-md-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-15">
                  <img src={services1} alt="" />
                  <div>
                    <h6>Free Shipping</h6>
                    <p className="mb-0">From all order over $100</p>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-15">
                  <img src={services2} alt="" />
                  <div>
                    <h6>Daily Surprise Offers</h6>
                    <p className="mb-0">Save upto 25% off</p>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-15">
                  <img src={services3} alt="" />
                  <div>
                    <h6>Support 24/7</h6>
                    <p className="mb-0">Shop with an expert</p>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-15">
                  <img src={services4} alt="" />
                  <div>
                    <h6>Affordable Prices</h6>
                    <p className="mb-0">Get Factory Default Price</p>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-15">
                  <img src={services5} alt="" />
                  <div>
                    <h6>Secure Payments</h6>
                    <p className="mb-0">100% Protected Payments</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home-wrapper-2 py-sm-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="categories d-sm-flex d-none flex-wrap justify-content-between align-items-center">
                {categories &&
                  categories?.map((category) => (
                    <div
                      className="d-flex gap-30 flex-column flex-md-row align-items-center justify-content-center"
                      key={category._id}
                      onClick={() =>
                        navigate(
                          `/product?category=${category.title}&c_id=${category._id}`,
                          {
                            replace: true,
                          }
                        )
                      }
                    >
                      <div>
                        <h6>{category?.title}</h6>
                      </div>
                      <img src={category?.images[0].url} alt="" />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="featured-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading">Featured Collection</h3>
            </div>
          </div>

          <div className="row">
            {products &&
              products?.map((product) => {
                if (product.tags === "featured") {
                  return <ProductCard key={product._id} product={product} />;
                }
              })}
          </div>
        </div>
      </section>

      <section className="famous-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12 col-sm-6 col-md-3">
              <div className="famous-card position-relative">
                <img src={famous1} className="img-fluid" alt="famous" />
                <div className="famous-content position-absolute">
                  <h5>Big Screen</h5>
                  <h6>Smart Watch Series 7</h6>
                  <p>From $399or $16.62/mo. for 24 mo.*</p>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-md-3">
              <div className="d-none d-sm-block famous-card position-relative">
                <img src={famous2} className="img-fluid" alt="famous" />
                <div className="famous-content position-absolute">
                  <h5 className="text-dark">Studio Display</h5>
                  <h6 className="text-dark">600 nits of brightness.</h6>
                  <p className="text-dark">27-inch 5K Retina display</p>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="d-none d-md-block famous-card position-relative">
                <img src={famous3} className="img-fluid" alt="famous" />
                <div className="famous-content position-absolute">
                  <h5 className="text-dark">smartphones</h5>
                  <h6 className="text-dark">Smartphone 13 Pro.</h6>
                  <p className="text-dark">
                    Now in Green. From $999.00 or $41.62/mo. for 24 mo.
                    Footnote*
                  </p>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="d-none d-md-block famous-card position-relative">
                <img src={famous4} className="img-fluid" alt="famous" />
                <div className="famous-content position-absolute">
                  <h5 className="text-dark">home speakers</h5>
                  <h6 className="text-dark">Room-filling sound.</h6>
                  <p className="text-dark">
                    From $699 or $116.58/mo. for 12 mo.*
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="special-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading">Special Products</h3>
            </div>
          </div>

          <div className="row">
            {products &&
              products?.map((product) => {
                if (product.tags === "special") {
                  return <SpecialProduct key={product._id} product={product} />;
                }
              })}
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

      <section className="marque-wrapper py-sm-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="d-none d-sm-block marquee-inner-wrapper card-wrapper">
                <Marquee className="d-flex">
                  {brands &&
                    brands.map((brand) => (
                      <div className="mx-4 w-25" key={brand._id}>
                        <img src={brand?.images[0]?.url} alt="" />
                      </div>
                    ))}
                </Marquee>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="blog-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading">Our Blogs</h3>
            </div>

            {blogs &&
              blogs.map((blog) => (
                <div className="col-12 col-sm-4 col-md-3" key={blog._id}>
                  <BlogCard blog={blog} />
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
