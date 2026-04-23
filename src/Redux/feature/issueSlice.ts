
import baseApi from "../Api/baseApi";

export const issueApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    
    // /settings/report-issue/
    reportIssue: builder.mutation({
      query: (data) => ({
        url: "/settings/report-issue/",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
      invalidatesTags: ["Issue"],
    }),

  }),
});

export const { useReportIssueMutation } = issueApi;
