import React from "react";
import BreadCrumb from "components/BreadCrumb/BreadCrumb";
import Meta from "components/Meta/Meta";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  AiFillPhone,
  AiOutlineHome,
  AiOutlineMail,
  AiOutlinePhone,
} from "react-icons/ai";
import { BiPhoneCall, BiInfoCircle } from "react-icons/bi";
import "./Contact.css";
import { useDispatch } from "react-redux";
import { createEnquiry } from "Features/contact/ContactSlice";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const EnquirySchema = Yup.object().shape({
  email: Yup.string()
    .email("Email should be valid.")
    .required("Email is required."),
  name: Yup.string().required("Name is required."),
  mobile: Yup.string()
    // .phone("Please enter a valid phone number")
    .required("Mobile is required.")
    .matches(phoneRegExp, "Phone number is not valid")
    .min(10, "Please enter a valid phone number")
    .max(10, "Please enter a valid phone number"),
  comment: Yup.string().required("Comment is required."),
});

const Contact = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      mobile: "",
      comment: "",
    },
    validationSchema: EnquirySchema,
    onSubmit: (values) => {
      dispatch(createEnquiry(values));
      formik.resetForm();
    },
  });
  return (
    <>
      <Meta title={"Contact Us"} />
      <BreadCrumb title="Contact Us" />
      <div className="contact-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.0113185248806!2d108.14809647611597!3d16.064902439551805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31421929366960db%3A0xdb879dd7c782e123!2zxJAuIFBo4bqhbSBOaMawIFjGsMahbmcsIExpw6puIENoaeG7g3UsIMSQw6AgTuG6tW5nLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1686667288657!5m2!1svi!2s"
                height="500"
                className="border-0 w-100 d-none d-sm-block"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="map"
              ></iframe>
            </div>

            <div className="col-12 mt-0 mt-sm-5">
              <div className="contact-inner-wrapper d-flex flex-sm-row flex-column-reverse flex-column">
                <div className="flex-grow-1">
                  <h3 className="contact-title mb-4">Contact</h3>
                  <form
                    onSubmit={formik.handleSubmit}
                    className="d-flex flex-column gap-15"
                  >
                    <div>
                      <input
                        type="text"
                        className="form-control w-100"
                        placeholder="Name"
                        onChange={formik.handleChange("name")}
                        onBlur={formik.handleBlur("name")}
                        value={formik.values.name}
                      />
                      <div className="error mt-2">
                        {formik.touched.name && formik.errors.name}
                      </div>
                    </div>

                    <div>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        onChange={formik.handleChange("email")}
                        onBlur={formik.handleBlur("email")}
                        value={formik.values.email}
                      />
                      <div className="error mt-2">
                        {formik.touched.email && formik.errors.email}
                      </div>
                    </div>

                    <div>
                      <input
                        type="tel"
                        className="form-control"
                        placeholder="Mobile Number"
                        onChange={formik.handleChange("mobile")}
                        onBlur={formik.handleBlur("mobile")}
                        value={formik.values.mobile}
                      />
                      <div className="error mt-2">
                        {formik.touched.mobile && formik.errors.mobile}
                      </div>
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

                      <div className="error mt-2">
                        {formik.touched.comment && formik.errors.comment}
                      </div>
                    </div>

                    <div className="d-flex justify-content-end">
                      <button type="submit" className="button">
                        <span>Submit</span>
                      </button>
                    </div>
                  </form>
                </div>

                <div className="flex-shrink-1">
                  <h3 className="contact-title mb-4">Get In Touch With Us</h3>
                  <div>
                    <ul className="ps-0">
                      <li className="mb-3 d-flex gap-15 align-items-center">
                        <AiOutlineHome className="fs-2" />
                        <address className="mb-0">
                          Hno:277 , Near village chopal , Mandaura, Sonipat,
                          Haryana
                        </address>
                      </li>
                      <li className="mb-3 d-flex gap-15 align-items-center">
                        <AiOutlinePhone className="fs-3" />
                        <a href="tel:+91 8264954234">+91 8264954234</a>
                      </li>
                      <li className="mb-3 d-flex gap-15 align-items-center">
                        <AiOutlineMail className="fs-3" />
                        <a href="mailto:navdeepdahiya753@gmail.com">
                          navdeepdahiya753@gmail.com
                        </a>
                      </li>
                      <li className="mb-3 d-flex gap-15 align-items-center">
                        <BiInfoCircle className="fs-3" />
                        <p className="mb-0">Monday – Friday 10 AM – 8 PM</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
