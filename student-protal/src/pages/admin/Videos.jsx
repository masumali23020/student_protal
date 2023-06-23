import { Fragment, useEffect } from "react";

// custom hooks.
import useChangeTitle from "../../hooks/useChangeTitle";

// react components.
import Navbar from "../../components/admin/navbar/Navbar";
import VideoList from "../../components/admin/videos/VideoList";

const Videos = () => {
  const changeTitle = useChangeTitle();

  // set page title.
  useEffect(() => changeTitle("Admin | Videos"), []);

  return (
    <Fragment>
      <Navbar />
      <VideoList />
    </Fragment>
  );
};

export default Videos;
