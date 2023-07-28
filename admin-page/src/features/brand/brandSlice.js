import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import brandService from "./brandServices";

const initialState = {
  brands: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
  brandName: "",
  newBrand: null,
  updatedBrand: null,
  deletedBrand: null,
  brandImage: null,
};

export const getBrands = createAsyncThunk(
  "brand/getBrands",
  async (thunkAPI) => {
    try {
      return await brandService.getBrands();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getBrand = createAsyncThunk(
  "brand/getBrand",
  async (brandId, thunkAPI) => {
    try {
      return await brandService.getBrand(brandId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createBrand = createAsyncThunk(
  "brand/create-brand",
  async (brand, thunkAPI) => {
    try {
      return await brandService.createBrand(brand);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateBrand = createAsyncThunk(
  "brand/update-brand",
  async (brand, thunkAPI) => {
    try {
      return await brandService.updateBrand(brand);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteBrand = createAsyncThunk(
  "brand/delete-brand",
  async (brandId, thunkAPI) => {
    try {
      return await brandService.deleteBrand(brandId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

export const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBrands.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.brands = action.payload;
        state.message = "success";
      })
      .addCase(getBrands.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.newBrand = action.payload;
      })
      .addCase(createBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.brandName = action.payload.title;
        state.brandImage = action.payload.images;
      })
      .addCase(getBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedBrand = action.payload;
      })
      .addCase(updateBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedBrand = action.payload;
      })
      .addCase(deleteBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default brandSlice.reducer;
