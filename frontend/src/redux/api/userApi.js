import apiSlice from ".";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (payload) => ({
        url: `api/user/signup`,
        method: "post",
        body: payload,
      }),
    }),
    login: builder.mutation({
      query: (payload) => ({
        url: `api/user/login`,
        method: "post",
        body: payload,
      }),
    }),
  }),
});

export const { useRegisterUserMutation, useLoginMutation } = userApiSlice;
export default userApiSlice;
