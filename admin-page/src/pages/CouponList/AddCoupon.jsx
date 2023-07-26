import CustomInput from "components/CustomInput/CustomInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  createCoupon,
  getCoupon,
  resetState,
  updateCoupon,
} from "features/coupon/couponSlice";
import { useLocation, useNavigate } from "react-router-dom";

const CouponSchema = Yup.object().shape({
  name: Yup.string().required("Coupon Name is required."),
  expiry: Yup.date().required("Expire Date is required."),
  discount: Yup.number()
    .required("Discount Percentage is Required.s")
    .moreThan(0, "Please join the discount more than 1.")
    .lessThan(101, "Please join the quantity less than 100."),
});

const AddCoupon = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getCouponId = location.pathname.split("/")[3];

  useEffect(() => {
    if (getCouponId !== undefined) {
      dispatch(getCoupon(getCouponId));
    } else {
      dispatch(resetState());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getCouponId]);

  const newCouponState = useSelector((state) => state.coupon);
  const {
    isSuccess,
    isError,
    isLoading,
    newCoupon,
    couponName,
    couponExpiry,
    couponDiscount,
    updatedCoupon,
  } = newCouponState;

  const changeDateFormat = (date) => {
    const newDate = new Date(date).toLocaleDateString();
    let [month, day, year] = newDate.split("/");
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    return [year, month, day].join("-");
  };

  useEffect(() => {
    if (isSuccess && newCoupon) {
      toast.success("Coupon Added Successfully!");
    }
    if (isSuccess && updatedCoupon) {
      toast.success("Coupon Updated Successfully!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading, newCoupon, updatedCoupon]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: couponName || "",
      expiry: couponExpiry ? changeDateFormat(couponExpiry) : "",
      discount: couponDiscount || "",
    },
    validationSchema: CouponSchema,
    onSubmit: (values) => {
      if (getCouponId) {
        const data = { id: getCouponId, couponData: values };
        dispatch(updateCoupon(data));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 100);
        setTimeout(() => {
          navigate("/admin/coupon-list", { replace: true });
        }, 1000);
      } else {
        dispatch(createCoupon(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });
  return (
    <div>
      <h3 className="mb-4 title">{getCouponId ? "Edit" : "Add"} Coupon</h3>
      <div>
        <form
          action=""
          onSubmit={formik.handleSubmit}
          className="d-flex flex-column gap-3"
        >
          <CustomInput
            type="text"
            name="name"
            label="Enter Coupon Name"
            id="name"
            onBlr={formik.handleBlur("name")}
            onChng={formik.handleChange("name")}
            val={formik.values.name}
          />
          <div className="error">
            {formik.touched.name && formik.errors.name}
          </div>

          <CustomInput
            type="date"
            name="expiry"
            // minDate={new Date.now()}
            onChng={formik.handleChange("expiry")}
            onBlr={formik.handleBlur("expiry")}
            val={formik.values.expiry}
            label="Enter Expiry Data"
            id="date"
          />
          <div className="error">
            {formik.touched.expiry && formik.errors.expiry}
          </div>

          <CustomInput
            type="number"
            name="discount"
            onChng={formik.handleChange("discount")}
            onBlr={formik.handleBlur("discount")}
            val={formik.values.discount}
            label="Enter Discount"
            id="discount"
          />
          <div className="error">
            {formik.touched.discount && formik.errors.discount}
          </div>

          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getCouponId ? "Edit" : "Add"} Coupon
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCoupon;
