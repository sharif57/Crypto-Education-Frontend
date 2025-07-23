import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://172.252.13.79:3235/api/v1",
  }),
  tagTypes: [
    "User",
    'LiveClass',
    "Category",
   
  ],
  endpoints: () => ({}),
});

export default baseApi;
