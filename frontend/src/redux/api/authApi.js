import apiSlice from ".";

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (payload) => ({
        url: `api/auth/signup`,
        method: "post",
        body: payload,
      }),
      invalidatesTags: ["user"],
    }),
    login: builder.mutation({
      query: (payload) => ({
        url: `api/auth/`,
        method: "post",
        body: payload,
      }),
      invalidatesTags: ["user"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: `api/auth/logout`,
        method: "post",
      }),
    }),
  }),
});

export const { useRegisterUserMutation, useLoginMutation, useLogoutMutation } =
  authApiSlice;
export default authApiSlice;
