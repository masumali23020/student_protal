import { Fragment } from "react";

const Question = ({ questionItem, chooseOption }) => {
  const { id: qid, question, options } = questionItem || {};

  return (
    <Fragment>
      <div className="quiz">
        <h4 className="question">{question}</h4>
        <form className="quizOptions">
          {options?.map(({ id, option }) => (
            <label htmlFor={`${qid}-${id}`}>
              <input
                onChange={(e) => chooseOption(qid, id, e.target.checked)}
                type="checkbox"
                id={`${qid}-${id}`}
              />
              {option}
            </label>
          ))}
        </form>
      </div>
    </Fragment>
  );
};

export default Question;
