// utility functions.
import truncateString from "../../../utils/truncateString";

const AddQuizForm = ({ props }) => {
  const {
    videos,
    values,
    options,
    formSubmitHandler,
    valuesChangeHandler,
    optionsChangeHandler,
  } = props || {};

  return (
    <form onSubmit={formSubmitHandler}>
      <div>
        {/* related video */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-6">
          <div className="col-span-full">
            <label
              htmlFor="video_id"
              className="block text-sm font-medium leading-6 text-white"
            >
              Related Video
            </label>
            <div className="mt-1">
              <select
                required
                id="video_id"
                name="video_id"
                value={values?.video_id}
                onChange={valuesChangeHandler}
                className="block w-full rounded-md outline-0  py-1.5 border-0 bg-gray-700 text-slate-300 px-3"
              >
                <option value="" hidden>
                  Select Related Video
                </option>
                {videos?.map(({ id, title }) => (
                  <option key={id} value={id}>
                    {truncateString(title)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* question */}
        <div className="grid grid-cols-1 mt-3 gap-x-6 gap-y-3 sm:grid-cols-6">
          <div className="col-span-full">
            <label
              htmlFor="question"
              className="block text-sm font-medium leading-6 text-white"
            >
              Question
            </label>
            <div className="mt-1">
              <textarea
                rows={3}
                required
                type="text"
                id="question"
                name="question"
                value={values?.question}
                onChange={valuesChangeHandler}
                className="block w-full rounded-md outline-0  py-1.5 border-0 bg-gray-700 text-slate-300  focus:ring-2 focus:ring-blue-500 ring-offset-0 px-3 resize-none scroll-bar"
              />
            </div>
          </div>
        </div>

        {/* options  */}
        <div className="grid grid-cols-1 mt-3 gap-x-6 gap-y-3 sm:grid-cols-6">
          <div className="col-span-3">
            <div className="flex items-center justify-between">
              <label
                htmlFor="option-1"
                className="block text-sm font-medium leading-6 text-white"
              >
                Option 1
              </label>

              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium">Correct</span>
                <input
                  type="checkbox"
                  name="isCorrect"
                  checked={options[0]?.isCorrect}
                  onChange={(e) => optionsChangeHandler(e, 1)}
                  className="h-4 w-4 mt-0.5 rounded accent-blue-500"
                />
              </div>
            </div>
            <div className="mt-1">
              <textarea
                rows={3}
                type="text"
                id="option-1"
                name="option"
                value={options[0]?.option}
                onChange={(e) => optionsChangeHandler(e, 1)}
                className="block w-full rounded-md outline-0  py-1.5 border-0 bg-gray-700 text-slate-300  focus:ring-2 focus:ring-blue-500 ring-offset-0 px-3 resize-none scroll-bar"
              />
            </div>
          </div>

          <div className="col-span-3">
            <div className="flex items-center justify-between">
              <label
                htmlFor="option-2"
                className="block text-sm font-medium leading-6 text-white"
              >
                Option 2
              </label>

              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium">Correct</span>
                <input
                  type="checkbox"
                  name="isCorrect"
                  checked={options[1]?.isCorrect}
                  onChange={(e) => optionsChangeHandler(e, 2)}
                  className="h-4 w-4 mt-0.5 rounded accent-blue-500"
                />
              </div>
            </div>
            <div className="mt-1">
              <textarea
                rows={3}
                type="text"
                id="option-2"
                name="option"
                value={options[1]?.option}
                onChange={(e) => optionsChangeHandler(e, 2)}
                className="block w-full rounded-md outline-0  py-1.5 border-0 bg-gray-700 text-slate-300  focus:ring-2 focus:ring-blue-500 ring-offset-0 px-3 resize-none scroll-bar"
              />
            </div>
          </div>
        </div>

     
        <div className="grid grid-cols-1 mt-3 gap-x-6 gap-y-3 sm:grid-cols-6">
          <div className="col-span-3">
            <div className="flex items-center justify-between">
              <label
                htmlFor="option-3"
                className="block text-sm font-medium leading-6 text-white"
              >
                Option 3
              </label>

              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium">Correct</span>
                <input
                  type="checkbox"
                  name="isCorrect"
                  checked={options[2]?.isCorrect}
                  onChange={(e) => optionsChangeHandler(e, 3)}
                  className="h-4 w-4 mt-0.5 rounded accent-blue-500"
                />
              </div>
            </div>
            <div className="mt-1">
              <textarea
                rows={3}
                type="text"
                id="option-3"
                name="option"
                value={options[2]?.option}
                onChange={(e) => optionsChangeHandler(e, 3)}
                className="block w-full rounded-md outline-0  py-1.5 border-0 bg-gray-700 text-slate-300  focus:ring-2 focus:ring-blue-500 ring-offset-0 px-3 resize-none scroll-bar"
              />
            </div>
          </div>

          <div className="col-span-3">
            <div className="flex items-center justify-between">
              <label
                htmlFor="option-4"
                className="block text-sm font-medium leading-6 text-white"
              >
                Option 4
              </label>

              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium">Correct</span>
                <input
                  type="checkbox"
                  name="isCorrect"
                  checked={options[3]?.isCorrect}
                  onChange={(e) => optionsChangeHandler(e, 4)}
                  className="h-4 w-4 mt-0.5 rounded accent-blue-500"
                />
              </div>
            </div>
            <div className="mt-1">
              <textarea
                rows={3}
                type="text"
                name="option"
                id="option-4"
                value={options[3]?.option}
                onChange={(e) => optionsChangeHandler(e, 4)}
                className="block w-full rounded-md outline-0  py-1.5 border-0 bg-gray-700 text-slate-300  focus:ring-2 focus:ring-blue-500 ring-offset-0 px-3 resize-none scroll-bar"
              />
            </div>
          </div>
        </div>

        {/* submit */}
        <div className="flex justify-end space-x-3">
          <button
            type="submit"
            className="px-6 py-2 mt-5 text-sm font-semibold text-white rounded-md shadow-sm bg-cyan hover:opacity-90 active:opacity-100 disabled:bg-slate-600 disabled:hover:opacity-100"
          >
            Save
          </button>
      
          
        </div>
      </div>
    </form>
  );
};

export default AddQuizForm;
