import React from "react";
import newsletter from "../../images/newsletter.png";
import { Link } from "react-router-dom";
import "./Footer.css";
import {
  BsLinkedin,
  BsInstagram,
  BsFacebook,
  BsGithub,
  BsYoutube,
} from "react-icons/bs";

const Footer = () => {
  return (
    <>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-5">
              <div className="footer-top d-flex gap-30 align-items-center">
                <img src={newsletter} alt="" />
                <h4 className="text-white mb-0">Sign Up for Newsletter</h4>
              </div>
            </div>
            <div className="col-7">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control py-1"
                  placeholder="Your mail address"
                  aria-label="Your mail address"
                  aria-describedby="basic-addon2"
                />
                <span className="input-group-text p-2" id="basic-addon2">
                  Subscribe
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <footer className="py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-4">
              <h4 className="text-white mb-4">Contact Us</h4>
              <div>
                <address className="text-white fs-6">
                  Da Nang: 299 Nguyen Van Linh
                  <br />
                  PinCode: 43
                </address>

                <a
                  href="tel: +84 374 707 502"
                  className="mt-3 text-white d-block"
                >
                  +84 374 707 502
                </a>

                <a
                  href="mailto: khacdiep20062000@gmail.com"
                  className="mt-3 text-white d-block"
                >
                  khacdiep20062000@gmail.com
                </a>

                <div className="social_icons d-flex align-items-center mt-3 gap-30">
                  <a href="/">
                    <BsFacebook className="text-white fs-4" />
                  </a>
                  <a href="/">
                    <BsGithub className="text-white fs-4" />
                  </a>
                  <a href="/">
                    <BsInstagram className="text-white fs-4" />
                  </a>
                  <a href="/">
                    <BsLinkedin className="text-white fs-4" />
                  </a>
                  <a href="/">
                    <BsYoutube className="text-white fs-4" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-3">
              <h4 className="text-white mb-4">Information</h4>
              <div className="footer-links d-flex flex-column">
                <Link to="/privacy-policy" className="text-white py-2 mb-1">
                  Privacy Policy
                </Link>
                <Link to="/refund-policy" className="text-white py-2 mb-1">
                  Refund Policy
                </Link>
                <Link to="/shipping-policy" className="text-white py-2 mb-1">
                  Shipping Policy
                </Link>
                <Link to="/term-conditions" className="text-white py-2 mb-1">
                  Terms & Conditions
                </Link>
                <Link to="/blog" className="text-white py-2 mb-1">
                  Blogs
                </Link>
              </div>
            </div>
            <div className="col-3">
              <h4 className="text-white mb-4">Account</h4>
              <div className="footer-links d-flex flex-column">
                <Link to="/" className="text-white py-2 mb-1">
                  About Us
                </Link>
                <Link to="/" className="text-white py-2 mb-1">
                  Faq
                </Link>
                <Link to="/contact" className="text-white py-2 mb-1">
                  Contact
                </Link>
              </div>
            </div>
            <div className="col-2">
              <h4 className="text-white mb-4">Quick Links</h4>
              <div className="footer-links d-flex flex-column">
                <Link to="/" className="text-white py-2 mb-1">
                  Laptops
                </Link>
                <Link to="/" className="text-white py-2 mb-1">
                  HeadPhones
                </Link>
                <Link to="/" className="text-white py-2 mb-1">
                  Tablets
                </Link>
                <Link to="/" className="text-white py-2 mb-1">
                  Watch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <footer className="py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="text-center mb-0 text-white">
                &copy; {new Date().getFullYear()} Powered by Hygge.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
