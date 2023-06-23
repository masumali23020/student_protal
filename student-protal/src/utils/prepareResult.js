

// calculate total marks of assignments or quizzes for each student.
const calculateMarks = (marks, type) => {
  const result = {};

  for (const { student_id, student_name, mark } of marks) {
    if (result[student_id]) {
      result[student_id][`${type}_mark`] += Number(mark);
    } else {
      result[student_id] = {
        student_id,
        student_name,
        [`${type}_mark`]: Number(mark),
      };
    }
  }

  return result;
};

// assign position based on student marks.
const assignPostion = (results) => {
  let position = 1;
  let test = results[0]?.total;

  for (const result of results) {
    if (result.total < test) {
      test = result.total;
      result.position = ++position;
    } else result.position = position;
  }
};

// extract required fields form the objects.
const selectProps = (props) => {
  const { student_id, student_name, mark } = props;
  return { student_id, student_name, mark };
};

// merge quiz-marks and assignment-marks together.
const mergeMarks = (assMark, qzMark) => {
  assMark = assMark.map(selectProps);
  qzMark = qzMark.map(selectProps);

  assMark = calculateMarks(assMark, "quiz");
  qzMark = calculateMarks(qzMark, "assignment");

  const keys = new Set([...Object.keys(assMark), ...Object.keys(qzMark)]);
  const merged = [];

  for (const key of keys) {
    const qm = assMark[key] || {};
    const am = qzMark[key] || {};

    const combined = { ...qm, ...am };

    combined["quiz_mark"] = combined["quiz_mark"] ?? 0;
    combined["assignment_mark"] = combined["assignment_mark"] ?? 0;
    combined["total"] = combined["quiz_mark"] + combined["assignment_mark"];

    merged.push(combined);
  }

  return merged;
};

// make a complete result sheet from the assignment-marks and quiz-marks.
const getResultSheet = (quizes = [], assignments = []) => {
  const merged = mergeMarks(quizes, assignments);

  merged.sort((a, b) => b.total - a.total);
  assignPostion(merged);

  return merged;
};

export default getResultSheet;
