import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../api/api";
// import { get } from "mongoose";
export const get_category = createAsyncThunk(
  "category/get_category",
  async (_, { fulfillWithValue }) => {
    try {
      const { data } = await api.get("/home/get-categorys");
      return fulfillWithValue(data);
    } catch (error) {
      console.log("error: ", error.response);
    }
  }
);
export const get_products = createAsyncThunk(
  "product/get_products",
  async (_, { fulfillWithValue }) => {
    try {
      const { data } = await api.get("/home/get-products");
      return fulfillWithValue(data);
    } catch (error) {
      console.log("error: ", error.response);
    }
  }
);
export const get_product = createAsyncThunk(
  "product/get_product",
  async (pid, { fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/home/get-product/${pid}`);
      console.log("data: ", data);
      return fulfillWithValue(data);
    } catch (error) {
      console.log("error: ", error.response);
    }
  }
);
export const price_range_product = createAsyncThunk(
  "product/price_range_product",
  async (_, { fulfillWithValue }) => {
    try {
      const { data } = await api.get("/home/price-range-latest-product");
      return fulfillWithValue(data);
    } catch (error) {
      console.log("error: ", error.response);
    }
  }
);
export const query_products = createAsyncThunk(
  "product/query_products",
  async (query, { fulfillWithValue }) => {
    console.log("query: ", query);
    try {
      const { data } = await api.get(
        `/home/query-products?category=${query.category}&&rating=${
          query.rating
        }&&lowPrice=${query.low}&&hightPrice=${query.hight}&&sortPrice=${
          query.sortPrice
        }&&pageNumber=${query.pageNumber}&&searchValue=${
          query.searchValue ? query.searchValue : ""
        }`
      );
      return fulfillWithValue(data);
    } catch (error) {
      console.log("error: ", error.response);
    }
  }
);
export const customer_review = createAsyncThunk(
  "review/customer_review",
  async (info, { fulfillWithValue }) => {
    console.log("info: ", info);
    try {
      const { data } = await api.post("/home/customer/submit-review", info);
      console.log("data: ", data);
      return fulfillWithValue(data);
    } catch (error) {
      console.log("error: ", error.response);
    }
  }
);
export const get_review = createAsyncThunk(
  "review/get_review",
  async ({ productId, pageNumber }, { fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/home/customer/get-review/${productId}?pageNo=${pageNumber}`
      );
      console.log("data: ", data);
      return fulfillWithValue(data);
    } catch (error) {
      console.log("error: ", error.response);
    }
  }
);
export const getCoupons = createAsyncThunk(
  "coupon/getCoupons",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get("/home/getAll-coupon", {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const addToCoupons = createAsyncThunk(
  "coupon/addToCoupons",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/home/add-to-voucher", info, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const homeReducer = createSlice({
  name: "home",
  initialState: {
    categorys: [],
    products: [],
    product: {},
    totalProducts: 0,
    parPage: 4,
    latesProducts: [],
    topProducts: [],
    saleProducts: [],
    moreProducts: [],
    relatedProducts: [],
    priceRange: {
      low: 0,
      high: 1200000,
    },
    reviews: [],
    totalReview: 0,
    ratingReview: [],
    errorMessage: "",
    successMessage: "",
    coupons: [],
    totalCoupon: 0,
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(get_category.fulfilled, (state, { payload }) => {
      state.categorys = payload.categorys;
    });
    builder.addCase(get_products.fulfilled, (state, { payload }) => {
      state.products = payload.products;
      state.latesProducts = payload.latesProducts;
      state.topProducts = payload.topProducts;
      state.saleProducts = payload.saleProducts;
    });
    builder.addCase(get_product.fulfilled, (state, { payload }) => {
      state.product = payload.product;
      state.relatedProducts = payload.relatedProducts;
      state.moreProducts = payload.moreProducts;
    });
    builder.addCase(price_range_product.fulfilled, (state, { payload }) => {
      state.latesProducts = payload.latesProducts;
      state.priceRange = payload.priceRange;
    });
    builder.addCase(query_products.fulfilled, (state, { payload }) => {
      state.products = payload.products;
      state.parPage = payload.parPage;
      state.totalProducts = payload.totalProduct;
    });
    builder.addCase(customer_review.fulfilled, (state, { payload }) => {
      state.successMessage = payload.message;
    });
    builder.addCase(get_review.fulfilled, (state, { payload }) => {
      state.reviews = payload.reviews;
      state.totalReview = payload.totalReview;
      state.ratingReview = payload.ratingReview;
    });
    builder.addCase(getCoupons.fulfilled, (state, { payload }) => {
      state.coupons = payload.coupons;
      state.totalCoupon = payload.totalCoupon;
    });
    builder.addCase(addToCoupons.rejected, (state, { payload }) => {
      state.errorMessage = payload.error;
    });
    builder.addCase(addToCoupons.fulfilled, (state, { payload }) => {
      state.successMessage = payload.message;
    });
  },
});
export const { messageClear } = homeReducer.actions;
export default homeReducer.reducer;
