import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// RTK query hooks.
import {
  useDeleteQuizMutation,
  useGetQuizzesQuery,
} from "../../../redux/features/quizzes/quizzesAPI";

// react components.
import LoadingSpinner from "../../ui/LoadingSpinner";
import Message from "../../ui/Message";
import QuizItem from "./QuizItem";

// utility functions.
import notify from "../../../utils/notify";

const QuizList = () => {
  const navigate = useNavigate();

  const { data: quizzes, isLoading, isError } = useGetQuizzesQuery();
  const [deleteQuiz, { isSuccess: deleted, isError: deleteFailed }] =
    useDeleteQuizMutation();

    console.log(quizzes)

  const addVideo = () => navigate("/admin/quizzes/add");

  useEffect(() => {
    if (deleted) notify.success("Quiz deleted successfully");
    else if (deleteFailed) notify.error("Failed to delete quiz");
  }, [deleted, deleteFailed]);

  return (
    <section className="py-6 bg-primary">
      <div className="mx-auto max-w-7xl">
        <div className="px-5 py-20 bg-opacity-10">
          <div className="flex w-full">
            <button className="ml-auto btn" onClick={addVideo}>
              Add Quiz
            </button>
          </div>
          {(isLoading || isError || Boolean(!quizzes?.length)) && (
            <div className="flex items-center justify-center w-full py-8 mt-4">
             
              {isLoading && <LoadingSpinner />}

         
              {!isLoading && isError && (
                <Message message={"Failed to fetch quizzes "} color="red" />
              )}

              {/* empty message */}
              {!isLoading && !isError && Boolean(!quizzes?.length) && (
                <Message message={"No Quiz Available "} />
              )}
            </div>
          )}

          <div className="mt-4 overflow-x-auto border border-slate-800">
            {Boolean(quizzes?.length) && (
              <table className="w-full text-base divide-gray-600 divide-y-1">
                <thead className="bg-slate-800">
                  <tr>
                    <th className="table-th">Question</th>
                    <th className="table-th">Video</th>
                    <th className="table-th">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-600/50">
                  {quizzes?.map((quiz) => (
                    <QuizItem
                      quiz={quiz}
                      key={quiz.id}
                      deleteQuiz={deleteQuiz}
                    />
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuizList;
