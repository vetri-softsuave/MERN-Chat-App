import { createSlice } from "@reduxjs/toolkit";
import apiSlice from "../api";
const initialState = {
  chats: [],
  messages: [],
  selectedChat: {},
};
const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setSelectedChat: (state, action) => {
      state.selectedChat = action.payload;
    },
    addNewMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      apiSlice.endpoints.fetchChats.matchFulfilled,
      (state, { payload }) => {
        state.chats = payload;
      }
    ),
      builder.addMatcher(apiSlice.endpoints.logout.matchFulfilled, (state) => {
        state.chats = [];
        state.selectedChat = {};
      }),
      builder.addMatcher(
        apiSlice.endpoints.getMessages.matchFulfilled,
        (state, { payload }) => {
          state.messages = payload;
        }
      );
  },
});

export const { setSelectedChat, addNewMessage } = chatSlice.actions;
export default chatSlice.reducer;
