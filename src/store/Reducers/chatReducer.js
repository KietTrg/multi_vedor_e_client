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

export const send_message = createAsyncThunk(
  "chat/send_message",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(
        "/chat/customer/send-message-to-seller",
        info
      );
      console.log("data: ", data);
      return fulfillWithValue(data);
    } catch (error) {
      console.log("error: ", error);
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
    updateMessage: (state, { payload }) => {
      state.friend_messages = [...state.friend_messages, payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(add_friend.fulfilled, (state, { payload }) => {
      state.friend_messages = payload.messages;
      state.currentFriend = payload.currentFriend;
      state.my_friends = payload.myFriends;
    });
    builder.addCase(send_message.fulfilled, (state, { payload }) => {
      let tempFriends = state.my_friends;
      let index = tempFriends.findIndex(
        (e) => e.friendId === payload.message.receverId
      );
      while (index > 0) {
        let temp = tempFriends[index];
        tempFriends[index] = tempFriends[index - 1];
        tempFriends[index - 1] = temp;
      }
      state.my_friends = tempFriends;
      state.friend_messages = [...state.friend_messages, payload.message];
      state.successMessage = "message send success";
    });
  },
});
export const { messageClear, updateMessage } = chatReducer.actions;
export default chatReducer.reducer;
