import { format } from "date-fns";
import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  useAddAssignmentMarkMutation,
  useGetRelatedAssignmentMarkQuery,
} from "../../../redux/features/assignment-marks/assignmentMarksAPI";
import { useGetRelatedAssignmentQuery } from "../../../redux/features/assignments/assignmentsAPI";
import { useGetRelatedQuizMarkQuery } from "../../../redux/features/quiz-mark/quizMarkAPI";
import { useGetRelatedQuizQuery } from "../../../redux/features/quizzes/quizzesAPI";
import { useGetVideoQuery } from "../../../redux/features/videos/videosAPI";

import notify from "../../../utils/notify";
import LoadingSpinner from "../../ui/LoadingSpinner";
import Message from "../../ui/Message";
import AssignmentModal from "./AssignmentModal";

const VideoPlayer = () => {
  const navigate = useNavigate();
  const { id: videoId } = useParams();
  const [repo_link, setRepo] = useState("");
  const [modal, setModal] = useState(false);

  const user = useSelector((state) => state.auth.user);

  const {
    data: video,
    isLoading,
    isError,
  } = useGetVideoQuery(Number(videoId), { skip: !Boolean(videoId) });

  
  const { data: assignment } = useGetRelatedAssignmentQuery(Number(videoId), {
    skip: !Boolean(videoId),
  });

  const { data: assignmentMark } = useGetRelatedAssignmentMarkQuery(
    { student_id: user?.id, assignment_id: assignment?.at(0)?.id },
    { skip: !Boolean(assignment && Object.keys(assignment)?.length) }
  );


  const { data: quiz } = useGetRelatedQuizQuery(Number(videoId), {
    skip: !Boolean(videoId),
  });

  
  const { data: quizMark } = useGetRelatedQuizMarkQuery(
    { student_id: user?.id, video_id: Number(videoId) },
    { skip: !Boolean(quiz && quiz?.length) }
  );

  const [submitAssignment, { isSuccess: submitted, isError: submitFailed }] =
    useAddAssignmentMarkMutation();


  const formSubmitHndler = (event) => {
    event.preventDefault();

    const data = {
      student_id: user.id,
      student_name: user.name,
      assignment_id: assignment[0].id,
      title: assignment[0].title,
      createdAt: new Date(),
      totalMark: assignment[0].totalMark,
      mark: 0,
      repo_link,
      status: "pending",
    };

    const confirmation = confirm(
      "আপনি কি এই অ্যাসাইনমেন্ট জমা দেওয়ার বিষয়ে নিশ্চিত?"
    );

    if (confirmation) {
      submitAssignment(data);
      setModal(false);
    }
  };

  // open or close the modal.
  const toggleModal = () => setModal(!modal);

  // navigate to the quiz page.
  const navigateToQuiz = () => {
    navigate("/quiz", { state: { videoId: Number(videoId) } });
  };

  // show message based on success or failure.
  useEffect(() => {
    if (submitted) {
      notify.success("Assignment submitted successfully ");
    } else if (submitFailed) notify.error("Failed to submit assignment");
  }, [submitted, submitFailed]);

  // hide the scroll-bar when modal is opened.
  useEffect(() => {
    if (modal) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");
  }, [modal]);

  return (
    <div className="w-full space-y-8 col-span-full lg:col-span-2">
      {/* assignme submissin modal */}
      {modal && (
        <AssignmentModal
          setRepo={setRepo}
          toggleModal={toggleModal}
          formSubmitHndler={formSubmitHndler}
        />
      )}

      {!video && (
        <div className="flex items-center justify-center border aspect-video border-slate-50/10 bg-slate-900">
          {/* loading spinner */}
          {isLoading && <LoadingSpinner />}

          {/* error message */}
          {!isLoading && isError && (
            <Message message={"Failed to fetch video "} color={"red"} />
          )}

          
        </div>
      )}

      {!isLoading && video && (
        <Fragment>
          <iframe
            width="100%"
            allowFullScreen
            src={video?.url}
            title={video?.title}
            className="aspect-video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
          <div>
            <h1 className="text-lg font-semibold tracking-tight text-slate-100">
              {video?.title}
            </h1>
            <h2 className=" pb-4 text-sm leading-[1.7142857] text-slate-400">
              Uploaded on {format(new Date(video?.createdAt), "dd MMMM yyyy")}
            </h2>

            <div className="flex gap-4">
              {/* assignment */}
              {Boolean(assignment?.length) && (
                <Fragment>
                  {Boolean(assignmentMark?.length) ? (
                    <button className="px-3 py-1 text-sm font-bold border rounded-full border-violet-600 bg-violet-600 text-primary cursor-default">
                      এসাইনমেন্ট জমা দিয়েছেন
                    </button>
                  ) : (
                    <button
                      onClick={toggleModal}
                      className="px-3 py-1 text-sm font-bold border rounded-full border-cyan text-cyan hover:bg-cyan hover:text-primary"
                    >
                      এসাইনমেন্ট জমা দিন
                    </button>
                  )}
                </Fragment>
              )}

              {/* quiz */}
              {Boolean(quiz?.length) && (
                <Fragment>
                  {Boolean(quizMark?.length) ? (
                    <button className="px-3 py-1 text-sm font-bold border rounded-full border-indigo-600 bg-indigo-600 text-primary cursor-default">
                      কুইজ দিয়েছেন
                    </button>
                  ) : (
                    <button
                      onClick={navigateToQuiz}
                      className="px-3 py-1 text-sm font-bold border rounded-full border-cyan text-cyan hover:bg-cyan hover:text-primary"
                    >
                      কুইজে অংশগ্রহণ করুন
                    </button>
                  )}
                </Fragment>
              )}
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-400">
              {video?.description}
            </p>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default VideoPlayer;
