import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  useDeleteAssignmentMutation,
  useGetAssignmentsQuery,
} from "../../../redux/features/assignments/assignmentsAPI";
import notify from "../../../utils/notify";
import LoadingSpinner from "../../ui/LoadingSpinner";
import Message from "../../ui/Message";
import AssignmentItem from "./AssignmentItem";

const AssignmentList = () => {
  const navigate = useNavigate();

  const { data: assignments, isLoading, isError } = useGetAssignmentsQuery();
  const [deleteAssignment, { isSuccess: deleted, isError: deleteFailed }] =
    useDeleteAssignmentMutation();

  const addAssignment = () => navigate("/admin/assignments/add");

  useEffect(() => {
    if (deleted) notify.success("Assignment deleted successfully");
    else if (deleteFailed) notify.error("Failed to delete assignment");
  }, [deleted, deleteFailed]);

  return (
    <section className="py-6 bg-primary">
      <div className="mx-auto max-w-7xl">
        <div className="px-5 py-20 bg-opacity-10">
          <div className="flex w-full">
            <button className="ml-auto btn" onClick={addAssignment}>
              Add Assignment
            </button>
          </div>
          {(isLoading || isError || Boolean(!assignments?.length)) && (
            <div className="flex items-center justify-center w-full py-8 mt-4">
             
              {isLoading && <LoadingSpinner />}

          
              {!isLoading && isError && (
                <Message
                  message={"Failed to fetch assignments ☹"}
                  color="red"
                />
              )}

              {/* empty message */}
              {!isLoading && !isError && Boolean(!assignments?.length) && (
                <Message message={"No Assignment Available 👻"} />
              )}
            </div>
          )}

          <div className="mt-4 overflow-x-auto border border-slate-800">
            {Boolean(assignments?.length) && (
              <table className="w-full text-base divide-gray-600 divide-y-1">
                <thead className="bg-slate-800">
                  <tr>
                    <th className="table-th">Title</th>
                    <th className="table-th">Video Title</th>
                    <th className="table-th">Marks</th>
                    <th className="table-th">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-600/50">
                  {assignments?.map((assignment) => (
                    <AssignmentItem
                      key={assignment.id}
                      assignment={assignment}
                      deleteAssignment={deleteAssignment}
                    />
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AssignmentList;
