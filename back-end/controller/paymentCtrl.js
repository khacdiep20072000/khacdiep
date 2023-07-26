const Razorpay = require("razorpay");

const instance = new Razorpay({
  key_id: "rzp_test_d9Zi8h2ha7a1b8",
  key_secret: "ysZZeqEI1aPkq1wzqUzgr8OW",
});

const checkout = async (req, res) => {
  const { amount } = req.body;
  const option = {
    amount: amount,
    currency: "INR",
  };

  const order = await instance.orders.create(option);

  res.json({ success: true, order });
};

const paymentVerification = async (req, res) => {
  const { razorPayOrderId, razorPayPaymentId } = req.body;

  res.json({ razorPayOrderId, razorPayPaymentId });
};

module.exports = {
  checkout,
  paymentVerification,
};
