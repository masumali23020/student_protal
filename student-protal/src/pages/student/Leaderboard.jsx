import { useSelector } from "react-redux";
import { Fragment, useEffect, useState } from "react";

// RTK query hooks.
import { useGetQuizMarksQuery } from "../../redux/features/quiz-mark/quizMarkAPI";
import { useGetAssignmentMarksQuery } from "../../redux/features/assignment-marks/assignmentMarksAPI";

// custom hooks.
import useChangeTitle from "../../hooks/useChangeTitle";

// react components.
import Message from "../../components/ui/Message";
import Navbar from "../../components/student/navbar/Navbar";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import TopResult from "../../components/student/leaderboard/TopResult";
import StudentPosition from "../../components/student/leaderboard/StudentPosition";

// utitility functions.
import getResultSheet from "../../utils/prepareResult";

const Leaderboard = () => {
  const changeTitle = useChangeTitle();
  const [result, setResult] = useState([]);
  const { user } = useSelector((state) => state.auth);

  // fetch quiz-marks.
  const {
    data: quizMarks,
    isLoading: qLoading,
    isError: qError,
  } = useGetQuizMarksQuery();

  // fetch assignment-marks.
  const {
    data: assignmentMarks,
    isLoading: aLoading,
    isError: aError,
  } = useGetAssignmentMarksQuery();

  // get mark sheet from assignment-marks and quiz-makrs.
  useEffect(() => {
    if (quizMarks && assignmentMarks) {
      const resultSheet = getResultSheet(quizMarks, assignmentMarks);
      setResult(resultSheet);
    }
  }, [quizMarks, assignmentMarks]);

  // set page title.
  useEffect(() => changeTitle("Student | Leaderboard"), []);

  return (
    <Fragment>
      <Navbar />
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5">
          {/* loading spinner */}
          {(qLoading || aLoading) && <LoadingSpinner />}

          {/* error message */}
          {(qError || aError) && (
            <Message message={"Failed to fetch marks ☹"} color="red" />
          )}

          {quizMarks && assignmentMarks && (
            <Fragment>
              <StudentPosition result={result} user={user} />
              <TopResult result={result} user={user} />
            </Fragment>
          )}
        </div>
      </section>
    </Fragment>
  );
};

export default Leaderboard;
