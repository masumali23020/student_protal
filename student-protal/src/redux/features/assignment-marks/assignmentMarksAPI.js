import apiSlice from "../api/apiSlice";

const assignmentMarksAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // fetch all assignment-marks.
    getAssignmentMarks: builder.query({
      query: () => ({
        url: "/assignmentMark",
      }),
    }),

 
    getRelatedAssignmentMark: builder.query({
      query: ({ student_id, assignment_id }) => ({
        url: `assignmentMark?student_id=${student_id}&assignment_id=${assignment_id}`,
      }),
    }),

 
    addAssignmentMark: builder.mutation({
      query: (data) => ({
        url: "/assignmentMark",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data: createdAssignmentMark } = await queryFulfilled;

          // pessimistic cache update.
          const { student_id, assignment_id } = arg;

          dispatch(
            apiSlice.util.updateQueryData(
              "getRelatedAssignmentMark",
              { student_id, assignment_id },
              (draft) => {
                draft.push(createdAssignmentMark);
              }
            )
          );

          dispatch(
            apiSlice.util.updateQueryData(
              "getAssignmentMarks",
              undefined,
              (draft) => {
                draft.push(createdAssignmentMark);
              }
            )
          );
        } catch (error) {}
      },
    }),


    updateAssignmentMark: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/assignmentMark/${id}`,
        method: "PATCH",
        body: patch,
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data: updatedAssignmentMark } = await queryFulfilled;

          // pessimistic cache update.
          dispatch(
            apiSlice.util.updateQueryData(
              "getAssignmentMarks",
              undefined,
              (draft) => {
                return draft.map((assignmentMark) =>
                  assignmentMark.id == arg.id
                    ? updatedAssignmentMark
                    : assignmentMark
                );
              }
            )
          );
        } catch (error) {}
      },
    }),

    
  }),
});

export const {
  useGetAssignmentMarksQuery,
  useAddAssignmentMarkMutation,
  useUpdateAssignmentMarkMutation,
  useGetRelatedAssignmentMarkQuery,
} = assignmentMarksAPI;
export default assignmentMarksAPI;
