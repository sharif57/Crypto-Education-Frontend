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

      providesTags: ["User"],
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/auth/user_profile/",
        method: "PUT",
        body: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useLiveClassQuery, useUpdateProfileMutation } = liveRoomApi;
