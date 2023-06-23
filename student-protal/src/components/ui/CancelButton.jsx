const CancelButton = ({ cancelHandler }) => {
  return (
    <button
      onClick={cancelHandler}
      className="absolute w-8 h-8 rounded-full shadow-sm top-2 right-2 bg-orange-300 hover:opacity-90 active:opacity-100"
    >
      ❌
    </button>
  );
};

export default CancelButton;
