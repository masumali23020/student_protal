const ErrorMessage = ({ message }) => {
  return (
    <div className="text-2xl font-semibold text-center text-red-600 select-none">
      {message}
    </div>
  );
};

export default ErrorMessage;
