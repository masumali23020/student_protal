import { Fragment, useEffect } from "react";

// custom hooks.
import useChangeTitle from "../../hooks/useChangeTitle";

// react components.
import Navbar from "../../components/admin/navbar/Navbar";
import AssignmentMarkList from "../../components/admin/assignment-marks/AssignmentMarkList";

const AssignmentMarks = () => {
  const changeTitle = useChangeTitle();

  // set page title.
  useEffect(() => changeTitle("Admin | Assignment Marks"), []);

  return (
    <Fragment>
      <Navbar />
      <AssignmentMarkList />
    </Fragment>
  );
};

export default AssignmentMarks;
