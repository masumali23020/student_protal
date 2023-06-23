import { Fragment, useEffect } from "react";

// custom hooks.
import useChangeTitle from "../../hooks/useChangeTitle";

// react components.
import Navbar from "../../components/admin/navbar/Navbar";
import AssignmentList from "../../components/admin/assignments/AssignmentList";

const Assignments = () => {
  const changeTitle = useChangeTitle();

  // set page title.
  useEffect(() => changeTitle("Admin | Assignments"), []);

  return (
    <Fragment>
      <Navbar />
      <AssignmentList />
    </Fragment>
  );
};

export default Assignments;
