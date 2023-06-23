const EditVideoForm = ({ props }) => {
  const { values, valuesChangeHandler, formSubmitHandler } = props || {};

  return (
    <form onSubmit={formSubmitHandler}>
      <div className="">

        {/* url */}
        <div className="grid grid-cols-1 mt-3 gap-x-6 gap-y-3 sm:grid-cols-6">
          <div className="col-span-full">
            <label
              htmlFor="url"
              className="block text-sm font-medium leading-6 text-white"
            >
              URL
            </label>
            <div className="mt-1">
              <input
                required
                id="url"
                name="url"
                type="text"
                autoComplete="url"
                value={values?.url}
                onChange={valuesChangeHandler}
                className="block w-full rounded-md outline-0  py-1.5 border-0  bg-white text-gray-700   focus:ring-2 focus:ring-blue-500 ring-offset-0 px-3"
              />
            </div>
          </div>
        </div>

        {/* title */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-6">
          <div className="col-span-full">
            <label
              htmlFor="title"
              className="block text-sm font-medium leading-6 text-white"
            >
              Title
            </label>
            <div className="mt-1">
              <input
                required
                id="title"
                type="text"
                name="title"
                autoComplete="title"
                value={values?.title}
                onChange={valuesChangeHandler}
                className="block w-full rounded-md outline-0  py-1.5 border-0  bg-white text-gray-700   focus:ring-2 focus:ring-blue-500 ring-offset-0 px-3"
              />
            </div>
          </div>
        </div>

        {/* description */}
        <div className="grid grid-cols-1 mt-3 gap-x-6 gap-y-3 sm:grid-cols-6 ">
          <div className="col-span-full">
            <label
              htmlFor="description"
              className="block text-sm font-medium leading-6 text-white"
            >
              Description
            </label>
            <div className="mt-1">
              <textarea
                rows={3}
                required
                id="description"
                name="description"
                onChange={valuesChangeHandler}
                value={values?.description}
                className="block w-full rounded-md outline-0  py-1.5 border-0  bg-white text-gray-700   focus:ring-2 focus:ring-blue-500 ring-offset-0 px-3 resize-none scroll-bar"
              />
            </div>
          </div>
        </div>

        

        <div className="grid grid-cols-1 mt-3 gap-x-6 gap-y-3 sm:grid-cols-6">
          {/* views */}
          <div className="col-span-3">
            <label
              htmlFor="views"
              className="block text-sm font-medium leading-6 text-white"
            >
              Views
            </label>
            <div className="mt-1">
              <input
                required
                id="views"
                type="text"
                name="views"
                autoComplete="views"
                value={values?.views}
                onChange={valuesChangeHandler}
                className="block w-full rounded-md outline-0  py-1.5 border-0  bg-white text-gray-700   focus:ring-2 focus:ring-blue-500 ring-offset-0 px-3"
              />
            </div>
          </div>

          {/* duration */}
          <div className="col-span-3">
            <label
              htmlFor="duration"
              className="block text-sm font-medium leading-6 text-white"
            >
              Duration
            </label>
            <div className="mt-1">
              <input
                required
                id="duration"
                type="text"
                name="duration"
                autoComplete="duration"
                value={values?.duration}
                onChange={valuesChangeHandler}
                className="block w-full rounded-md outline-0  py-1.5 border-0  bg-white text-gray-700   focus:ring-2 focus:ring-blue-500 ring-offset-0 px-3"
              />
            </div>
          </div>
        </div>

        {/* submit */}
        <div className="flex justify-end">
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

export default EditVideoForm;
