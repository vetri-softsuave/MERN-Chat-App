import apiSlice from ".";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserDetails: builder.query({
      query: () => `/api/user/`,
      providesTags: ["user"],
    }),
    searchUsers: builder.query({
      query: (search) => `/api/user/all?search=${search}`
    }),
  }),
});

export const { useGetUserDetailsQuery, useSearchUsersQuery } = userApiSlice;
