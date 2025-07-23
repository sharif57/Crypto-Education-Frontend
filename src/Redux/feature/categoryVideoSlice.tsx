"use client";

import baseApi from "../Api/baseApi";

export const categoryVideoApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        categoryVideo: builder.query({
            query: () => ({
                url: "/tutorials/category_videos/",
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            }),

            providesTags: ["Category"],
        }),

        singleCategoryVideo: builder.query({
            query: (id) => ({
                url: `/tutorials/videos/${id}/`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            }),
            providesTags: ["Category"],
        }),


    }),
});

export const { useCategoryVideoQuery , useSingleCategoryVideoQuery} = categoryVideoApi;
