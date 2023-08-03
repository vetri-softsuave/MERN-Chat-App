import { createSlice } from "@reduxjs/toolkit";
import apiSlice from "../api";
const initialState = {
  chats: [],
  messages: [],
  selectedChat: {},
  notifications: [],
};
const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setSelectedChat: (state, action) => {
      state.selectedChat = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addNewMessage: (state, action) => {
      if (
        !state.messages.at(-1) ||
        state.messages.at(-1)?._id !== action.payload._id
      ) {
        console.log("adding new message ", action.payload);
        state.messages.push(action.payload);
      }
    },
    addNotifications: (state, action) => {
      if (
        !state.notifications.at(-1) ||
        state.notifications.at(-1)?._id !== action.payload._id
      )
        state.notifications.push(action.payload);
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
        state.messages = [];
        state.selectedChat = {};
      }),
      builder.addMatcher(
        apiSlice.endpoints.getMessages.matchFulfilled,
        (state, { payload }) => {
          state.messages = payload || [];
        }
      );
  },
});

export const { setSelectedChat, addNewMessage, setMessages } =
  chatSlice.actions;
export default chatSlice.reducer;
