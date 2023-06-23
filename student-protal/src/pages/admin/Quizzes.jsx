import { Fragment, useEffect } from "react";

// custom hooks.
import useChangeTitle from "../../hooks/useChangeTitle";

// react components.
import Navbar from "../../components/admin/navbar/Navbar";
import QuizList from "../../components/admin/quizzes/QuizList";

const Quizzes = () => {
  const changeTitle = useChangeTitle();

  // set page title.
  useEffect(() => changeTitle("Admin | Quizzes"), []);

  return (
    <Fragment>
      <Navbar />
      <QuizList />
    </Fragment>
  );
};

export default Quizzes;
