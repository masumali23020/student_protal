import { useNavigate } from "react-router-dom";
import { Fragment, useState, useEffect } from "react";

// RTK query hooks.
import { useGetVideosQuery } from "../../redux/features/videos/videosAPI";
import {
  useAddAssignmentMutation,
  useLazyGetRelatedAssignmentQuery,
} from "../../redux/features/assignments/assignmentsAPI";

// custom hooks.
import useChangeTitle from "../../hooks/useChangeTitle";

// react components.
import Navbar from "../../components/admin/navbar/Navbar";
import FormHeading from "../../components/ui/FormHeading";
import CancelButton from "../../components/ui/CancelButton";
import AddAssignmentForm from "../../components/admin/assignments/AddAssignmentForm";

// utility functions.
import notify from "../../utils/notify";

// initial form values.
const formValues = {
  title: "",
  video_id: "",
  video_title: "",
  totalMark: "",
};

// extract video title by id.
const getVideoTitle = (videos, id) => {
  const video = videos?.find((video) => video?.id == id);
  return video?.title;
};

const AddAssignment = () => {
  const navigate = useNavigate();
  const changeTitle = useChangeTitle();
  const [values, setValues] = useState(formValues);

  const { data: videos } = useGetVideosQuery();
  const [isAssignmentExits] = useLazyGetRelatedAssignmentQuery();
  const [addAssignment, { isSuccess, isError: addFailed }] =
    useAddAssignmentMutation();

  // handle form values change.
  const valuesChangeHandler = (event) => {
    let { name, value } = event.target;

    setValues({ ...values, [name]: value });
  };

  // handle form submission of add-assignment.
  const formSubmitHandler = (event) => {
    event.preventDefault();

    let { video_id, totalMark } = values;

    video_id = Number(video_id);
    totalMark = Number(totalMark);

    const video_title = getVideoTitle(videos, video_id);

    const assignment = {
      ...values,
      video_id,
      totalMark,
      video_title,
    };

    checkAndAddAssignment(assignment);
  };

  // assignments will be added if the video has no assignment.
  const checkAndAddAssignment = async (assignment) => {
    const { data } = await isAssignmentExits(assignment.video_id);

    if (Boolean(data?.length)) {
      notify.error("This video already has an assignment");
    } else {
      addAssignment(assignment);
    }
  };

  // redirect to assignments page on canceled.
  const cancelHandler = () => navigate("/admin/assignments");

  // redirect to assignments page on succeeded.
  useEffect(() => {
    if (isSuccess) {
      navigate("/admin/assignments");
      notify.success("Assignment added successfully");
    } else if (addFailed) notify.error("Failed to add assignment");
  }, [isSuccess, addFailed]);

  // set page title.
  useEffect(() => changeTitle("Admin | Add Assignment"), []);

  const props = {
    videos,
    values,
    formSubmitHandler,
    valuesChangeHandler,
  };

  return (
    <Fragment>
      <Navbar />
      <section className="py-6 bg-primary">
        <div className="w-full px-5 mx-auto md:w-1/2 lg:px-10">
          <div className="relative px-10 py-10 rounded-lg bg-slate-800">
            <FormHeading heading={"Add Assignment"} />
            <AddAssignmentForm props={props} />
            <CancelButton cancelHandler={cancelHandler} />
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default AddAssignment;
