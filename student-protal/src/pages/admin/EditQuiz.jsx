import { Fragment, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// RTK query hooks.
import { useGetVideosQuery } from "../../redux/features/videos/videosAPI";
import {
  useGetQuizQuery,
  useUpdateQuizMutation,
} from "../../redux/features/quizzes/quizzesAPI";

// custom hooks.
import useChangeTitle from "../../hooks/useChangeTitle";

// react components.
import Message from "../../components/ui/Message";
import Navbar from "../../components/admin/navbar/Navbar";
import FormHeading from "../../components/ui/FormHeading";
import CancelButton from "../../components/ui/CancelButton";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import EditQuizForm from "../../components/admin/quizzes/EditQuizForm";

// utility functions.
import notify from "../../utils/notify";

// initial form values.
const formValues = {
  question: "",
  video_id: "",
  video_title: "",
};

// question options.
const questionOptions = [
  {
    id: 1,
    option: "",
    isCorrect: false,
  },
  {
    id: 2,
    option: "",
    isCorrect: false,
  },
  {
    id: 3,
    option: "",
    isCorrect: false,
  },
  {
    id: 4,
    option: "",
    isCorrect: false,
  },
];

// extract video title by id.
const getVideoTitle = (videos, id) => {
  const video = videos.find((video) => video.id == id);
  return video?.title;
};

// check question has minimum 2 options and solution or not.
const isValidQuiz = (options) => {
  const count = options.reduce((acc, { option }) => {
    return acc + (option ? 1 : 0);
  }, 0);

  if (count < 2) {
    notify.error("Question must have at least 2 options");
    return false;
  }

  for (let { id, option, isCorrect } of options) {
    if (isCorrect && option === "") {
      notify.error(`Option ${id} can't be an answer`);
      return false;
    }
  }

  const solution = options.some(({ isCorrect }) => isCorrect);

  if (!solution) {
    notify.error("Question must have a solution");
    return false;
  }

  return true;
};

const EditQuiz = () => {
  const navigate = useNavigate();
  const { id: quizId } = useParams();
  const changeTitle = useChangeTitle();
  const [skip, setSkip] = useState(true);
  const [values, setValues] = useState(formValues);
  const [options, setOptions] = useState(questionOptions);

  const { data: videos } = useGetVideosQuery();
  const {
    data: quiz,
    isLoading,
    isError,
  } = useGetQuizQuery(Number(quizId), { skip });
  const [updateQuiz, { isSuccess, isError: updateFailed }] =
    useUpdateQuizMutation();

  // handle form values change.
  const valuesChangeHandler = (event) => {
    let { name, value } = event.target;

    setValues({ ...values, [name]: value });
  };

  // handle questoin options change.
  const optionsChangeHandler = (event, id) => {
    let { name, value, type, checked } = event.target;

    if (type === "checkbox") value = checked;

    const updated = options.map((op) => {
      if (op.id == id) {
        return { ...op, [name]: value };
      } else return op;
    });

    setOptions(updated);
  };

  // handle form submission of update-quiz.
  const formSubmitHandler = (event) => {
    event.preventDefault();

    values.question = values.question.trim();
    values.video_title = getVideoTitle(videos, values.video_id);

    const formattedOptions = options.map((op) => ({
      ...op,
      option: op.option.trim(),
    }));

    const updates = { ...values, options: formattedOptions };

    if (isValidQuiz(formattedOptions)) updateQuiz(updates);
  };

  // redirect to quizzes page on canceled.
  const cancelHandler = () => navigate("/admin/quizzes");

  // redirect to quizzes page on succeeded.
  useEffect(() => {
    if (isSuccess) {
      navigate("/admin/quizzes");
      notify.success("Quiz updated successfully");
    } else if (updateFailed) notify.error("Failed to update quiz");
  }, [isSuccess, updateFailed]);

  // fill the form with current information.
  useEffect(() => {
    if (quizId) setSkip(false);
    if (quiz) {
      const { id, video_id, video_title, question, options } = quiz;

      setOptions(options);
      setValues({ id, video_id, video_title, question });
    }
  }, [quiz, quizId]);

  // set page title.
  useEffect(() => changeTitle("Admin | Edit Quiz"), []);

  const props = {
    videos,
    values,
    options,
    optionsChangeHandler,
    valuesChangeHandler,
    formSubmitHandler,
  };

  return (
    <Fragment>
      <Navbar />
      <section className="py-6 bg-primary">
        <div className="w-full px-5 mx-auto md:w-2/3">
          <div className="flex items-center justify-center">
            {/* loading spinner */}
            {isLoading && <LoadingSpinner />}

            {/* error message */}
            {!isLoading && isError && (
              <Message message={"Failed to fetch quiz ☹"} color="red" />
            )}
          </div>

          {/* edit from */}
          {!isLoading && quiz && (
            <div className="relative px-10 py-10 rounded-lg bg-slate-800">
              <FormHeading heading={"Edit Quiz"} />
              <EditQuizForm props={props} />
              <CancelButton cancelHandler={cancelHandler} />
            </div>
          )}
        </div>
      </section>
    </Fragment>
  );
};

export default EditQuiz;
