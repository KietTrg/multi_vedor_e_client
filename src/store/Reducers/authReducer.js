import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import { jwtDecode } from "jwt-decode";
export const customer_register = createAsyncThunk(
  "auth/customer_register",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    console.log("info: ", info);
    try {
      const { data } = await api.post("/customer/customer-register", info);
      console.log("data: ", data);
      localStorage.setItem("customerToken", data.token);
      return fulfillWithValue(data);
    } catch (error) {
      console.log("error: ", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
export const customer_login = createAsyncThunk(
  "auth/customer_login",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    console.log("info: ", info);
    try {
      const { data } = await api.post("/customer/customer-login", info);
      console.log("data: ", data);
      localStorage.setItem("customerToken", data.token);
      return fulfillWithValue(data);
    } catch (error) {
      console.log("error: ", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
const decodeToken = (token) => {
  if (token) {
    const userInfo = jwtDecode(token);
    return userInfo;
  }
};
export const change_Password = createAsyncThunk(
  "auth/change_Password",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    console.log("info: ", info);
    try {
      const { data } = await api.post("/customer/change-Password", info);
      console.log("data: ", data);

      return fulfillWithValue(data);
    } catch (error) {
      console.log("error: ", error.message);
      return rejectWithValue(error.response.data);
    }
  }
);
export const authReducer = createSlice({
  name: "auth",
  initialState: {
    loader: false,
    userInfo: decodeToken(localStorage.getItem("customerToken")),
    errorMessage: "",
    successMessage: "",
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
    user_reset: (state, _) => {
      state.userInfo = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(customer_register.pending, (state, _) => {
      state.loader = true;
    });
    builder.addCase(customer_register.rejected, (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload.error;
    });
    builder.addCase(customer_register.fulfilled, (state, { payload }) => {
      state.loader = false;
      state.userInfo = payload.userInfo;
      state.successMessage = payload.message;
      state.userInfo = decodeToken(payload.token);
    });
    builder.addCase(customer_login.pending, (state, _) => {
      state.loader = true;
    });
    builder.addCase(customer_login.rejected, (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload.error;
    });
    builder.addCase(customer_login.fulfilled, (state, { payload }) => {
      state.loader = false;
      state.userInfo = payload.userInfo;
      state.successMessage = payload.message;
      state.userInfo = decodeToken(payload.token);
    });
    builder.addCase(change_Password.pending, (state, _) => {
      state.loader = true;
    });
    builder.addCase(change_Password.rejected, (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload.message;
    });
    builder.addCase(change_Password.fulfilled, (state, { payload }) => {
      state.loader = false;

      state.successMessage = payload.message;
    });
  },
});
export const { messageClear, user_reset } = authReducer.actions;
export default authReducer.reducer;
