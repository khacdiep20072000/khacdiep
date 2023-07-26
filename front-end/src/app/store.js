import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Features/user/userSlice";
import productReducer from "../Features/product/productSlice";
import blogReducer from "../Features/Blog/BlogSlice";
import contactReducer from "../Features/contact/ContactSlice";
import categoryReducer from "../Features/Category/CategorySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    blog: blogReducer,
    contact: contactReducer,
    category: categoryReducer,
  },
});
