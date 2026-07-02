import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://5r6mdm6l-8000.inc1.devtunnels.ms/api/v1", // Use the local development URL here
    baseUrl: "https://api.theclue.io/api/v1", // Use the production URL here
  }),
  tagTypes: [
    "User",
    'LiveClass',
    "Category",
    "Privacy",
    'Chat',
    'Subscription',
    "Referral",
    "Issue",
    'Quiz',
    'Booking'

  ],
  endpoints: () => ({}),
});

export default baseApi;
