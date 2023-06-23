import { useEffect, Fragment } from "react";

// custom hooks.
import useChangeTitle from "../../hooks/useChangeTitle";

// react components.
import Navbar from "../../components/student/navbar/Navbar";
import QuestionList from "../../components/student/quiz/QuestionList";

const Quiz = () => {
  const changeTitle = useChangeTitle();

  // set page title.
  useEffect(() => changeTitle("Student | Quiz"), []);

  return (
    <Fragment>
      <Navbar />
      <QuestionList />
    </Fragment>
  );
};

export default Quiz;
