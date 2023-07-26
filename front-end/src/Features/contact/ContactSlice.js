import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import contactService from "./ContactService";
import { toast } from "react-toastify";

const initialState = {
  enquiry: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const createEnquiry = createAsyncThunk(
  "contact/enquiry",
  async (enquiry, thunkAPI) => {
    try {
      return await contactService.createEnquiry(enquiry);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createEnquiry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Success";
        state.enquiry = action.payload;
        toast.success("Enquiry submitted.");
      })
      .addCase(createEnquiry.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      });
  },
});

export default contactSlice.reducer;
