const express = require("express");
const {
  createUser,
  loginUser,
  getAllUser,
  getUser,
  deleteUser,
  updateUser,
  blockUser,
  unblockUser,
  handlerRefreshToken,
  logout,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
  loginAdmin,
  getWishList,
  saveAddress,
  userCart,
  getUserCart,
  removeProductFromCart,
  updateQuantityProductCart,
  updateQuantityAddToCart,
  createOrder,
  getOrdersUser,
  getMyInformation,
} = require("../controller/userCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { checkout, paymentVerification } = require("../controller/paymentCtrl");

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/wishlist", authMiddleware, getWishList);
router.get("/get-order-user", authMiddleware, getOrdersUser);
router.get("/all-user", getAllUser);
// router.get("/get-all-orders", authMiddleware, isAdmin, getAllOrders);
// router.get("/get-order/:id", authMiddleware, getOrder);
router.get("/cart", authMiddleware, getUserCart);
router.get("/my-information", authMiddleware, getMyInformation);
router.get("/:id", authMiddleware, isAdmin, getUser);
// router.post("/cart/apply-coupon", authMiddleware, applyCoupon);
router.post("/cart/create-order", authMiddleware, createOrder);
router.post("/admin-login", loginAdmin);
router.post("/cart", authMiddleware, userCart);
// router.delete("/empty-cart", authMiddleware, emptyCart);
router.delete(
  "/remove-product-cart/:cartItemId",
  authMiddleware,
  removeProductFromCart
);
router.get("/logout", logout);
router.put("/password", authMiddleware, updatePassword);
router.post("/order/checkout", authMiddleware, checkout);
router.post("/order/payment-verification", authMiddleware, paymentVerification);
router.put("/save-address", authMiddleware, saveAddress);
router.post("/forgot-password", forgotPasswordToken);
router.put("/reset-password/:token", resetPassword);
router.get("/refresh", handlerRefreshToken);
router.delete("/:id", deleteUser);
router.put("/edit-user", authMiddleware, updateUser);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put(
  "/update-quantity-cart/:cartItemId",
  authMiddleware,
  updateQuantityProductCart
);
router.put(
  "/update-quantity-add-to-cart/:cartItemId",
  authMiddleware,
  updateQuantityAddToCart
);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);
// router.put(
//   "/order/update-order/:id",
//   authMiddleware,
//   isAdmin,
//   updateOrderStatus
// );

module.exports = router;
