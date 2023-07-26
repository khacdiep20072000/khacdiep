import CustomInput from "components/CustomInput/CustomInput";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  createColor,
  getColor,
  resetState,
  updateColor,
} from "features/color/colorSlice";
import { useLocation, useNavigate } from "react-router-dom";

let ColorSchema = yup.object().shape({
  title: yup.string().required("Color is Required"),
});

const AddColor = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getColorId = location.pathname.split("/")[3];

  useEffect(() => {
    if (getColorId !== undefined) {
      dispatch(getColor(getColorId));
    } else {
      dispatch(resetState());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getColorId]);

  const newColorState = useSelector((state) => state.color);
  const { isSuccess, isError, isLoading, newColor, colorName, updatedColor } =
    newColorState;

  useEffect(() => {
    if (isSuccess && newColor) {
      toast.success("Color Added Successfully!");
    }
    if (isSuccess && updatedColor) {
      toast.success("Color Updated Successfully!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading, newColor, updatedColor]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: colorName || "",
    },
    validationSchema: ColorSchema,
    onSubmit: (values) => {
      if (colorName) {
        const data = { id: getColorId, colorData: values };
        dispatch(updateColor(data));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 100);
        setTimeout(() => {
          navigate("/admin/list-color", { replace: true });
        }, 1000);
      } else {
        dispatch(createColor(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });
  return (
    <div>
      <h3 className="mb-4 title">{colorName ? "Edit" : "Add"} Color</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="color"
            name="title"
            label="Enter Color"
            id="color"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
          />
          <div className="error mt-2">
            {formik.touched.title && formik.errors.title}
          </div>

          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {colorName ? "Edit" : "Add"} Color
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddColor;
