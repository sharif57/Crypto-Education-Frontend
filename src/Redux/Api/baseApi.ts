import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://194.59.165.181:8080/api/v1",
  }),
  tagTypes: [
    "User",
    'LiveClass',
    "Category",
    "Privacy",
    'Chat'
   
  ],
  endpoints: () => ({}),
});

export default baseApi;
