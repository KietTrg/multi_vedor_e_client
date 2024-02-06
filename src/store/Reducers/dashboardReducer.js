import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const get_data = createAsyncThunk(
  "dashboard/get_data",
  async (userId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/home/customer/get-data/${userId}`);
      return fulfillWithValue(data);
    } catch (error) {
      console.log("error: ", error.response.data);
    }
  }
);

export const dashboardReducer = createSlice({
  name: "dashboard",
  initialState: {
    recentOrder: [],
    errorMessage: "",
    successMessage: "",
    totalOrder: 0,
    pendingOrder: 0,
    cancelledOrder: 0,
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(get_data.fulfilled, (state, { payload }) => {
      state.totalOrder = payload.totalOrder;
      state.pendingOrder = payload.pendingOrder;
      state.cancelledOrder = payload.cancelledOrder;
      state.recentOrder = payload.recentOrder;
    });
  },
});
export const { messageClear } = dashboardReducer.actions;
export default dashboardReducer.reducer;
