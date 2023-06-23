import { useState } from "react";
import { format } from "date-fns";

// utility functions.
import notify from "../../../utils/notify";
import truncateString from "../../../utils/truncateString";

// check validity of  the marks.
function isValid(str) {
  return !isNaN(str) && !isNaN(parseInt(str));
}

const AssignmentMarkItem = ({ assignmentMark, updateHandler }) => {
  const {
    id,
    title,
    createdAt,
    student_name,
    repo_link,
    mark,
    totalMark,
    status,
  } = assignmentMark || {};

  const [marksGot, setMarksGot] = useState(totalMark);

  const changeHandler = (event) => {
    const { value } = event.target;
    setMarksGot(value);
  };

  const updateHelper = () => {
    const valid = isValid(marksGot);

    if (!valid) {
      notify.error("Invalid marks input");
      return;
    } else if (marksGot < 0) {
      notify.error("Marks must be greater than 0");
      return;
    } else if (marksGot > totalMark) {
      notify.error(`Marks must be less than or equal to ${totalMark}`);
      return;
    }

    updateHandler(id, parseInt(marksGot));
  };

  return (
    <tr>
      <td className="table-td">{truncateString(title, 40)}</td>
      <td className="table-td">
        {format(new Date(createdAt), "dd LLL yyyy hh:mm:ss a")}
      </td>
      <td className="table-td">{student_name}</td>
      <td className="table-td">{truncateString(repo_link, 40)}</td>
      {status === "pending" && (
        <td className="table-td input-mark">
          <input
            required
            type="text"
            value={marksGot}
            onChange={changeHandler}
          />

          <svg
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            onClick={updateHelper}
            className="w-6 h-6 text-green-500 cursor-pointer hover:text-green-400 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </td>
      )}

      {status === "published" && <td className="table-td">{mark}</td>}
    </tr>
  );
};

export default AssignmentMarkItem;
