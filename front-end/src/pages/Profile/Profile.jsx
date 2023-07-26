import BreadCrumb from "components/BreadCrumb/BreadCrumb";
import Meta from "components/Meta/Meta";
import { getIn, useFormik } from "formik";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyInformation, updateUser } from "Features/user/userSlice";
import { FiEdit } from "react-icons/fi";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const ProfileSchema = Yup.object().shape({
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
});

const Profile = () => {
  useEffect(() => {
    dispatch(getMyInformation());
  }, []);

  const currentUser = useSelector((state) => state.auth.informationUser);
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: currentUser?.email,
      name: currentUser?.name,
      mobile: currentUser?.mobile,
      address: currentUser?.address || "",
    },
    validationSchema: ProfileSchema,
    onSubmit: (values) => {
      dispatch(updateUser(values));
      setEdit(false);
    },
  });

  return (
    <>
      <Meta title={"My profile"} />
      <BreadCrumb title="My profile" />

      <div className="profile-wrapper home-wrapper-2 pt-3 pb-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="d-flex justify-content-between align-item-center">
                <h3 className="">
                  {edit ? "Update Information" : "Information"}
                </h3>
                <FiEdit
                  className="fs-4"
                  onClick={() => setEdit((state) => !state)}
                />
              </div>
            </div>
            <div className="col-12">
              <form onSubmit={formik.handleSubmit}>
                <div className="text-center">
                  <img
                    style={{ maxWidth: "200px", maxHeight: "200px" }}
                    src={
                      currentUser?.images
                        ? currentUser.images
                        : "https://cdn.dribbble.com/users/6142/screenshots/5679189/media/1b96ad1f07feee81fa83c877a1e350ce.png?compress=1&resize=400x300&vertical=top"
                    }
                    alt="user profile avatar"
                    className="img-fluid  rounded-circle"
                  />
                </div>

                <table className="table text-center  mt-5">
                  <tbody>
                    <tr>
                      <td>User Id</td>
                      <td>
                        {edit ? (
                          <input
                            className="w-100 border-0 text-center"
                            readOnly
                            value={currentUser?._id}
                            style={{ outline: "none" }}
                          />
                        ) : (
                          <p className="mb-0">{currentUser?._id}</p>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>Name</td>
                      <td>
                        {edit ? (
                          <>
                            <input
                              className="w-100 border-0 text-center"
                              style={{ outline: "none" }}
                              onChange={formik.handleChange("name")}
                              onBlur={formik.handleBlur("name")}
                              value={formik.values.name}
                            />
                            <div className="error">
                              {formik.touched.name && formik.errors.name}
                            </div>
                          </>
                        ) : (
                          <p className="mb-0"> {currentUser?.name}</p>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>Email</td>
                      <td>
                        {edit ? (
                          <>
                            <input
                              className="w-100 border-0 text-center"
                              style={{ outline: "none" }}
                              onChange={formik.handleChange("email")}
                              onBlur={formik.handleBlur("email")}
                              value={formik.values.email}
                            />
                            <div className="error">
                              {formik.touched.email && formik.errors.email}
                            </div>
                          </>
                        ) : (
                          <p className="mb-0"> {currentUser?.email}</p>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>Phone</td>
                      <td>
                        {edit ? (
                          <>
                            <input
                              className="w-100 border-0 text-center"
                              style={{ outline: "none" }}
                              onChange={formik.handleChange("mobile")}
                              onBlur={formik.handleBlur("mobile")}
                              value={formik.values.mobile}
                            />
                            <div className="error">
                              {formik.touched.mobile && formik.errors.mobile}
                            </div>
                          </>
                        ) : (
                          <p className="mb-0"> {currentUser?.mobile}</p>
                        )}
                      </td>
                    </tr>

                    <tr>
                      <td>Address</td>
                      <td>
                        {" "}
                        {edit ? (
                          <>
                            <input
                              className="w-100 border-0 text-center"
                              style={{ outline: "none" }}
                              onChange={formik.handleChange("address")}
                              onBlur={formik.handleBlur("address")}
                              value={formik.values.address}
                            />
                          </>
                        ) : (
                          <p className="mb-0"> {currentUser?.address}</p>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>

                {edit ? (
                  <button
                    type="submit"
                    color="warning"
                    className="button float-end"
                  >
                    <span>Update Profile</span>
                  </button>
                ) : (
                  ""
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
