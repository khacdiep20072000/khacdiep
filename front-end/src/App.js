import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Layout from "./components/Layout/Layout";
import OurStore from "pages/OurStore/OurStore";
import Blog from "pages/Blog/Blog";
import Contact from "pages/Contact/Contact";
import CompareProduct from "pages/CompareProduct/CompareProduct";
import Wishlist from "pages/Wishlist/Wishlist";
import Login from "pages/Login/Login";
import Register from "pages/Register/Register";
import ForgotPassword from "pages/ForgotPassword/ForgotPassword";
import ResetPassword from "pages/ResetPassword/ResetPassword";
import SingleBlog from "pages/SingleBlog/SingleBlog";
import PrivacyPolicy from "pages/PrivacyPolicy/PrivacyPolicy";
import RefundPolicy from "pages/RefundPolicy/RefundPolicy";
import ShippingPolicy from "pages/ShippingPolicy/ShippingPolicy";
import TermAndCondition from "pages/TermAndCondition/TermAndCondition";
import SingleProduct from "pages/SingleProduct/SingleProduct";
import Cart from "pages/Cart/Cart";
import Checkout from "pages/Checkout/Checkout";
import { PrivateRoutes } from "routing/PrivateRoute";
import { OpenRoutes } from "routing/OpenRoute";
import Order from "pages/Order/Order";
import Profile from "pages/Profile/Profile";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="product" element={<OurStore />} />
          <Route path="product/:id" element={<SingleProduct />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:id" element={<SingleBlog />} />
          <Route
            path="wishlist"
            element={
              <PrivateRoutes>
                <Wishlist />
              </PrivateRoutes>
            }
          />
          <Route
            path="login"
            element={
              <OpenRoutes>
                <Login />
              </OpenRoutes>
            }
          />
          <Route
            path="cart"
            element={
              <PrivateRoutes>
                <Cart />
              </PrivateRoutes>
            }
          />
          <Route
            path="checkout"
            element={
              <PrivateRoutes>
                <Checkout />
              </PrivateRoutes>
            }
          />
          <Route
            path="my-profile"
            element={
              <PrivateRoutes>
                <Profile />
              </PrivateRoutes>
            }
          />
          <Route path="register" element={<Register />} />
          <Route
            path="my-order"
            element={
              <PrivateRoutes>
                <Order />
              </PrivateRoutes>
            }
          />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password/:token" element={<ResetPassword />} />
          <Route path="compare-product" element={<CompareProduct />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="refund-policy" element={<RefundPolicy />} />
          <Route path="shipping-policy" element={<ShippingPolicy />} />
          <Route path="term-conditions" element={<TermAndCondition />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
