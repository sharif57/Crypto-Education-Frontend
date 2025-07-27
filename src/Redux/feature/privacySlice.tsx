"use client";

import baseApi from "../Api/baseApi";

export const privacyApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        privacy: builder.query({
            query: () => ({
                url: "/settings/privacy_policies/",
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            }),

            providesTags: ["Privacy"],
        }),
        about: builder.query({
            query: () => ({
                url: "/settings/about_us/",
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            }),

            providesTags: ["Privacy"],
        }),
        terms: builder.query({
            query: () => ({
                url: "/settings/terms_conditions/",
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            }),

            providesTags: ["Privacy"],
        }),


    }),
});

export const { usePrivacyQuery , useAboutQuery, useTermsQuery} = privacyApi;
