import CustomInput from "components/CustomInput/CustomInput";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "features/brand/brandSlice";
import { getCategories } from "features/category/categorySlice";
import { Select } from "antd";
import { getColors } from "features/color/colorSlice";
import Dropzone from "react-dropzone";
import { deleteImg, uploadImg } from "features/upload/uploadSlice";
import { createProduct, resetState } from "features/product/productSlice";
import { toast } from "react-toastify";

const SignupSchema = Yup.object().shape({
  title: Yup.string().required("Title is required."),
  description: Yup.string().required("Description is required."),
  price: Yup.number()
    .required("Price is required.")
    .moreThan(0, "Please join the price more than 1."),
  quantity: Yup.number()
    .required("Quantity is required.")
    .moreThan(0, "Please join the quantity more than 1."),
  brand: Yup.string().required("Brand is required."),
  category: Yup.string().required("Category is required."),
  tags: Yup.string().required("Tag is Required"),
  color: Yup.array()
    .min(1, "Pick at least one color")
    .required("Color is Required"),
});

const AddProduct = () => {
  const dispatch = useDispatch();
  const [color, setColor] = useState([]);

  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
    dispatch(getColors());
  }, [dispatch]);

  const brands = useSelector((state) => state.brand.brands);
  const categories = useSelector((state) => state.category.categories);
  const colors = useSelector((state) => state.color.colors);
  const images = useSelector((state) => state.upload.images);
  const newProductState = useSelector((state) => state.product);
  const { isSuccess, isError, isLoading, newProduct } = newProductState;

  useEffect(() => {
    if (isSuccess && newProduct) {
      toast.success("Product Added Successfully!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading, newProduct]);

  const coloropt = [];
  colors.forEach((i) => {
    coloropt.push({
      label: i.title,
      value: i._id,
    });
  });

  const img = [];
  images.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });

  useEffect(() => {
    formik.values.color = color ? color : " ";
    formik.values.images = img;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color, img]);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      quantity: "",
      brand: "",
      category: "",
      images: "",
      tags: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      dispatch(createProduct(values));
      formik.resetForm();
      setColor(null);
      setTimeout(() => {
        dispatch(resetState());
      }, 300);
    },
  });

  const handleColors = (e) => {
    setColor(e);
  };

  return (
    <div>
      <h3 className="mb-4 title">Add Product</h3>
      <div>
        <form
          action=""
          onSubmit={formik.handleSubmit}
          className="d-flex gap-3 flex-column"
        >
          <CustomInput
            type="text"
            label="Enter Product Title"
            name="title"
            onChng={formik.handleChange("title")}
            OnBlr={formik.handleBlur("title")}
            val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>

          <div className="">
            <ReactQuill
              theme="snow"
              name="description"
              value={formik.values.description}
              // onBlur={formik.handleBlur("description")}
              onChange={formik.handleChange("description")}
            />
          </div>
          <div className="error">
            {formik.touched.description && formik.errors.description}
          </div>

          <div className="d-flex gap-3">
            <div className="flex-grow-1">
              <CustomInput
                type="number"
                label="Enter Product Price"
                name="price"
                value={formik.values.price}
                onBlr={formik.handleBlur("price")}
                onChng={formik.handleChange("price")}
              />
              <div className="error mt-3">
                {formik.touched.price && formik.errors.price}
              </div>
            </div>

            <div className="flex-grow-1">
              <CustomInput
                type="number"
                label="Enter Product Quantity"
                name="quantity"
                value={formik.values.quantity}
                onBlr={formik.handleBlur("quantity")}
                onChng={formik.handleChange("quantity")}
              />
              <div className="error mt-3">
                {formik.touched.quantity && formik.errors.quantity}
              </div>
            </div>
          </div>

          <select
            name="brand"
            className="form-control py-3"
            onChange={formik.handleChange("brand")}
            onBlur={formik.handleBlur("brand")}
            value={formik.values.brand}
            id=""
          >
            <option value="">Select Brand</option>
            {brands.map((brand) => (
              <option key={brand._id} value={brand.title}>
                {brand.title}
              </option>
            ))}
          </select>
          <div className="error">
            {formik.touched.brand && formik.errors.brand}
          </div>

          <select
            name="category"
            className="form-control py-3"
            onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
            value={formik.values.category}
            id=""
          >
            <option value="" disabled>
              Select Category
            </option>
            {categories.map((category) => (
              <option key={category._id} value={category.title}>
                {category.title}
              </option>
            ))}
          </select>
          <div className="error">
            {formik.touched.category && formik.errors.category}
          </div>

          <select
            name="tags"
            className="form-control py-3"
            onChange={formik.handleChange("tags")}
            onBlur={formik.handleBlur("tags")}
            value={formik.values.tags}
            id=""
          >
            <option value="" disabled>
              Select Tags
            </option>
            <option value="featured">Featured</option>
            <option value="popular">Popular</option>
            <option value="special">Special</option>
          </select>
          <div className="error">
            {formik.touched.tags && formik.errors.tags}
          </div>

          <Select
            mode="multiple"
            allowClear
            className="w-100"
            placeholder="Select colors"
            defaultValue={color}
            onChange={(i) => handleColors(i)}
            options={coloropt}
          />
          <div className="error">
            {formik.touched.color && formik.errors.color}
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
            {images?.map((image) => {
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
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
