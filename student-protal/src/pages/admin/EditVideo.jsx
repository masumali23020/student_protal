import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// RTK query hooks.
import {
  useGetVideoQuery,
  useUpdateVideoMutation,
} from "../../redux/features/videos/videosAPI";

// custom hooks.
import useChangeTitle from "../../hooks/useChangeTitle";

// react components.
import Navbar from "../../components/admin/navbar/Navbar";
import EditVideoForm from "../../components/admin/videos/EditVideoForm";
import CancelButton from "../../components/ui/CancelButton";
import FormHeading from "../../components/ui/FormHeading";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import Message from "../../components/ui/Message";

// utility functions.
import notify from "../../utils/notify";

// initial form values.
const formValues = {
  title: "",
  description: "",
  url: "",
  views: "",
  duration: "",
};

const EditVideo = () => {
  const navigate = useNavigate();
  const changeTitle = useChangeTitle();

  const { id: videoId } = useParams();
  const [skip, setSkip] = useState(true);
  const [values, setValues] = useState(formValues);

  const {
    data: video,
    isLoading,
    isError,
  } = useGetVideoQuery(Number(videoId), { skip });
  const [updateVideo, { isSuccess, isError: updateFailed }] =
    useUpdateVideoMutation();

  // handle form values change.
  const valuesChangeHandler = (event) => {
    const { name, value } = event.target;

    setValues({ ...values, [name]: value });
  };

  // handle form submission of update-video.
  const formSubmitHandler = (event) => {
    event.preventDefault();

    updateVideo(values);
  };

  // redirect to videos page on canceled.
  const cancelHandler = () => navigate("/admin/videos");

  // redirect to videos page on succeeded.
  useEffect(() => {
    if (isSuccess) {
      navigate("/admin/videos");
      notify.success("Video updated successfully");
    } else if (updateFailed) notify.error("Failed to update video");
  }, [isSuccess, updateFailed]);

  // fill the form with current values.
  useEffect(() => {
    if (video) setValues(video);
    else if (videoId) setSkip(false);
  }, [video, videoId]);

  // set page title.
  useEffect(() => changeTitle("Admin | Edit Video"), []);

  const props = {
    values,
    valuesChangeHandler,
    formSubmitHandler,
  };

  return (
    <>
      <Navbar />
      <section className="py-6 bg-primary">
        <div className="w-full px-5 mx-auto md:w-1/2 lg:px-10">
          <div className="flex items-center justify-center">
            {/* loading spinner */}
            {isLoading && <LoadingSpinner />}

            {/* error message */}
            {!isLoading && isError && (
              <Message message={"Failed to fetch video ☹"} color="red" />
            )}
          </div>

          {!isLoading && video && (
            <div className="relative px-10 py-10 rounded-lg bg-violet-900">
              <FormHeading heading={"Edit video"} />
              <EditVideoForm props={props} />
              <CancelButton cancelHandler={cancelHandler} />
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default EditVideo;
