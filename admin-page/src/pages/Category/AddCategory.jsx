import CustomInput from "components/CustomInput/CustomInput";
import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  createCategory,
  getCategory,
  resetState,
  updateCategory,
} from "features/category/categorySlice";
import { useLocation, useNavigate } from "react-router-dom";

const CategorySchema = Yup.object().shape({
  title: Yup.string().required("Title is required."),
});

const AddCategory = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getCategoryId = location.pathname.split("/")[3];

  useEffect(() => {
    if (getCategoryId !== undefined) {
      dispatch(getCategory(getCategoryId));
    } else {
      dispatch(resetState());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getCategoryId]);

  const newCategoryState = useSelector((state) => state.category);
  const {
    isSuccess,
    isError,
    isLoading,
    newCategory,
    categoryName,
    updatedCategory,
  } = newCategoryState;

  useEffect(() => {
    if (isSuccess && newCategory) {
      toast.success("Category Added Successfully!");
    }

    if (isSuccess && updatedCategory) {
      toast.success("Category Updated Successfully!");
    }

    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading, newCategory, updatedCategory]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: categoryName || "",
    },
    validationSchema: CategorySchema,
    onSubmit: (values) => {
      if (categoryName) {
        const data = { id: getCategoryId, categoryData: values };
        dispatch(updateCategory(data));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 100);
        setTimeout(() => {
          navigate("/admin/list-category", { replace: true });
        }, 1000);
      } else {
        dispatch(createCategory(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });
  return (
    <div>
      <h3 className="mb-4 title">{categoryName ? "Edit" : "Add"} Category</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            name="title"
            label="Enter Category"
            id="category"
            onBlr={formik.handleBlur("title")}
            onChng={formik.handleChange("title")}
            val={formik.values.title}
          />
          <div className="error mt-2">
            {formik.touched.title && formik.errors.title}
          </div>

          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {categoryName ? "Edit" : "Add"} Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
