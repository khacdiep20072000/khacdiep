import React from "react";
import BreadCrumb from "components/BreadCrumb/BreadCrumb";
import Meta from "components/Meta/Meta";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomInput from "components/CustomInput/CustomInput";
import { useParams } from "react-router-dom";
import { resetPassword } from "Features/user/userSlice";
import { useDispatch } from "react-redux";

const passwordSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required.")
    .min(8, "Password must be 8 characters long"),
  confirmPassword: Yup.string()
    .required("Password is required.")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

const ResetPassword = () => {
  const { token } = useParams();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: passwordSchema,
    onSubmit: (values) => {
      const { password } = values;
      const data = { password, token };
      dispatch(resetPassword(data));
    },
  });

  return (
    <>
      <Meta title={"Reset Password"} />
      <BreadCrumb title="Reset Password" />
      <div className="login-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="auth-card">
                <h3 className="text-center mb-3">Reset Password</h3>
                <form
                  onSubmit={formik.handleSubmit}
                  action=""
                  className="d-flex flex-column gap-15"
                >
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

                  <CustomInput
                    type="password"
                    name="confirmPassword"
                    label="Confirm Password"
                    onChange={formik.handleChange("confirmPassword")}
                    onBlur={formik.handleBlur("confirmPassword")}
                    val={formik.values.confirmPassword}
                  />
                  <div className="error">
                    {formik.touched.confirmPassword &&
                      formik.errors.confirmPassword}
                  </div>
                  <div>
                    <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                      <button type="submit" className="button">
                        <span>Ok</span>
                      </button>
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

export default ResetPassword;
