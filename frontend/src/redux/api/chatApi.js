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
  }),
});

export const {
  useAccessChatMutation,
  useFetchChatsQuery,
  useCreateGroupMutation,
} = chatApiSlice;
