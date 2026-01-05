"use client";

import baseApi from "../Api/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    userProfile: builder.query({
      query: () => ({
        url: "/auth/user_profile/",
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
        method: "PATCH",
        body: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
      invalidatesTags: ["User"],
    }),

    // /settings/contact/
    userSendMessage: builder.mutation({
      query: (data) => ({
        url: "/settings/contact/",
        method: "POST",
        body: data,
      }),
    })

  }),
});

export const { useUserProfileQuery, useUpdateProfileMutation , useUserSendMessageMutation } = userApi;
