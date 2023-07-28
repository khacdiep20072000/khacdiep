import CustomInput from "components/CustomInput/CustomInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createBrand,
  getBrand,
  resetState,
  updateBrand,
} from "features/brand/brandSlice";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";
import { deleteImg, uploadImg } from "features/upload/uploadSlice";

const BrandSchema = Yup.object().shape({
  title: Yup.string().required("Title is required."),
});

const AddBrand = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getBrandId = location.pathname.split("/")[3];

  useEffect(() => {
    if (getBrandId !== undefined) {
      dispatch(getBrand(getBrandId));
    } else {
      dispatch(resetState());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getBrandId]);

  const newBrandState = useSelector((state) => state.brand);
  const imageState = useSelector((state) => state.upload.images);
  const { isSuccess, isError, isLoading, newBrand, brandName, updatedBrand } =
    newBrandState;

  useEffect(() => {
    if (isSuccess && newBrand) {
      toast.success("Brand Added Successfully!");
    }
    if (isSuccess && updatedBrand) {
      toast.success("Brand Updated Successfully!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isError, isLoading, newBrand, updatedBrand]);

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
      title: brandName || "",
      images: img || "",
    },
    validationSchema: BrandSchema,
    onSubmit: (values) => {
      if (brandName) {
        const data = { id: getBrandId, brandData: values };
        dispatch(updateBrand(data));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 100);
        setTimeout(() => {
          navigate("/admin/list-brand", { replace: true });
        }, 1000);
      } else {
        dispatch(createBrand(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">{brandName ? "Edit" : "Add"} Brand</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            name="title"
            label="Enter Brand"
            id="brand"
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
            {brandName ? "Edit" : "Add"} Brand
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBrand;
