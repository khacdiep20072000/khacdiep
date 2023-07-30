import CustomInput from "components/CustomInput/CustomInput";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { login } from "features/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email should be valid.")
      .required("Email is required."),
    password: Yup.string().required("Password is required."),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });
  const authState = useSelector((state) => state);
  const { isSuccess, message } = authState.auth;

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        navigate("/admin", { replace: true });
      }, 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <div className="py-4" style={{ background: "var(--color-ffd333)" }}>
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-3">
        <h3 className="text-center title">Login</h3>
        <p className="text-center">Login to your account to continue.</p>
        <div className="error text-center">
          {message.message === "Rejected" ? "You not an administrator" : ""}
        </div>

        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            name="email"
            type="text"
            label="Email Address"
            id="email"
            onChng={formik.handleChange("email")}
            onBlr={formik.handleBlur("email")}
            val={formik.values.email}
          />
          <div className="error mt-2">
            {formik.touched.email && formik.errors.email}
          </div>

          <CustomInput
            name="password"
            type="password"
            label="Password"
            id="pass"
            onChng={formik.handleChange("password")}
            onBlr={formik.handleBlur("password")}
            val={formik.values.password}
          />
          <div className="error mt-2">
            {formik.touched.password && formik.errors.password}
          </div>

          <div className="mt-3 text-end ">
            <Link to="/forgot-password" className="text-black">
              Forgot Password?
            </Link>
          </div>
          <button
            type="submit"
            className="mt-3 border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
            style={{ background: "var(--color-ffd333)" }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
