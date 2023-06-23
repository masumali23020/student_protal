const SubmitButton = ({ submiHandler }) => {
  return (
    <button
      onClick={submiHandler}
      className="block px-4 py-2 mt-8 ml-auto rounded-full bg-cyan hover:opacity-90 active:opacity-100 active:scale-95 "
    >
      Submit
    </button>
  );
};

export default SubmitButton;
