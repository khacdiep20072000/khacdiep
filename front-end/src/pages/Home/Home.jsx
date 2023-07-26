/* eslint-disable array-callback-return */
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
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
import camera from "../../images/camera.jpg";
import smartTv from "../../images/tv.jpg";
import smartWatch from "../../images/headphone.jpg";
import music from "../../images/speaker.jpg";
import brand1 from "../../images/brand-01.png";
import brand2 from "../../images/brand-02.png";
import brand3 from "../../images/brand-03.png";
import brand4 from "../../images/brand-04.png";
import brand5 from "../../images/brand-05.png";
import brand6 from "../../images/brand-06.png";
import brand7 from "../../images/brand-07.png";
import brand8 from "../../images/brand-08.png";
import BlogCard from "components/BlogCard/BlogCard";
import ProductCard from "components/ProductCard/ProductCard";
import SpecialProduct from "components/SpecialProduct/SpecialProduct";
import famous1 from "../../images/famous-1.webp";
import famous2 from "../../images/famous-2.webp";
import famous3 from "../../images/famous-3.webp";
import famous4 from "../../images/famous-4.webp";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "Features/product/productSlice";
import { getBlogs } from "Features/Blog/BlogSlice";
import { getCart } from "Features/user/userSlice";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getBlogs());
    dispatch(getCart());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const products = useSelector((state) => state.product.products);
  // const blogs = useSelector((state) => state.blog.blogs);

  return (
    <>
      <section className="home-wrapper-1 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <div className="main-banner position-relative">
                <img src={banner} alt="" className="img-fluid rounded-3" />
                <div className="main-banner-content position-absolute">
                  <h4>SUPPER CHARGED FOR PROS.</h4>
                  <h5>Ipad S13+ Pro.</h5>
                  <p>From $999 or $41.62/mo.</p>
                  <Link className="button">
                    <span>Buy Now</span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-6">
              <div className="d-flex flex-wrap gap-10 justify-content-between align-items-center">
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

      <section className="home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="services d-flex align-items-center justify-content-between">
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

      <section className="home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="categories d-flex flex-wrap justify-content-between align-items-center">
                <div className="d-flex gap-30 align-items-center justify-content-center">
                  <div>
                    <h6>Camera</h6>
                    <p>10 items</p>
                  </div>
                  <img src={camera} alt="" />
                </div>

                <div className="d-flex gap-30 align-items-center justify-content-center">
                  <div>
                    <h6>Smart Tv</h6>
                    <p>10 items</p>
                  </div>
                  <img src={smartTv} alt="" />
                </div>

                <div className="d-flex gap-30 align-items-center justify-content-center">
                  <div>
                    <h6>Smart Watch</h6>
                    <p>10 items</p>
                  </div>
                  <img src={smartWatch} alt="" />
                </div>

                <div className="d-flex gap-30 align-items-center justify-content-center">
                  <div>
                    <h6>Music & Gaming</h6>
                    <p>10 items</p>
                  </div>
                  <img src={music} alt="" />
                </div>

                <div className="d-flex gap-30 align-items-center justify-content-center">
                  <div>
                    <h6>Camera</h6>
                    <p>10 items</p>
                  </div>
                  <img src={camera} alt="" />
                </div>

                <div className="d-flex gap-30 align-items-center justify-content-center">
                  <div>
                    <h6>Smart Tv</h6>
                    <p>10 items</p>
                  </div>
                  <img src={smartTv} alt="" />
                </div>

                <div className="d-flex gap-30 align-items-center justify-content-center">
                  <div>
                    <h6>Smart Watch</h6>
                    <p>10 items</p>
                  </div>
                  <img src={smartWatch} alt="" />
                </div>

                <div className="d-flex gap-30 align-items-center justify-content-center">
                  <div>
                    <h6>Music & Gaming</h6>
                    <p>10 items</p>
                  </div>
                  <img src={music} alt="" />
                </div>
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
            <div className="col-3">
              <div className="famous-card position-relative">
                <img src={famous1} className="img-fluid" alt="famous" />
                <div className="famous-content position-absolute">
                  <h5>Big Screen</h5>
                  <h6>Smart Watch Series 7</h6>
                  <p>From $399or $16.62/mo. for 24 mo.*</p>
                </div>
              </div>
            </div>

            <div className="col-3">
              <div className="famous-card position-relative">
                <img src={famous2} className="img-fluid" alt="famous" />
                <div className="famous-content position-absolute">
                  <h5 className="text-dark">Studio Display</h5>
                  <h6 className="text-dark">600 nits of brightness.</h6>
                  <p className="text-dark">27-inch 5K Retina display</p>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="famous-card position-relative">
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
              <div className="famous-card position-relative">
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

      <section className="marque-wrapper py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="marquee-inner-wrapper card-wrapper">
                <Marquee className="d-flex">
                  <div className="mx-4 w-25">
                    <img src={brand1} alt="" />
                  </div>

                  <div className="mx-4 w-25">
                    <img src={brand2} alt="" />
                  </div>

                  <div className="mx-4 w-25">
                    <img src={brand3} alt="" />
                  </div>

                  <div className="mx-4 w-25">
                    <img src={brand4} alt="" />
                  </div>

                  <div className="mx-4 w-25">
                    <img src={brand5} alt="" />
                  </div>

                  <div className="mx-4 w-25">
                    <img src={brand6} alt="" />
                  </div>

                  <div className="mx-4 w-25">
                    <img src={brand7} alt="" />
                  </div>

                  <div className="mx-4 w-25">
                    <img src={brand8} alt="" />
                  </div>
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
              <h3 className="section-heading">Our Latest Blogs</h3>
            </div>

            {/* {blogs && blogs.map(blog =>)} */}
            <div className="col-3">
              <BlogCard />
            </div>
            <div className="col-3">
              <BlogCard />
            </div>
            <div className="col-3">
              <BlogCard />
            </div>
            <div className="col-3">
              <BlogCard />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
