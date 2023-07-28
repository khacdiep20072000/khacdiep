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
import { deleteImg, uploadImg } from "features/upload/uploadSlice";
import Dropzone from "react-dropzone";

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
  const imageState = useSelector((state) => state.upload.images);

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

  const img = [];
  imageState.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });

  useEffect(() => {
    formik.values.images = img;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageState]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: categoryName || "",
      images: img || "",
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

          <div className="bg-white border-1 p-5 text-center">
            <Dropzone
              onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>

          <div className="showimages d-flex flex-wrap gap-3">
            {imageState?.map((image) => {
              return (
                <div className=" position-relative" key={image.public_id}>
                  <button
                    type="button"
                    onClick={() => dispatch(deleteImg(image.public_id))}
                    className="btn-close position-absolute"
                    style={{ top: "10px", right: "10px" }}
                  ></button>
                  <img src={image.url} alt="" width={200} height={200} />
                </div>
              );
            })}
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
