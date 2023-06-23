import { Fragment, useEffect } from "react";

// custom hooks.
import useChangeTitle from "../../hooks/useChangeTitle";

// react components.
import Navbar from "../../components/student/navbar/Navbar";
import PlayList from "../../components/student/course-player/PlayList";
import VideoPlayer from "../../components/student/course-player/VideoPlayer";

const CoursePlayer = () => {
  const changeTitle = useChangeTitle();

  // set page title.
  useEffect(() => changeTitle("Student | Course Player"), []);

  return (
    <Fragment>
      <Navbar />
      <section className="py-6 bg-primary">
        <div className="px-5 mx-auto max-w-7xl">
          <div className="grid grid-cols-3 gap-2 lg:gap-8">
            <VideoPlayer />
            <PlayList />
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default CoursePlayer;
