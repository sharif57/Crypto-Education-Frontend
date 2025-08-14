// "use client";

// import baseApi from "../Api/baseApi";

// export const subscriptionApi = baseApi.injectEndpoints({
//     endpoints: (builder) => ({
     
//         buySubscription: builder.mutation({
//             query: ({body}) => ({
//                 url: `/subscriptions/create_checkout_session/`,
//                 method: "POST",
//                 body,
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//                 },
//             }),
//             invalidatesTags: ["Subscription"],
//         }),


//     }),
// });

// export const { useBuySubscriptionMutation } = subscriptionApi;
"use client";

import baseApi from "../Api/baseApi";

export const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    buySubscription: builder.mutation({
      query: ({ plan }) => ({
        url: `/subscriptions/create_checkout_session/`,
        method: "POST",
        body: { plan },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
      invalidatesTags: ["Subscription"],
    }),
  }),
});

export const { useBuySubscriptionMutation } = subscriptionApi;