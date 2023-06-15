import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiBaseUrl } from "../../config/constants";
const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: apiBaseUrl,
    prepareHeaders: (headers, { getState, endpoint }) => {
      const token = getState().user.token;
      if (endpoint !== "login" || endpoint !== "registerUser")
        headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: () => ({}),
});

export default apiSlice;
