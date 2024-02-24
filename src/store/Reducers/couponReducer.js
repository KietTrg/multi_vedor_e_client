import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const applyCoupon = createAsyncThunk(
  "coupon/deleteCoupon",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/apply-coupon`, info, {
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
    messageClear: (state, _) => {
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
  },
});
export const { messageClear } = couponReducer.actions;
export default couponReducer.reducer;
