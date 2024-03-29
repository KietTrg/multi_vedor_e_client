import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const place_order = createAsyncThunk(
  "order/place_order",
  async (
    { price, product, shipping_fee, shippingInfo, userId, navigate, items },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.post("/home/order/place-order", {
        price,
        product,
        shipping_fee,
        shippingInfo,
        userId,
        navigate,
        items,
      });
      navigate("/payment", {
        state: {
          price,
          items,
          orderId: data.orderId,
        },
      });
      console.log("data: ", data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_orders = createAsyncThunk(
  "order/get_orders",
  async ({ customerId, status }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/home/customer/get-orders/${customerId}/${status}`
      );
      return fulfillWithValue(data);
    } catch (error) {
      console.log("error: ", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
export const get_order = createAsyncThunk(
  "order/get_order",
  async (orderId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/home/customer/get-order/${orderId}`);
      console.log("data: ", data);
      return fulfillWithValue(data);
    } catch (error) {
      console.log("error: ", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const orderReducer = createSlice({
  name: "order",
  initialState: {
    myOrders: [],
    myOrder: {},
    errorMessage: "",
    successMessage: "",
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(get_orders.fulfilled, (state, { payload }) => {
      state.myOrders = payload.orders;
    });
    builder.addCase(get_order.fulfilled, (state, { payload }) => {
      state.myOrder = payload.order;
    });
  },
});
export const { messageClear } = orderReducer.actions;
export default orderReducer.reducer;
