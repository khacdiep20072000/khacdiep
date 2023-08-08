import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import BreadCrumb from "components/BreadCrumb/BreadCrumb";
import Meta from "components/Meta/Meta";
import { Link, useNavigate } from "react-router-dom";
import CustomInput from "components/CustomInput/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import "yup-phone-lite";
import { registerUser, resetState } from "Features/user/userSlice";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const RegisterSchema = Yup.object().shape({
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
  password: Yup.string()
    .required("Password is required.")
    .min(8, "Password must be 8 characters long"),
});

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const newUserState = useSelector((state) => state.auth);
  const { isSuccess } = newUserState;
  useEffect(() => {
    if (isSuccess && newUserState.newUser) {
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1500);
      dispatch(resetState());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);
  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      mobile: "",
      password: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      dispatch(registerUser(values));
    },
  });

  return (
    <>
      <Meta title={"Register"} />
      <BreadCrumb title="Register" />

      <div className="login-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="auth-card">
                <h3 className="text-center mb-3">Sign Up</h3>
                <form
                  action=""
                  className="d-flex flex-column gap-15"
                  onSubmit={formik.handleSubmit}
                >
                  <CustomInput
                    type="text"
                    name="name"
                    label="Name"
                    onChange={formik.handleChange("name")}
                    onBlur={formik.handleBlur("name")}
                    val={formik.values.name}
                    id="name"
                  />
                  <div className="error">
                    {formik.touched.name && formik.errors.name}
                  </div>

                  <CustomInput
                    type="email"
                    name="email"
                    label="Email"
                    onChange={formik.handleChange("email")}
                    onBlur={formik.handleBlur("email")}
                    val={formik.values.email}
                  />
                  <div className="error">
                    {formik.touched.email && formik.errors.email}
                  </div>

                  <CustomInput
                    type="tel"
                    name="mobile"
                    label="Mobile Number"
                    onChange={formik.handleChange("mobile")}
                    onBlur={formik.handleBlur("mobile")}
                    val={formik.values.mobile}
                  />
                  <div className="error">
                    {formik.touched.mobile && formik.errors.mobile}
                  </div>

                  <CustomInput
                    type="password"
                    name="password"
                    label="Password"
                    onChange={formik.handleChange("password")}
                    onBlur={formik.handleBlur("password")}
                    val={formik.values.password}
                  />
                  <div className="error">
                    {formik.touched.password && formik.errors.password}
                  </div>

                  <div>
                    <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                      <button type="submit" className="button">
                        <span>Register</span>
                      </button>
                      <Link to="/login" className="button register">
                        <span className="text-white">Login</span>
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
