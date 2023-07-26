import CustomInput from "components/CustomInput/CustomInput";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  createBlogCategory,
  getBlogCategory,
  resetState,
  updateBlogCategory,
} from "features/blogCategory/blogCategorySlice";
import { useLocation, useNavigate } from "react-router-dom";

let BlogCategorySchema = yup.object().shape({
  title: yup.string().required("Blog Category is Required"),
});

const AddBlogCategory = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getBlogCategoryId = location.pathname.split("/")[3];

  useEffect(() => {
    if (getBlogCategoryId !== undefined) {
      dispatch(getBlogCategory(getBlogCategoryId));
    } else {
      dispatch(resetState());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getBlogCategoryId]);

  const newBlogCategoryState = useSelector((state) => state.blogCategory);
  const {
    isSuccess,
    isError,
    isLoading,
    newBlogCategory,
    blogCategoryName,
    updatedBlogCategory,
  } = newBlogCategoryState;

  useEffect(() => {
    if (isSuccess && newBlogCategory) {
      toast.success("Blog Category Added Successfully!");
    }
    if (isSuccess && updatedBlogCategory) {
      toast.success("Blog Category Updated Successfully!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading, newBlogCategory, updatedBlogCategory]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogCategoryName || "",
    },
    validationSchema: BlogCategorySchema,
    onSubmit: (values) => {
      if (blogCategoryName) {
        const data = { id: getBlogCategoryId, blogCategoryData: values };
        dispatch(updateBlogCategory(data));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 100);
        setTimeout(() => {
          navigate("/admin/blog-category-list", { replace: true });
        }, 1000);
      } else {
        dispatch(createBlogCategory(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">
        {getBlogCategoryId ? "Edit" : "Add"} Blog Category
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            name="title"
            label="Enter Blog Category"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
            id="blogcat"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>

          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getBlogCategoryId ? "Edit" : "Add"} Blog Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlogCategory;
