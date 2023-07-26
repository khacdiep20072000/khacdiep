import { configureStore } from "@reduxjs/toolkit";
import authReducer from "features/auth/authSlice";
import customerReducer from "features/customers/customerSlice";
import productReducer from "features/product/productSlice";
import brandReducer from "features/brand/brandSlice";
import colorReducer from "features/color/colorSlice";
import categoryReducer from "features/category/categorySlice";
import blogCategoryReducer from "features/blogCategory/blogCategorySlice";
import blogReducer from "features/blog/blogSlice";
import enquiryReducer from "features/enquiry/enquirySlice";
import couponReducer from "features/coupon/couponSlice";
import uploadReducer from "features/upload/uploadSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    product: productReducer,
    brand: brandReducer,
    color: colorReducer,
    category: categoryReducer,
    blogCategory: blogCategoryReducer,
    blog: blogReducer,
    enquiry: enquiryReducer,
    coupon: couponReducer,
    upload: uploadReducer,
  },
});
