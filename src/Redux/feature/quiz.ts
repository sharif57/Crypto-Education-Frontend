
import baseApi from "../Api/baseApi";

export const quizApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // /tutorials/quizes/64
        quizQuestions: builder.query({
            query: (id) => ({
                url: `/tutorials/quizes/${id}/`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            }),
            providesTags: ["Quiz"],
        }),
        // /tutorials/quizes/submit-answer/
        submitAnswer: builder.mutation({
            query: (data) => ({
                url: `/tutorials/quizes/submit-answer/`,
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
                body: data,
            }),
            invalidatesTags: ["Quiz"],
        }),

        // /tutorials/quizes/result/64
        quizResult: builder.query({
            query: (id) => ({
                url: `/tutorials/quizes/result/${id}/`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            }),
            providesTags: ["Quiz"],
        }),

    }),
});

export const {
    useQuizQuestionsQuery,
    useSubmitAnswerMutation,
    useQuizResultQuery
} = quizApi;
