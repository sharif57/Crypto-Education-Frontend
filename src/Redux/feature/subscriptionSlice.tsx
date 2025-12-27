
"use client";

import baseApi from "../Api/baseApi";

export const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    buySubscription: builder.mutation({
      query: ({ plan , billing_cycle }) => ({
        url: `/subscriptions/stripe/checkout/`,
        method: "POST",
        body: { plan , billing_cycle },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
      invalidatesTags: ["Subscription"],
    }),
  }),
});

export const { useBuySubscriptionMutation } = subscriptionApi;