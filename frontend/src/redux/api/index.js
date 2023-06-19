import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiBaseUrl } from "../../config/constants";
import { logout, setAccessToken } from "../features/userSlice";
const baseQuery = fetchBaseQuery({
  baseUrl: apiBaseUrl,
  credentials: "include",
  prepareHeaders: (headers, { getState, endpoint }) => {
    const token = getState().user.token;
    if (endpoint !== "login" || endpoint !== "registerUser")
      headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

const baseQueyWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (
    result?.error?.status === 401 &&
    result?.error?.data?.message === "token expired"
  ) {
    console.log("sending refresh token");
    const refreshResult = await baseQuery(
      "/api/auth/refresh",
      api,
      extraOptions
    );
    if (refreshResult?.data?.accessToken) {
      api.dispatch(setAccessToken(refreshResult.data));
      //retring original request
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};
const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: ["user", "chat"],
  baseQuery: baseQueyWithReauth,
  endpoints: () => ({}),
});

export default apiSlice;
