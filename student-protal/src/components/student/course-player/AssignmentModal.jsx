// react components.
import FormHeading from "../../ui/FormHeading";
import CancelButton from "../../ui/CancelButton";

const AssignmentModal = (props) => {
  const { formSubmitHndler, setRepo, toggleModal } = props || {};

  return (
    <div className="fixed top-0 left-0 right-0 inset-0  h-full bg-black/75">
      <div className="flex items-center justify-center h-full w-full px-5">
        <div className="relative w-full px-5 py-10 md:w-1/2 lg:px-10 bg-slate-800">
          <FormHeading heading={"Submit Assignment"} />
          <form onSubmit={formSubmitHndler}>
            <div className="col-span-full">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-white"
              >
                GitHub Repository Link
              </label>
              <div className="mt-1">
                <input
                  required
                  type="text"
                  name="title"
                  onChange={(e) => setRepo(e.target.value)}
                  className="block w-full rounded-md outline-0  py-1.5 border-0 bg-gray-700 text-slate-300  focus:ring-2 focus:ring-blue-500 ring-offset-0 px-3"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="submit"
                className="px-5 py-2 mt-5 text-sm font-semibold text-white rounded-md shadow-sm bg-cyan hover:opacity-90 active:opacity-100"
              >
                Submit
              </button>
            </div>
          </form>
          <CancelButton cancelHandler={toggleModal} />
        </div>
      </div>
    </div>
  );
};

export default AssignmentModal;
