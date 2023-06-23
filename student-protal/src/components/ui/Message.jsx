const Message = ({ message, color = "slate" }) => {
  return (
    <div
      className={`text-xl font-semibold text-center text-${color}-600 select-none`}
    >
      {message}
    </div>
  );
};

export default Message;
