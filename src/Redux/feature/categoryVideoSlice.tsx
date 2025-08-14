"use client";

import baseApi from "../Api/baseApi";

export const categoryVideoApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        categoryVideo: builder.query({
            query: (id) => ({
                url: `/tutorials/categories/courses/${id}/`,
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

        allCourse: builder.query({
            query: () => ({
                url: "/tutorials/courses/",
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            }),
            providesTags: ["Category"],
        }),

        categoryWiseVideo: builder.query({
            query: (id) => ({
                url: `/tutorials/category_videos/${id}/`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            }),
            providesTags: ["Category"],
        }),

        singleVideo: builder.query({
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

export const { useCategoryVideoQuery , useSingleCategoryVideoQuery, useAllCourseQuery, useCategoryWiseVideoQuery, useSingleVideoQuery } = categoryVideoApi;
