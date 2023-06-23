import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// RTK query hooks.
import { useAddQuizMutation } from "../../redux/features/quizzes/quizzesAPI";
import { useGetVideosQuery } from "../../redux/features/videos/videosAPI";

// custom hooks.
import useChangeTitle from "../../hooks/useChangeTitle";

// react components.
import Navbar from "../../components/admin/navbar/Navbar";
import AddQuizForm from "../../components/admin/quizzes/AddQuizForm";
import CancelButton from "../../components/ui/CancelButton";
import FormHeading from "../../components/ui/FormHeading";

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

const AddQuiz = () => {
  const navigate = useNavigate();
  const changeTitle = useChangeTitle();
  const [values, setValues] = useState(formValues);
  const [options, setOptions] = useState(questionOptions);

  const { data: videos } = useGetVideosQuery();
  const [addQuiz, { isSuccess, isError: addFailed }] = useAddQuizMutation();

  // handle form values change.
  const valuesChangeHandler = (event) => {
    let { name, value } = event.target;

    if (name === "video_id") value = Number(value);

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

  // handle form submission of add-quiz.
  const formSubmitHandler = (event) => {
    event.preventDefault();

    values.question = values.question.trim();
    values.video_title = getVideoTitle(videos, values.video_id);

    const formattedOptions = options.map((op) => ({
      ...op,
      option: op.option.trim(),
    }));

    const quiz = { ...values, options: formattedOptions };

    if (isValidQuiz(formattedOptions)) addQuiz(quiz);
  };

  // redirect to quizzes page on canceled.
  const cancelHandler = () => navigate("/admin/quizzes");

  // redirect to quizzes page on succeeded.
  useEffect(() => {
    if (isSuccess) {
      navigate("/admin/quizzes");
      notify.success("Quiz added successfully");
    } else if (addFailed) notify.error("Failed to add quiz");
  }, [isSuccess, addFailed]);

  // set page title.
  useEffect(() => changeTitle("Admin | Add Quiz"), []);

  const props = {
    videos,
    values,
    options,
    optionsChangeHandler,
    valuesChangeHandler,
    formSubmitHandler,
  };

  return (
    <>
      <Navbar />
      <section className="py-6 bg-primary">
        <div className="w-full px-5 mx-auto md:w-2/3">
          <div className="relative px-10 py-10 rounded-lg bg-slate-800">
            <FormHeading heading={"Add Quiz"} />
            <AddQuizForm props={props} />
            <CancelButton cancelHandler={cancelHandler} />
          </div>
        </div>
      </section>
    </>
  );
};

export default AddQuiz;
