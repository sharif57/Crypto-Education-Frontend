"use client";

import baseApi from "../Api/baseApi";

export const referralApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        affiliateEarnings: builder.query({
            query: () => ({
                url: "/referral/affiliate-earnings/",
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            }),
            providesTags: ["Referral"],
        }),

        // /referral/affiliate-details/
        affiliateDetails: builder.query({
            query: () => ({
                url: "/referral/affiliate-details/",
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            }),
            providesTags: ["Referral"],
        }),

        // /referral/withdrawal/request/
        referralWithdrawalRequest: builder.mutation({
            query: (body) => ({
                url: "/referral/withdrawal/request/",
                method: "POST",
                body,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            }),
            invalidatesTags: ["Referral"],
        }),

        // /referral/withdrawal-history/
        withdrawalHistory: builder.query({
            query: () => ({
                url: "/referral/withdrawal-history/",
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            }),
            providesTags: ["Referral"],
        }),

    }),
});

export const { useAffiliateEarningsQuery, useAffiliateDetailsQuery, useReferralWithdrawalRequestMutation , useWithdrawalHistoryQuery } = referralApi;
