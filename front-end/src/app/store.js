import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

import authReducer from "../Features/user/userSlice";
import productReducer from "../Features/product/productSlice";
import blogReducer from "../Features/Blog/BlogSlice";
import contactReducer from "../Features/contact/ContactSlice";
import categoryReducer from "../Features/Category/CategorySlice";

const reducers = combineReducers({
  auth: authReducer,
  product: productReducer,
  blog: blogReducer,
  contact: contactReducer,
  category: categoryReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
});
