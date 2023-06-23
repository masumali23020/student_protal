const TopResult = ({ result, user }) => {
  // result = result.filter(({ position }) => position <= 20);
  result = result.slice(0, 21);

  return (
    <div className="my-8">
      <h3 className="text-lg font-bold">Top 20 Result</h3>
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
          {Boolean(result?.length) &&
            result?.map((item) => (
              <tr
                key={item.student_id}
                className={`${
                  item.student_id === user?.id
                    ? "border-2 border-cyan"
                    : "border-b border-slate-600/50"
                }`}
              >
                <td className="text-center table-td">
                  {item.position === 1 ? "🏆" : item.position}
                </td>
                <td className="text-center table-td">{item.student_name}</td>
                <td className="text-center table-td">{item.quiz_mark}</td>
                <td className="text-center table-td">{item.assignment_mark}</td>
                <td className="!text-center table-td">{item.total}</td>
              </tr>
            ))}

          {!Boolean(result?.length) && (
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

export default TopResult;
