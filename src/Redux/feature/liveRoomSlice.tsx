"use client";

import baseApi from "../Api/baseApi";

export const liveRoomApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        liveClass: builder.query({
            query: () => ({
                url: "/tutorials/live_classes/",
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            }),

            providesTags: ["LiveClass"],
        }),


    }),
});

export const { useLiveClassQuery } = liveRoomApi;
