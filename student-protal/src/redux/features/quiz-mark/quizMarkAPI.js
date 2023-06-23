import apiSlice from "../api/apiSlice";

const quizMarkAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // fetch all quiz-marks
    getQuizMarks: builder.query({
      query: () => ({
        url: "/quizMark",
      }),
    }),

    // fetch related quiz-mark of a video.
    getRelatedQuizMark: builder.query({
      query: ({ student_id, video_id }) => ({
        url: `/quizMark?student_id=${student_id}&video_id=${video_id}`,
      }),
    }),

    // add a new quiz-mark.
    addQuizMark: builder.mutation({
      query: (data) => ({
        url: "/quizMark",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data: createdQuizMark } = await queryFulfilled;

          const { student_id, video_id } = arg;

          // pessimistic cache update.
          dispatch(
            apiSlice.util.updateQueryData(
              "getRelatedQuizMark",
              { student_id, video_id },
              (draft) => {
                draft.push(createdQuizMark);
              }
            )
          );

          // pessimistic cache update.
          dispatch(
            apiSlice.util.updateQueryData(
              "getQuizMarks",
              undefined,
              (draft) => {
                draft.push(createdQuizMark);
              }
            )
          );
        } catch (error) {}
      },
    }),
  }),
});

export const {
  useGetQuizMarksQuery,
  useAddQuizMarkMutation,
  useGetRelatedQuizMarkQuery,
} = quizMarkAPI;
export default quizMarkAPI;
