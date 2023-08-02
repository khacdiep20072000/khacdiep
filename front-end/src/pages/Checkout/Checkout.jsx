import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { config } from "utils/axiosconfig";
import { createOrder } from "Features/user/userSlice";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const OrderSchema = Yup.object().shape({
  name: Yup.string().required("Name is required."),
  phone: Yup.string()
    .required("Mobile is required.")
    .matches(phoneRegExp, "Phone number is not valid")
    .min(10, "Please enter a valid phone number")
    .max(10, "Please enter a valid phone number"),
  address: Yup.string().required("Address is required."),
});

const Checkout = () => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [province, setProvince] = useState([]);
  const [district, setDistrict] = useState([]);
  const [shippingInfo, setShippingInfo] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://provinces.open-api.vn/api/?depth=3")
      .then((res) => setProvinces(res.data));
  }, []);

  const cart = useSelector((state) => state.auth.cartUser);
  const order = useSelector((state) => state.auth);

  const { createdOrder, isSuccess } = order;

  useEffect(() => {
    let sum = 0;
    for (let i = 0; i < cart?.length; i++) {
      sum += +cart[i].quantity * +cart[i].price;
    }
    setTotalAmount(sum);
  }, [cart]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      phone: "",
      province: "",
      district: "",
      ward: "",
      address: "",
    },
    validationSchema: OrderSchema,
    onSubmit: (values) => {
      const dataProvince = provinces.find((p) => p.code === +province).name;
      const dataDistrict = districts.find((p) => p.code === +district).name;
      const dataWard = wards.find((p) => p.code === +values.ward).name;

      const dataAddress =
        values.address +
        " " +
        dataWard +
        " " +
        dataDistrict +
        " " +
        dataProvince;

      const shippingInfo = {
        name: values.name,
        phone: values.phone,
        address: dataAddress,
      };

      setShippingInfo(shippingInfo);

      setTimeout(() => {
        handlerCheckout();
      }, 600);
    },
  });

  const handlerFetchDistrict = async (province_id) => {
    const dataProvince = provinces.filter(
      (province) => province.code === +province_id
    );
    setProvince(province_id);
    setDistricts(dataProvince[0].districts);
    setWards([]);
  };

  const handlerFetchWard = async (district_id) => {
    const dataDistrict = districts.filter(
      (district) => district.code === +district_id
    );
    setDistrict(district_id);
    setWards(dataDistrict[0].wards);
  };

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);

      document.body.appendChild(script);
    });
  };

  const handlerCheckout = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    const result = await axios.post(
      "http://localhost:4000/api/user/order/checkout",
      { amount: totalAmount + 5 },
      config
    );

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }
    const { amount, id: order_id, currency } = result.data.order;

    const options = {
      key: "rzp_test_d9Zi8h2ha7a1b8", // Enter the Key ID generated from the Dashboard
      amount: amount,
      currency: currency,
      name: "Hygge.",
      description: "Test Transaction",
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorPayPaymentId: response.razorpay_payment_id,
          razorPayOrderId: response.razorpay_order_id,
        };

        await axios.post(
          "http://localhost:4000/api/user/order/payment-verification",
          data,
          config
        );

        const dataOrder = {
          shippingInfo,
          orderItems: cart,
          totalPrice: totalAmount,
          paymentInfo: data,
        };

        setTimeout(() => {
          dispatch(createOrder(dataOrder));
        }, 300);

        if (createdOrder && isSuccess) {
          setTimeout(() => {
            navigate("/order-detail", { replace: true });
          }, 400);
        }
      },

      prefill: {
        name: "Soumya Dey",
        email: "SoumyaDey@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Soumya Dey Corporate Office",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="checkout-wrapper home-wrapper-2 py-5">
      <div className="container-xxl">
        <div className="row d-flex flex-column-reverse flex-md-row">
          <div className="col-12 col-md-7">
            <div className="checkout-left-data">
              <h3 className="website-name">Dev Corner</h3>
              <nav
                style={{ "--bs-breadcrumb-divider": ">" }}
                aria-label="breadcrumb"
              >
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link className="text-dark total-price" to="/cart">
                      Cart
                    </Link>
                  </li>
                  &nbsp; /&nbsp;
                  <li
                    className="breadcrumb-ite total-price active"
                    aria-current="page"
                  >
                    Information
                  </li>
                  &nbsp; /
                  <li className="breadcrumb-item total-price active">
                    Shipping
                  </li>
                  &nbsp; /
                  <li
                    className="breadcrumb-item total-price active"
                    aria-current="page"
                  >
                    Payment
                  </li>
                </ol>
              </nav>
              <h4 className="title total">Contact Information</h4>
              <p className="user-details total">
                Navdeep Dahiya (monud0232@gmail.com)
              </p>
              <h4 className="mb-3">Shipping Address</h4>

              <form
                onSubmit={formik.handleSubmit}
                className="d-flex gap-15 flex-wrap justify-content-between"
              >
                <div className="w-100">
                  <input
                    type="text"
                    placeholder="Name"
                    className="form-control"
                    value={formik.values.name}
                    onBlur={formik.handleBlur("name")}
                    onChange={formik.handleChange("name")}
                  />
                  <div className="error mt-2">
                    {formik.touched.name && formik.errors.name}
                  </div>
                </div>

                <div className="w-100">
                  <input
                    type="text"
                    placeholder="Phone Number"
                    className="form-control"
                    value={formik.values.phone}
                    onBlur={formik.handleBlur("phone")}
                    onChange={formik.handleChange("phone")}
                  />
                  <div className="error mt-2">
                    {formik.touched.phone && formik.errors.phone}
                  </div>
                </div>

                <div className="d-flex w-100 flex-wrap justify-content-between gap-2">
                  <div className="flex-grow-1">
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      onChange={(e) => handlerFetchDistrict(e.target.value)}
                      // value={province}
                    >
                      <option selected disabled>
                        Province
                      </option>
                      {provinces?.map((province) => (
                        <option key={province.code} value={province.code}>
                          {province.name}
                        </option>
                      ))}
                    </select>
                    <div className="error mt-2">
                      {formik.touched.address && formik.errors.address}
                    </div>
                  </div>

                  <div className="flex-grow-1">
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      onChange={(e) => handlerFetchWard(e.target.value)}
                    >
                      <option selected disabled>
                        District
                      </option>
                      {districts?.map((district) => (
                        <option key={district.code} value={district.code}>
                          {district.name}
                        </option>
                      ))}
                    </select>
                    <div className="error mt-2">
                      {formik.touched.address && formik.errors.address}
                    </div>
                  </div>

                  <div className="flex-grow-1">
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      value={formik.values.ward}
                      onBlur={formik.handleBlur("ward")}
                      onChange={formik.handleChange("ward")}
                    >
                      <option selected value="" disabled>
                        Ward
                      </option>
                      {wards?.map((ward) => (
                        <option key={ward.code} value={ward.code}>
                          {ward.name}
                        </option>
                      ))}
                    </select>
                    <div className="error mt-2">
                      {formik.touched.address && formik.errors.address}
                    </div>
                  </div>
                </div>

                <div className="w-100">
                  <input
                    type="text"
                    placeholder="Address"
                    className="form-control"
                    value={formik.values.address}
                    onBlur={formik.handleBlur("address")}
                    onChange={formik.handleChange("address")}
                  />
                  <div className="error mt-2">
                    {formik.touched.address && formik.errors.address}
                  </div>
                </div>

                <div className="w-100">
                  <div className="d-flex justify-content-between align-items-center">
                    <Link to="/cart" className="text-dark">
                      <BiArrowBack className="me-2" />
                      Return to Cart
                    </Link>
                    <button type="submit" className="button">
                      <span>Order</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="col-12 col-md-5">
            <div className="border-bottom py-4">
              {cart?.map((c) => (
                <div
                  className="d-flex gap-10 mb-3 pb-2 border-bottom  border-secondary"
                  key={c._id}
                >
                  <div className="w-75 d-flex gap-10 align-items-center">
                    <div className="w-25">
                      <img
                        className="img-fluid"
                        src={c?.product.images[0].url}
                        alt="product"
                        style={{
                          height: "100px",
                          width: "100px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <div>
                      <h5 className="total-price">{c.product.title}</h5>
                      <h5 className="total-price">$ {c.price}</h5>
                      <h5 className="total-price">Quantity: {c.quantity}</h5>
                      <span
                        className="rounded-circle "
                        style={{
                          display: "inline-block",
                          backgroundColor: c.color.title,
                          width: "20px",
                          height: "20px",
                        }}
                      ></span>
                    </div>
                  </div>

                  <div className="w-25 d-flex justify-content-end">
                    <h5 className="total">$ {c.quantity * c.price}</h5>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-bottom py-4">
              <div className="d-flex justify-content-between align-items-center">
                <p className="total">Subtotal</p>
                <p className="total-price">$ {cart ? totalAmount : 0}</p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0 total">Shipping</p>
                <p className="mb-0 total-price">$ {cart ? 5 : 0}</p>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center border-bootom py-4">
              <h4 className="total">Total</h4>
              <h5 className="total-price">$ {cart ? totalAmount + 5 : 0}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
