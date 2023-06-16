import apiSlice from ".";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (payload) => ({
        url: `api/auth/signup`,
        method: "post",
        body: payload,
      }),
    }),
    login: builder.mutation({
      query: (payload) => ({
        url: `api/auth/`,
        method: "post",
        body: payload,
      }),
    }),
  }),
});

export const { useRegisterUserMutation, useLoginMutation } = userApiSlice;
export default userApiSlice;
