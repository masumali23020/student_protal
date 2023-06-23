const Error = ({ message }) => {
  return (
    <h4 className="flex justify-center w-full px-4 py-2 text-sm font-medium text-red-600 bg-red-200 border border-transparent rounded-md">
      {message}
    </h4>
  );
};

export default Error;
