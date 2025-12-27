import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://10.10.12.49:8009/api/v1", // Use the local development URL here
    baseUrl: "https://api.theclue.io/api/v1", // Use the production URL here
  }),
  tagTypes: [
    "User",
    'LiveClass',
    "Category",
    "Privacy",
    'Chat',
    'Subscription',
    "Referral"
   
  ],
  endpoints: () => ({}),
});

export default baseApi;
