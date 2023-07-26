import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import BreadCrumb from "components/BreadCrumb/BreadCrumb";
import Meta from "components/Meta/Meta";
import CustomInput from "components/CustomInput/CustomInput";
import { Link } from "react-router-dom";
import { forgotPasswordToken } from "Features/user/userSlice";
import { useDispatch } from "react-redux";

const emailSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email should be valid.")
    .required("Email is required."),
});

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: emailSchema,
    onSubmit: (values) => {
      dispatch(forgotPasswordToken(values));
    },
  });

  return (
    <>
      <Meta title={"Forgot Password"} />
      <BreadCrumb title="Forgot Password" />

      <div className="login-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="auth-card">
                <h3 className="text-center mb-3">Reset Your Password</h3>
                <p className="text-center mt-2 mb-3">
                  We will send you an email to reset your password
                </p>
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
                    id="email"
                  />
                  <div className="error">
                    {formik.touched.email && formik.errors.email}
                  </div>

                  <div>
                    <div className="mt-3 d-flex justify-content-center flex-column gap-15 align-items-center">
                      <button className="button" type="submit">
                        <span>Submit</span>
                      </button>
                      <Link to="/login">Cancel</Link>
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

export default ForgotPassword;
