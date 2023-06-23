import apiSlice from "../api/apiSlice";

const videosAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // fetch all videos.
    getVideos: builder.query({
      query: () => ({
        url: "/videos",
      }),
    }),

    // fetch a single video.
    getVideo: builder.query({
      query: (id) => ({
        url: `/videos/${id}`,
      }),
    }),

    // add a new video.
    addVideo: builder.mutation({
      query: (data) => ({
        url: "/videos",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data: createdVideo } = await queryFulfilled;

          // pessimistic cash update.
          dispatch(
            apiSlice.util.updateQueryData("getVideos", undefined, (draft) => {
              draft.push(createdVideo);
            })
          );
        } catch (error) {}
      },
    }),

    // update an existing video.
    updateVideo: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/videos/${id}`,
        method: "PATCH",
        body: patch,
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data: updatedVideo } = await queryFulfilled;

          // pessimistic cash update.
          dispatch(
            apiSlice.util.updateQueryData("getVideos", undefined, (draft) => {
              return draft.map((video) =>
                video.id == arg.id ? updatedVideo : video
              );
            })
          );

          // pessimistic cash update.
          dispatch(
            apiSlice.util.updateQueryData("getVideo", arg.id, (draft) => {
              return updatedVideo;
            })
          );
        } catch (error) {}
      },
    }),

    // delete an existing video.
    deleteVideo: builder.mutation({
      query: (id) => ({
        url: `videos/${id}`,
        method: "DELETE",
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        // optimistic cache update.
        const result = dispatch(
          apiSlice.util.updateQueryData("getVideos", undefined, (draft) => {
            return draft.filter((video) => video.id != arg);
          })
        );

        try {
          await queryFulfilled;
        } catch (error) {
          result.undo();
        }
      },
    }),
  }),
});

export const {
  useGetVideoQuery,
  useGetVideosQuery,
  useAddVideoMutation,
  useUpdateVideoMutation,
  useDeleteVideoMutation,
} = videosAPI;
export default videosAPI;
