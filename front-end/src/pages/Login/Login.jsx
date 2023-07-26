import React, { useEffect } from "react";
import * as Yup from "yup";
import BreadCrumb from "components/BreadCrumb/BreadCrumb";
import Meta from "components/Meta/Meta";
import { Link, useNavigate } from "react-router-dom";
import CustomInput from "components/CustomInput/CustomInput";
import "./Login.css";
import { useFormik } from "formik";
import { loginUser } from "Features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email should be valid.")
    .required("Email is required."),
  password: Yup.string()
    .required("Password is required.")
    .min(8, "Password must be 8 characters long"),
});

const Login = () => {
  const dispatch = new useDispatch();
  const navigate = new useNavigate();
  const userState = useSelector((state) => state.auth);
  const { isSuccess } = userState;
  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      dispatch(loginUser(values));
    },
  });
  return (
    <>
      <Meta title={"Login"} />
      <BreadCrumb title="Login" />

      <div className="login-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="auth-card">
                <h3 className="text-center mb-3">Login</h3>
                <form
                  action=""
                  className="d-flex flex-column gap-15"
                  onSubmit={formik.handleSubmit}
                >
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
                    <Link to="/forgot-password">Forgot Password?</Link>

                    <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                      <button className="button" type="submit">
                        <span>Login</span>
                      </button>
                      <Link to="/register" className="button register">
                        <span className="text-white">Register</span>
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

export default Login;
