// utility functions.
import truncateString from "../../../utils/truncateString";

const AddAssignmentForm = ({ props }) => {
  const { videos, values, valuesChangeHandler, formSubmitHandler } =
    props || {};

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
                className="block w-full rounded-md outline-0  py-1.5 border-0 bg-gray-700 text-slate-300  focus:ring-2 focus:ring-blue-500 ring-offset-0 px-3"
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

        {/* title */}
        <div className="grid grid-cols-1 mt-3 gap-x-6 gap-y-3 sm:grid-cols-6">
          <div className="col-span-full">
            <label
              htmlFor="title"
              className="block text-sm font-medium leading-6 text-white"
            >
              Assignment Title
            </label>
            <div className="mt-1">
              <input
                required
                id="title"
                type="text"
                name="title"
                value={values?.title}
                onChange={valuesChangeHandler}
                className="block w-full rounded-md outline-0  py-1.5 border-0 bg-gray-700 text-slate-300  focus:ring-2 focus:ring-blue-500 ring-offset-0 px-3"
              />
            </div>
          </div>
        </div>

        {/* total marks */}
        <div className="grid grid-cols-1 mt-3 gap-x-6 gap-y-3 sm:grid-cols-6">
          <div className="col-span-full">
            <label
              htmlFor="total-marks"
              className="block text-sm font-medium leading-6 text-white"
            >
              Total Marks
            </label>
            <div className="mt-1">
              <input
                required
                type="number"
                id="total-marks"
                name="totalMark"
                value={values?.totalMark}
                onChange={valuesChangeHandler}
                className="block w-full rounded-md outline-0  py-1.5 border-0 bg-gray-700 text-slate-300  focus:ring-2 focus:ring-blue-500 ring-offset-0 px-3"
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

export default AddAssignmentForm;
