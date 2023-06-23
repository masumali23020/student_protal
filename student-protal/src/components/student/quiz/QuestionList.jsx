import { useSelector } from "react-redux";
import { useEffect, useReducer } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// RTK query hooks.
import { useGetRelatedQuizQuery } from "../../../redux/features/quizzes/quizzesAPI";
import { useAddQuizMarkMutation } from "../../../redux/features/quiz-mark/quizMarkAPI";

// react components.
import Question from "./Question";
import QuizTopic from "./QuizTopic";
import SubmitButton from "./SubmitButton";

// unility functions.
import notify from "../../../utils/notify.js";

// initial state.
const initialState = [];

const reducer = (state, action) => {
  switch (action.type) {
    case "initalize": {
      return action.payload.map(({ id, options }) => {
        return {
          id,
          options: options.map(({ id, isCorrect }) => ({
            id,
            isCorrect,
            selected: false,
          })),
        };
      });
    }

    case "choose": {
      const draft = structuredClone(state);

      const { qid, oid, value } = action.payload;

      for (let { id, options } of draft) {
        if (id == qid) {
          for (let option of options) {
            if (option.id == oid) option.selected = value;
          }
        }
      }

      return draft;
    }

    default:
      return state;
  }
};

// calculate the obtained marks.
const calculateMark = (answers) => {
  const correct = answers.reduce((acc, { options }) => {
    const check = options.every(
      ({ isCorrect, selected }) => isCorrect === selected
    );

    return check ? acc + 1 : acc;
  }, 0);

  const totalQuiz = answers.length;
  const totalMark = totalQuiz * 5;
  const totalCorrect = correct;
  const totalWrong = totalQuiz - correct;
  const mark = totalCorrect * 5;

  return {
    totalQuiz,
    totalMark,
    totalCorrect,
    totalWrong,
    mark,
  };
};

const QuestionList = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { user } = useSelector((state) => state.auth);

  // answers script.
  const [answers, dispatch] = useReducer(reducer, initialState);

  // fetch related quiz for the selected video.
  const { data: quiz } = useGetRelatedQuizQuery(state?.videoId, {
    skip: !state?.videoId,
  });

  const [addQuizMark, { isSuccess: submitted, isError: submitFailed }] =
    useAddQuizMarkMutation();

  const chooseOption = (qid, oid, value) => {
    dispatch({ type: "choose", payload: { qid, oid, value } });
  };

  // form submission handler of submit-quiz
  const submitQuiz = () => {
    const result = calculateMark(answers);

    const quizMark = {
      ...result,
      student_id: user.id,
      student_name: user.name,
      video_id: quiz[0]["video_id"],
      video_title: quiz[0]["video_title"],
    };

    const confirmation = confirm("Are you sure you want to submit this quiz?");

    if (confirmation) addQuizMark(quizMark);
  };

  // redirect to leaderboard page on success.
  useEffect(() => {
    if (submitted) {
      notify.success("Quiz submitted successfully");
      navigate("/leaderboard", { replace: true });
    } else if (submitFailed) notify.error("Failed to submit quiz");
  }, [submitted, submitFailed]);

  // initialize the answer script form the quiz.
  useEffect(() => {
    if (quiz) dispatch({ type: "initalize", payload: quiz });
  }, [quiz]);

  useEffect(() => {
    if (!state?.videoId) navigate("/leaderboard");
  }, []);

  return (
    <section className="py-6 bg-primary">
      <div className="px-5 mx-auto max-w-7xl">
        <QuizTopic topic={quiz?.at(0)?.video_title} />
        <div className="space-y-8 ">
          {quiz?.map((question) => (
            <Question
              key={question.id}
              questionItem={question}
              chooseOption={chooseOption}
            />
          ))}
        </div>
        <SubmitButton submiHandler={submitQuiz} />
      </div>
    </section>
  );
};

export default QuestionList;
