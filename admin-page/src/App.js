import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import MainLayout from "./components/MainLayout/MainLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Enquiries from "pages/Enquiries/Enquiries";
import BlogList from "pages/Blog/BlogList";
import BlogCategoryList from "pages/BlogCategory/BlogCategoryList";
import Order from "pages/Order/Order";
import Customers from "pages/Customers/Customers";
import ProductList from "pages/Product/ProductList";
import BrandList from "pages/Brand/BrandList";
import CategoryList from "pages/Category/CategoryList";
import ColorList from "pages/Color/ColorList";
import CouponList from "pages/CouponList/CouponList";
import AddBlog from "pages/Blog/AddBlog";
import AddBlogCategory from "pages/BlogCategory/AddBlogCategory";
import AddColor from "pages/Color/AddColor";
import AddCategory from "pages/Category/AddCategory";
import AddBrand from "pages/Brand/AddBrand";
import AddProduct from "pages/Product/AddProduct";
import AddCoupon from "pages/CouponList/AddCoupon";
import ViewEnquiry from "pages/Enquiries/ViewEnquiry";
import ViewOrder from "pages/Order/ViewOrder";
import { PrivateRoutes } from "routing/PrivateRoute";
import { OpenRoutes } from "routing/OpenRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <OpenRoutes>
              <Login />
            </OpenRoutes>
          }
        />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/admin"
          element={
            <PrivateRoutes>
              <MainLayout />
            </PrivateRoutes>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="enquiries" element={<Enquiries />} />
          <Route path="enquiries/:id" element={<ViewEnquiry />} />
          <Route path="blog-list" element={<BlogList />} />
          <Route path="blog-category-list" element={<BlogCategoryList />} />
          <Route path="orders" element={<Order />} />
          <Route path="orders/:id" element={<ViewOrder />} />
          <Route path="customers" element={<Customers />} />
          <Route path="list-product" element={<ProductList />} />
          <Route path="list-brand" element={<BrandList />} />
          <Route path="list-category" element={<CategoryList />} />
          <Route path="list-color" element={<ColorList />} />
          <Route path="coupon-list" element={<CouponList />} />
          <Route path="blog" element={<AddBlog />} />
          <Route path="blog/:id" element={<AddBlog />} />
          <Route path="blog-category" element={<AddBlogCategory />} />
          <Route path="blog-category/:id" element={<AddBlogCategory />} />
          <Route path="color" element={<AddColor />} />
          <Route path="color/:id" element={<AddColor />} />
          <Route path="category" element={<AddCategory />} />
          <Route path="category/:id" element={<AddCategory />} />
          <Route path="brand" element={<AddBrand />} />
          <Route path="brand/:id" element={<AddBrand />} />
          <Route path="product" element={<AddProduct />} />
          <Route path="product/:id" element={<AddProduct />} />
          <Route path="coupon" element={<AddCoupon />} />
          <Route path="coupon/:id" element={<AddCoupon />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
