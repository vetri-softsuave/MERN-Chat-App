import { createSlice } from "@reduxjs/toolkit";
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
});

export const { setSelectedChat } = chatSlice.actions;
export default chatSlice.reducer;
