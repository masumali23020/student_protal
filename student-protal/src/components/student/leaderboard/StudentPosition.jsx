const StudentPosition = ({ result, user }) => {
  const thisUser = result?.find(({ student_id }) => student_id === user?.id);

  const { position, student_name, quiz_mark, assignment_mark, total } =
    thisUser || {};

  return (
    <div>
      <h3 className="text-lg font-bold">Your Position in Leaderboard</h3>
      <table className="w-full my-4 text-base border rounded-md border-slate-600/50">
        <thead className="bg-slate-800">
          <tr className="border-b border-slate-600/50">
            <th className="table-th !text-center">Rank</th>
            <th className="table-th !text-center">Name</th>
            <th className="table-th !text-center">Quiz Mark</th>
            <th className="table-th !text-center">Assignment Mark</th>
            <th className="table-th !text-center">Total</th>
          </tr>
        </thead>

        <tbody>
          {thisUser ? (
            <tr className="border-2 border-cyan">
              <th className="table-th !text-center">{position}</th>
              <th className="table-th !text-center">{student_name}</th>
              <th className="table-th !text-center">{quiz_mark}</th>
              <th className="table-th !text-center">{assignment_mark}</th>
              <th className="table-th !text-center">{total}</th>
            </tr>
          ) : (
            <tr>
              <td colSpan={5} className="table-th !text-center">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentPosition;
