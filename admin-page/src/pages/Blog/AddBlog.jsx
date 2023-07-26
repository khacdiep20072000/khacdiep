import React, { useEffect } from "react";
import ReactQuill from "react-quill";
import CustomInput from "components/CustomInput/CustomInput";
import "react-quill/dist/quill.snow.css";
import { Stepper } from "react-form-stepper";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getBlogCategories } from "features/blogCategory/blogCategorySlice";
import {
  createBlog,
  getBlog,
  resetState,
  updateBlog,
} from "features/blog/blogSlice";
import Dropzone from "react-dropzone";
import { deleteImg, uploadImg } from "features/upload/uploadSlice";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

let BlogSchema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  description: yup.string().required("Description is Required"),
  category: yup.string().required("Category is Required"),
});

const AddBlog = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getBlogId = location.pathname.split("/")[3];

  const blogCategories = useSelector(
    (state) => state.blogCategory.blogCategories
  );
  const userCurrent = useSelector((state) => state.auth.user);
  const imageState = useSelector((state) => state.upload.images);
  const newBlogState = useSelector((state) => state.blog);
  const {
    isSuccess,
    isError,
    isLoading,
    newBlog,
    blogName,
    blogDescription,
    blogCategory,
    blogImages,
    updatedBlog,
  } = newBlogState;

  useEffect(() => {
    if (getBlogId !== undefined) {
      dispatch(getBlog(getBlogId));
      img.push(blogImages);
    } else {
      dispatch(resetState());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getBlogId]);

  useEffect(() => {
    dispatch(resetState());
    dispatch(getBlogCategories());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess && newBlog) {
      toast.success("Product Added Successfully!");
    }
    if (isSuccess && updatedBlog) {
      toast.success("Product Updated Successfully!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading, newBlog, updatedBlog]);

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
      title: blogName || "",
      description: blogDescription || "",
      category: blogCategory || "",
      author: "",
      images: "",
    },
    validationSchema: BlogSchema,
    onSubmit: (values) => {
      if (getBlogId) {
        const data = { id: getBlogId, blogData: values };
        dispatch(updateBlog(data));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
          // dispatch(resetStateImage());
        }, 100);
        setTimeout(() => {
          navigate("/admin/blog-list", { replace: true });
        }, 1000);
      } else {
        values.author = userCurrent.name;
        dispatch(createBlog(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
          // dispatch(resetStateImage());
        }, 300);
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">{getBlogId ? "Edit" : "Add"} Blog</h3>
      <Stepper
        steps={[
          { label: "Add Blog Details" },
          { label: "Upload Images" },
          { label: "Completed" },
        ]}
        activeStep={3}
      />
      <div className="">
        <form
          action=""
          onSubmit={formik.handleSubmit}
          className="d-flex flex-column gap-3"
        >
          <CustomInput
            type="text"
            label="Enter Blog Title"
            name="title"
            onChng={formik.handleChange("title")}
            OnBlr={formik.handleBlur("title")}
            val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>

          <select
            name="category"
            className="form-control py-3"
            id=""
            onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
            value={formik.values.category}
          >
            <option value="">Select Blog Category</option>
            {blogCategories.map((blogCategory) => (
              <option key={blogCategory._id} value={blogCategory.title}>
                {blogCategory.title}
              </option>
            ))}
          </select>
          <div className="error">
            {formik.touched.category && formik.errors.category}
          </div>

          <ReactQuill
            theme="snow"
            name="description"
            value={formik.values.description}
            // onBlur={formik.handleBlur("description")}
            onChange={formik.handleChange("description")}
          />
          <div className="error">
            {formik.touched.description && formik.errors.description}
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
            {getBlogId ? "Edit" : "Add"} Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
