import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import userService from "./userService";
import { toast } from "react-toastify";

const getUserFromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;

const initialState = {
  newUser: null,
  user: getUserFromLocalStorage,
  cart: null,
  token: "",
  orderUser: null,
  informationUser: null,
  cartUser: null,
  wishList: [],
  createdOrder: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      return await userService.register(user);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (user, thunkAPI) => {
    try {
      return await userService.login(user);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getWishList = createAsyncThunk(
  "auth/getWishList",
  async (thunkAPI) => {
    try {
      return await userService.getWishList();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addToCart = createAsyncThunk(
  "auth/add-to-cart",
  async (cart, thunkAPI) => {
    try {
      return await userService.addToCart(cart);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getCart = createAsyncThunk("auth/get-cart", async (thunkAPI) => {
  try {
    return await userService.getCart();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const deleteProductFromCart = createAsyncThunk(
  "auth/delete-product-cart",
  async (cartId, thunkAPI) => {
    try {
      return await userService.deleteProductFromCart(cartId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateQuantityProductFromCart = createAsyncThunk(
  "auth/update-quantity-product-cart",
  async (cart, thunkAPI) => {
    try {
      return await userService.updateQuantityProductFromCart(cart);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateQuantityProductAddToCart = createAsyncThunk(
  "auth/update-quantity-add-to-cart",
  async (cart, thunkAPI) => {
    try {
      return await userService.updateQuantityAddToCart(cart);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createOrder = createAsyncThunk(
  "auth/cart/create-order",
  async (order, thunkAPI) => {
    try {
      return await userService.createOrder(order);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getOrdersUser = createAsyncThunk(
  "auth/cart/get-order-user",
  async (thunkAPI) => {
    try {
      return await userService.getOrdersUser();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateUser = createAsyncThunk(
  "auth/update-user",
  async (user, thunkAPI) => {
    try {
      return await userService.updateUser(user);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getMyInformation = createAsyncThunk(
  "auth/information-user",
  async (thunkAPI) => {
    try {
      return await userService.getMyInformation();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const forgotPasswordToken = createAsyncThunk(
  "auth/forgot-password",
  async (email, thunkAPI) => {
    try {
      return await userService.forgotPasswordToken(email);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/reset-password",
  async (data, thunkAPI) => {
    try {
      return await userService.resetPassword(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const emptyCart = createAsyncThunk(
  "auth/empty-cart",
  async (thunkAPI) => {
    try {
      return await userService.emptyCart();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Success";
        state.newUser = action.payload;
        if (state.isSuccess === true) {
          toast.success("Account is register!");
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        if (state.isError) {
          toast.error(action.payload.response.data.message);
        }
      })

      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Success";
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        if (state.isError) {
          toast.error(action.payload.response.data.message);
        }
      })

      .addCase(getWishList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWishList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Success";
        state.wishList = action.payload;
      })
      .addCase(getWishList.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })

      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Success";
        state.cart = action.payload;
        toast.success("Add to cart success.");
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })

      .addCase(getCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Success";
        state.cartUser = action.payload;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })

      .addCase(deleteProductFromCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProductFromCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Success";
        toast.success("Product deleted successfully.");
      })
      .addCase(deleteProductFromCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        toast.error("Product deleted error.");
      })

      .addCase(updateQuantityProductFromCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateQuantityProductFromCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Success";
      })
      .addCase(updateQuantityProductFromCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        toast.error("Quantity updated error.");
      })

      .addCase(updateQuantityProductAddToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateQuantityProductAddToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Success";
      })
      .addCase(updateQuantityProductAddToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        toast.error("Quantity updated error.");
      })

      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Success";
        state.createdOrder = action.payload;
        toast.success("Order created successfully.");
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        toast.error("Order error.");
      })

      .addCase(getOrdersUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrdersUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Success";
        state.orderUser = action.payload;
      })
      .addCase(getOrdersUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })

      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Success";
        if (state.isSuccess) {
          const userCurrent = JSON.parse(localStorage.getItem("customer"));
          const newUser = {
            _id: userCurrent?._id,
            token: userCurrent?.token,
            email: action?.payload?.email,
            mobile: action?.payload?.mobile,
            name: action?.payload?.name,
            address: action?.payload?.address,
          };
          localStorage.setItem("customer", JSON.stringify(newUser));
          state.user = newUser;
          state.informationUser = newUser;
          toast.success("User updated successfully.");
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })

      .addCase(getMyInformation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMyInformation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Success";
        state.informationUser = action.payload;
      })
      .addCase(getMyInformation.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })

      .addCase(forgotPasswordToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPasswordToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Success";
        state.token = action.payload;
        toast.success("Please check your email address.");
      })
      .addCase(forgotPasswordToken.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        toast.error("Error");
      })

      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Success";
        toast.success("Password has been changed.");
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        toast.error("Error");
      })

      .addCase(emptyCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(emptyCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Success";
      })
      .addCase(emptyCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })

      .addCase(resetState, () => initialState);
  },
});

export default authSlice.reducer;
