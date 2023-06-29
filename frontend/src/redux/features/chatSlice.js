import { createSlice } from "@reduxjs/toolkit";
import apiSlice from "../api";
const initialState = {
  chats: [],
  selectedChat: {},
};
const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setSelectedChat: (state, action) => {
      state.selectedChat = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(apiSlice.endpoints.fetchChats.matchFulfilled, (state, {payload}) => {
      state.chats = payload;
    }),
      builder.addMatcher(apiSlice.endpoints.logout.matchFulfilled, (state) => {
        state.chats = [];
        state.selectedChat = {};
      });
  },
});

export const { setSelectedChat } = chatSlice.actions;
export default chatSlice.reducer;
