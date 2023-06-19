import apiSlice from ".";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserDetails: builder.query({
      query: () => `/api/user/`,
    }),
  }),
});

export const { useGetUserDetailsQuery } = userApiSlice;
