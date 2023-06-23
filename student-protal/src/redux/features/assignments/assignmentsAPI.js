import apiSlice from "../api/apiSlice";

const assignmentsAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // fetch all assignments.
    getAssignments: builder.query({
      query: () => ({
        url: "/assignments",
      }),
    }),

    // fetch a single assignment.
    getAssignment: builder.query({
      query: (id) => ({
        url: `/assignments/${id}`,
      }),
    }),

    // fetch related assignment of a video.
    getRelatedAssignment: builder.query({
      query: (videoId) => ({
        url: `assignments?video_id=${videoId}`,
      }),
    }),

    // add a new assignment.
    addAssignment: builder.mutation({
      query: (data) => ({
        url: "/assignments",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data: createdAssignment } = await queryFulfilled;

          // pessimistic cash update.
          dispatch(
            apiSlice.util.updateQueryData(
              "getAssignments",
              undefined,
              (draft) => {
                draft.push(createdAssignment);
              }
            )
          );
        } catch (error) {}
      },
    }),

    // update an existing assignment.
    updateAssignment: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/assignments/${id}`,
        method: "PATCH",
        body: patch,
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data: updatedAssignment } = await queryFulfilled;

          // pessimistic cash update.
          dispatch(
            apiSlice.util.updateQueryData(
              "getAssignments",
              undefined,
              (draft) => {
                return draft.map((assignment) =>
                  assignment.id == arg.id ? updatedAssignment : assignment
                );
              }
            )
          );

          // pessimistic cash update.
          dispatch(
            apiSlice.util.updateQueryData("getAssignment", arg.id, (draft) => {
              return updatedAssignment;
            })
          );
        } catch (error) {}
      },
    }),

    // delete an existing assignment.
    deleteAssignment: builder.mutation({
      query: (id) => ({
        url: `assignments/${id}`,
        method: "DELETE",
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        // optimistic cache update.
        const result = dispatch(
          apiSlice.util.updateQueryData(
            "getAssignments",
            undefined,
            (draft) => {
              return draft.filter((assignment) => assignment.id != arg);
            }
          )
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
  useGetAssignmentQuery,
  useGetAssignmentsQuery,
  useAddAssignmentMutation,
  useUpdateAssignmentMutation,
  useDeleteAssignmentMutation,
  useGetRelatedAssignmentQuery,
  useLazyGetRelatedAssignmentQuery,
} = assignmentsAPI;
export default assignmentsAPI;
