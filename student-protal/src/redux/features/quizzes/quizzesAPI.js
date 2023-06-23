import apiSlice from "../api/apiSlice";

const quizzesAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // fetch all quizzes.
    getQuizzes: builder.query({
      query: () => ({
        url: "/quizzes",
      }),
    }),

    // fetch a single quiz.
    getQuiz: builder.query({
      query: (id) => ({
        url: `/quizzes/${id}`,
      }),
    }),

    // fetch related quiz of a video.
    getRelatedQuiz: builder.query({
      query: (videoId) => ({
        url: `/quizzes?video_id=${videoId}`,
      }),
    }),

    // add a new quiz.
    addQuiz: builder.mutation({
      query: (data) => ({
        url: "/quizzes",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data: createdQuiz } = await queryFulfilled;

          // pessimistic cash update.
          dispatch(
            apiSlice.util.updateQueryData("getQuizzes", undefined, (draft) => {
              draft.push(createdQuiz);
            })
          );
        } catch (error) {}
      },
    }),

    // update an existing quiz.
    updateQuiz: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/quizzes/${id}`,
        method: "PATCH",
        body: patch,
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data: updatedQuiz } = await queryFulfilled;

          // pessimistic cash update.
          dispatch(
            apiSlice.util.updateQueryData("getQuizzes", undefined, (draft) => {
              return draft.map((quiz) =>
                quiz.id == arg.id ? updatedQuiz : quiz
              );
            })
          );

          // pessimistic cash update.
          dispatch(
            apiSlice.util.updateQueryData("getQuiz", arg.id, (draft) => {
              return updatedQuiz;
            })
          );
        } catch (error) {}
      },
    }),

    // delete an existing quiz.
    deleteQuiz: builder.mutation({
      query: (id) => ({
        url: `quizzes/${id}`,
        method: "DELETE",
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        // optimistic cache update.
        const result = dispatch(
          apiSlice.util.updateQueryData("getQuizzes", undefined, (draft) => {
            return draft.filter((quiz) => quiz.id != arg);
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
  useGetQuizQuery,
  useGetQuizzesQuery,
  useAddQuizMutation,
  useUpdateQuizMutation,
  useDeleteQuizMutation,
  useGetRelatedQuizQuery,
} = quizzesAPI;
export default quizzesAPI;
