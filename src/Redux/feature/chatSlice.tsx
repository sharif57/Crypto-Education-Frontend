// "use client";

// import baseApi from "../Api/baseApi";

// export const chatApi = baseApi.injectEndpoints({
//     endpoints: (builder) => ({
//         // /ask_global_question/?language=en
//         askChat: builder.mutation({
//             query: (data) => ({
//                 url: `/ask_global_question/`,
//                 method: "POST",
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//                 },
//             }),
//             invalidatesTags: ["Chat"],
//         }),


//     }),
// });

// export const { useAskChatMutation } = chatApi;
"use client";

import baseApi from "../Api/baseApi";

export const chatApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    createSession: builder.mutation({
      query: () => ({
        url: `/ai/create_session/`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
      invalidatesTags: ["Chat"],
    }),

    askChat: builder.mutation({
      query: (data) => ({
        url: `/ai/ask_global_question/?language=${data.language}`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: data, 
      }),
      invalidatesTags: ["Chat"],
    }),

    singleSession: builder.query({
      query: (id) => ({
        // /ai/session_messages/75cdf860-557a-4068-be44-ba832e872d82/
        url: `/ai/session_messages/${id}/`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
      providesTags: ["Chat"],
    }),

    allSessions: builder.query({
      query: () => ({
        url: `/ai/global_session/`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
      providesTags: ["Chat"],
    }),

    deleteSession: builder.mutation({
      query: (id) => ({
        url: `/ai/rename_global_session/${id}/`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
      invalidatesTags: ["Chat"],
    }),

    editSession: builder.mutation({
      query: (data) => ({
        // /ai/rename_global_session/d88a8551-dc33-46c3-8940-940ea11bda3a/
        url: `/ai/rename_global_session/${data.session_id}/`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: data,
      }),
      invalidatesTags: ["Chat"],
    })

  }),
});

export const { useAskChatMutation , useCreateSessionMutation, useSingleSessionQuery, useAllSessionsQuery, useDeleteSessionMutation, useEditSessionMutation} = chatApi;