import { useEffect, useState } from "react";
import {
  useGetAssignmentMarksQuery,
  useUpdateAssignmentMarkMutation,
} from "../../../redux/features/assignment-marks/assignmentMarksAPI";
import notify from "../../../utils/notify.js";
import LoadingSpinner from "../../ui/LoadingSpinner";
import Message from "../../ui/Message";
import AssignmentMarkItem from "./AssignmentMarkItem";

// count number of assignment-marks according to statuses.
const statusCounter = (assignmentMarks) => {
  return assignmentMarks?.reduce(
    (acc, { status }) => ({
      ...acc,
      all: acc["all"] + 1,
      [status]: acc[status] + 1,
    }),
    { all: 0, pending: 0, published: 0 }
  );
};

const AssignmentMarkList = () => {
  const [count, setCount] = useState({});

  const {
    data: assignmentMarks,
    isLoading,
    isError,
  } = useGetAssignmentMarksQuery();

  const [updateAssignmentMarks, { isSuccess: updated, isError: updateFailed }] =
    useUpdateAssignmentMarkMutation();

  const updateHandler = (id, mark) => {
    const updates = {
      id,
      mark,
      status: "published",
    };

    updateAssignmentMarks(updates);
  };

  useEffect(() => {
    if (updated) notify.success("Assignment marks updated successfully");
    else if (updateFailed) notify.error("Failed to update assignment marks");
  }, [updated, updateFailed]);

  useEffect(() => {
    if (assignmentMarks) {
      const count = statusCounter(assignmentMarks);
      setCount(count);
    }
  }, [assignmentMarks]);

  return (
    <section className="py-6 bg-primary">
      <div className="mx-auto max-w-7xl">
        {(isLoading || isError || Boolean(!assignmentMarks?.length)) && (
          <div className="flex items-center justify-center w-full py-8 mt-4">
            {/* loading spinner */}
            {isLoading && <LoadingSpinner />}

            {/* error message */}
            {!isLoading && isError && (
              <Message
                message={"Failed to fetch assignment marks ☹"}
                color="red"
              />
            )}

            {/* empty message */}
            {!isLoading && !isError && Boolean(!assignmentMarks?.length) && (
              <Message message={"No Assignment Marks Available 👻"} />
            )}
          </div>
        )}

        {Boolean(assignmentMarks?.length) && (
          <div className="px-5 py-20 bg-opacity-10">
            <ul className="assignment-status">
              <li>
                Total <span>{count?.all || 0}</span>
              </li>
              <li>
                Pending <span>{count?.pending || 0}</span>
              </li>
              <li>
                Mark Sent <span>{count?.published || 0}</span>
              </li>
            </ul>
            <div className="mt-4 overflow-x-auto border border-slate-800">
              <table className="w-full text-base divide-gray-600 divide-y-1">
                <thead className="bg-slate-800">
                  <tr>
                    <th className="table-th">Assignment</th>
                    <th className="table-th">Date</th>
                    <th className="table-th">Student Name</th>
                    <th className="table-th">Repo Link</th>
                    <th className="table-th">Mark</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-600/50">
                  {assignmentMarks?.map((assignmentMark) => (
                    <AssignmentMarkItem
                      key={assignmentMark.id}
                      updateHandler={updateHandler}
                      assignmentMark={assignmentMark}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AssignmentMarkList;
