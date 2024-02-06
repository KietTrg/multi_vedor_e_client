import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const add_friend = createAsyncThunk(
  "chat/add_friend",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    // console.log("info: ", info);
    try {
      const { data } = await api.post(
        "/chat/customer/add-customer-friend",
        info
      );
      console.log("data: ", data);
      return fulfillWithValue(data);
    } catch (error) {
      // console.log("error: ", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const chatReducer = createSlice({
  name: "chat",
  initialState: {
    my_friends: [],
    friend_messages: [],
    currentFriend: "",
    successMessage: "",
    errorMessage: "",
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(add_friend.fulfilled, (state, { payload }) => {
      state.friend_messages = payload.messages;
      state.currentFriend = payload.currentFriend;
      state.my_friends = payload.myFriends;
    });
  },
});
export const { messageClear } = chatReducer.actions;
export default chatReducer.reducer;
