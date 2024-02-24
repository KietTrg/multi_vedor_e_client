import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const add_to_card = createAsyncThunk(
  "card/add_to_card",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/home/product/add_to_card", info);
      console.log("data: ", data);
      return fulfillWithValue(data);
    } catch (error) {
      console.log("error: ", error);
      return rejectWithValue(error.response.data);
    }
  }
);
export const get_card = createAsyncThunk(
  "card/get_card",
  async (userId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/home/product/get-card/${userId}`);
      console.log("data: ", data);
      return fulfillWithValue(data);
    } catch (error) {
      console.log("error: ", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const delete_card = createAsyncThunk(
  "card/delete_card",
  async (cardId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.delete(`/home/product/delete-card/${cardId}`);
      console.log("data: ", data);
      return fulfillWithValue(data);
    } catch (error) {
      console.log("error: ", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const quantity_inc = createAsyncThunk(
  "card/quantity_inc",
  async (cardId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.put(`/home/product/quantity-inc/${cardId}`);
      console.log("data: ", data);
      return fulfillWithValue(data);
    } catch (error) {
      console.log("error: ", error);
      return rejectWithValue(error.response.data);
    }
  }
);
export const quantity_dec = createAsyncThunk(
  "card/quantity_dec",
  async (cardId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.put(`/home/product/quantity-dec/${cardId}`);
      console.log("data: ", data);
      return fulfillWithValue(data);
    } catch (error) {
      console.log("error: ", error);
      return rejectWithValue(error.response.data);
    }
  }
);
export const add_to_wishlist = createAsyncThunk(
  "wishlist/add_to_wishlist",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/home/product/add_to_wishlist", info);
      console.log("data: ", data);
      return fulfillWithValue(data);
    } catch (error) {
      console.log("error: ", error);
      return rejectWithValue(error.response.data);
    }
  }
);
export const get_wishlists = createAsyncThunk(
  "wishlist/get_wishlist",
  async (userId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/home/product/get-wishlists/${userId}`);
      console.log("data: ", data);
      return fulfillWithValue(data);
    } catch (error) {
      console.log("error: ", error);
      return rejectWithValue(error.response.data);
    }
  }
);
export const delete_wishlist = createAsyncThunk(
  "wishlist/delete_wishlist",
  async (wishlistId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.delete(
        `/home/product/delete-wishlists/${wishlistId}`
      );
      console.log("data: ", data);
      return fulfillWithValue(data);
    } catch (error) {
      console.log("error: ", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const cardReducer = createSlice({
  name: "card",
  initialState: {
    card_products: [],
    count: 0,
    buyProductItem: 0,
    wishlist_count: 0,
    wishlist: [],
    errorMessage: "",
    successMessage: "",
    shipping_fee: 0,
    outofstock: [],
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
    reset_count: (state, _) => {
      state.wishlist_count = 0;
      state.count = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(add_to_card.rejected, (state, { payload }) => {
      state.errorMessage = payload.error;
    });
    builder.addCase(add_to_card.fulfilled, (state, { payload }) => {
      state.successMessage = payload.message;
      state.count = state.count + 1;
    });
    builder.addCase(get_card.fulfilled, (state, { payload }) => {
      state.card_products = payload.card_products;
      state.price = payload.price;
      state.count = payload.count;
      state.shipping_fee = payload.shipping_fee;
      state.outofstock = payload.outOfStockProduct;
      state.buyProductItem = payload.buyProductItem;
    });
    builder.addCase(delete_card.fulfilled, (state, { payload }) => {
      state.successMessage = payload.message;
    });
    builder.addCase(quantity_inc.fulfilled, (state, { payload }) => {
      state.successMessage = payload.message;
    });
    builder.addCase(quantity_dec.fulfilled, (state, { payload }) => {
      state.successMessage = payload.message;
    });

    builder.addCase(add_to_wishlist.rejected, (state, { payload }) => {
      state.errorMessage = payload.error;
    });
    builder.addCase(add_to_wishlist.fulfilled, (state, { payload }) => {
      state.successMessage = payload.message;
      state.wishlist_count =
        state.wishlist_count > 0 ? state.wishlist_count + 1 : 1;
    });
    builder.addCase(get_wishlists.fulfilled, (state, { payload }) => {
      state.wishlist = payload.wishlist;
      state.wishlist_count = payload.wishlistCount;
    });
    builder.addCase(delete_wishlist.fulfilled, (state, { payload }) => {
      state.successMessage = payload.message;
    });
  },
});
export const { messageClear, reset_count } = cardReducer.actions;
export default cardReducer.reducer;
