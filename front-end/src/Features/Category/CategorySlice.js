import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CategoryService from "./CategoryService";

const initialState = {
  allCategories: null,
  isSuccess: false,
  isLoading: false,
  isError: false,
  message: "",
};

export const getAllCategories = createAsyncThunk(
  "category/get-all-category",
  async (thunkAPI) => {
    try {
      return await CategoryService.getAllCategory();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Success";
        state.allCategories = action.payload;
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      });
  },
});

export default categorySlice.reducer;
