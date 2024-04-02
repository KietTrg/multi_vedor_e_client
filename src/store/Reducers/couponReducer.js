import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const applyCoupon = createAsyncThunk(
  "coupon/applyCoupon",
  async ({ info, userId }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(
        `/apply-coupon`,
        { info, userId },
        {
          withCredentials: true,
        }
      );
      console.log("data: ", data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getVoucherCustomer = createAsyncThunk(
  "coupon/getVoucherCustomer",
  async (userId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/home/get-voucher-customer/${userId}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const couponReducer = createSlice({
  name: "coupon",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    totalCoupon: 0,
    coupons: [],
    coupon: {},
    percentCoupon: 0,
  },
  reducers: {
    messageCouponClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(applyCoupon.pending, (state, { payload }) => {
      state.loader = true;
    });
    builder.addCase(applyCoupon.rejected, (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload.message;
    });
    builder.addCase(applyCoupon.fulfilled, (state, { payload }) => {
      state.loader = false;
      state.successMessage = payload.message;
      state.percentCoupon = payload.percentCoupon;
    });
    builder.addCase(getVoucherCustomer.fulfilled, (state, { payload }) => {
      state.totalCoupon = payload.getAllVoucherByCustomerCount;
      state.coupons = payload.getAllVoucherByCustomer;
    });
  },
});
export const { messageCouponClear } = couponReducer.actions;
export default couponReducer.reducer;
