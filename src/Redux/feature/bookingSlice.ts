import baseApi from "../Api/baseApi";

export const bookingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        //    /tutorials/save-video/
        saveVideo: builder.mutation({
            query: (data) => ({
                url: "/tutorials/save-video/",
                method: "POST",
                body: data,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            }),
            invalidatesTags: ["Booking", "Category"],
        }),
        // /tutorials/unsave-video/
        unSaveVideo: builder.mutation({
            query: (data) => ({
                url: "/tutorials/unsave-video/",
                method: "DELETE",
                body: data,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            }),
            invalidatesTags: ["Booking", "Category"],
        }),

        // /tutorials/videos/recommended-videos/
        saveVideoList: builder.query({
            query: () => ({
                url: "/tutorials/saved-videos/",
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            }),
            providesTags: ["Booking", "Category"],
        }),

    }),
});

export const {
    useSaveVideoMutation,
    useUnSaveVideoMutation,
    useSaveVideoListQuery
} = bookingApi;
