import apiSlice from ".";

const chatApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    accessChat: builder.mutation({
      query: (payload) => ({
        url: "/api/chat",
        method: "post",
        body: payload,
      }),
      invalidatesTags: ["chat"],
    }),
    fetchChats: builder.query({
      query: () => `/api/chat/`,
      providesTags: ["chat"],
    }),
    createGroup: builder.mutation({
      query: (payload) => ({
        url: "/api/chat/group/",
        method: "post",
        body: payload,
      }),
      invalidatesTags: ["chat"],
    }),
    renameGroup: builder.mutation({
      query: (payload) => ({
        url: "/api/chat/group/rename",
        method: "put",
        body: payload,
      }),
      invalidatesTags: ["chat"],
    }),
    addUserToGroup: builder.mutation({
      query: (payload) => ({
        url: "/api/chat/group/add",
        method: "put",
        body: payload,
      }),
      invalidatesTags: ["chat"],
    }),
    removeUserFromGroup: builder.mutation({
      query: (payload) => ({
        url: "/api/chat/group/remove",
        method: "put",
        body: payload,
      }),
      invalidatesTags: ["chat"],
    }),
    leaveGroup: builder.mutation({
      query: (payload) => ({
        url: "/api/chat/group/leave",
        method: "put",
        body: payload,
      }),
      invalidatesTags: ["chat"],
    }),
    getMessages: builder.query({
      query: (chatId) => `/api/message/${chatId}`,
      transformResponse: (data) => data?.messages,
    }),
    sendMessage: builder.mutation({
      query: (payload) => ({
        url: "api/message",
        method: "post",
        body: payload,
      }),
    }),
  }),
});

export const {
  useAccessChatMutation,
  useFetchChatsQuery,
  useCreateGroupMutation,
  useRenameGroupMutation,
  useAddUserToGroupMutation,
  useRemoveUserFromGroupMutation,
  useLeaveGroupMutation,
  useGetMessagesQuery,
  useSendMessageMutation,
} = chatApiSlice;
