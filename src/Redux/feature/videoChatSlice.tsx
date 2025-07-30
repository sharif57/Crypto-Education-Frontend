
"use client";

import baseApi from "../Api/baseApi";

export const videoChatApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    videoSessionCreate: builder.mutation({
      query: () => ({
        url: `/ai/create_video_chat_session/`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
      invalidatesTags: ["Chat"],
    }),

    videoAskChatWithId: builder.mutation({
      query: ({data, id}) => ({
        url: `/ai/ask_question_from_video/${id}/?language=${data.language}`,
        // /ai/ask_question_from_video/cbf69f70-3908-482e-8f6b-ff44dca5210a/?language=en
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: data, 
      }),
      invalidatesTags: ["Chat"],
    }),


  }),
});

export const { useVideoAskChatWithIdMutation , useVideoSessionCreateMutation} = videoChatApi;