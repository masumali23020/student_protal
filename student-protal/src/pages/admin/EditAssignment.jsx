import { Fragment, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// RTK query hooks.
import { useGetVideosQuery } from "../../redux/features/videos/videosAPI";
import {
  useGetAssignmentQuery,
  useUpdateAssignmentMutation,
  useLazyGetRelatedAssignmentQuery,
} from "../../redux/features/assignments/assignmentsAPI";

// custom hooks.
import useChangeTitle from "../../hooks/useChangeTitle";

// react components.
import Message from "../../components/ui/Message";
import Navbar from "../../components/admin/navbar/Navbar";
import FormHeading from "../../components/ui/FormHeading";
import CancelButton from "../../components/ui/CancelButton";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import EditAssignmentForm from "../../components/admin/assignments/EditAssignmentForm";

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
  const video = videos.find((video) => video.id == id);
  return video?.title;
};

const AddAssignment = () => {
  const navigate = useNavigate();
  const changeTitle = useChangeTitle();
  const [skip, setSkip] = useState(true);
  const { id: assignmentId } = useParams();
  const [values, setValues] = useState(formValues);

  const { data: videos } = useGetVideosQuery();
  const {
    data: assignment,
    isLoading,
    isError,
  } = useGetAssignmentQuery(Number(assignmentId), { skip });

  const [isAssignmentExits] = useLazyGetRelatedAssignmentQuery();
  const [updateAssignment, { isSuccess, isError: editFailed }] =
    useUpdateAssignmentMutation();

  // handle form values change.
  const valuesChangeHandler = (event) => {
    let { name, value } = event.target;

    setValues({ ...values, [name]: value });
  };

  // handle form submission of update-assignment.
  const formSubmitHandler = async (event) => {
    event.preventDefault();

    let { video_id, totalMark } = values;

    video_id = Number(video_id);
    totalMark = Number(totalMark);

    const video_title = getVideoTitle(videos, video_id);

    const updates = {
      ...values,
      video_id,
      totalMark,
      video_title,
    };

    checkAdnUpdateAssignemnt(assignment.id, updates);
  };

  // assignments will be updated if it is valid.
  const checkAdnUpdateAssignemnt = async (oldId, updates) => {
    const { data } = await isAssignmentExits(updates.video_id);

    if (JSON.stringify(data?.at(0)) === JSON.stringify(updates)) {
      notify.error("No changes have been made");
    } else if (Boolean(data?.length) && data?.at(0).video_id != oldId) {
      notify.error("This video already has an assignment");
    } else {
      updateAssignment(updates);
    }
  };

  // redirect to assignments page on canceled.
  const cancelHandler = () => navigate("/admin/assignments");

  // redirect to assignments page on succeeded.
  useEffect(() => {
    if (isSuccess) {
      navigate("/admin/assignments");
      notify.success("Assignment updated successfully");
    } else if (editFailed) {
      notify.error("Failed to update assignment");
    }
  }, [isSuccess, editFailed]);

  // fill the form with current values.
  useEffect(() => {
    if (assignmentId) setSkip(false);
    if (assignment) setValues(assignment);
  }, [assignment, assignmentId]);

  // set page title.
  useEffect(() => changeTitle("Admin | Edit Assignment"), []);

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
          <div className="flex items-center justify-center">
            {/* loading spinner */}
            {isLoading && <LoadingSpinner />}

            {/* error message */}
            {!isLoading && isError && (
              <Message message={"Failed to fetch assignment ☹"} color="red" />
            )}
          </div>

          {!isLoading && assignment && (
            <div className="relative px-10 py-10 rounded-lg bg-slate-800">
              <FormHeading heading={"Edit Assignment"} />
              <EditAssignmentForm props={props} />
              <CancelButton cancelHandler={cancelHandler} />
            </div>
          )}
        </div>
      </section>
    </Fragment>
  );
};

export default AddAssignment;
