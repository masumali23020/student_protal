const useChangeTitle = () => {
  const changeTitle = (title) => {
    document.title = title;
  };

  return changeTitle;
};

export default useChangeTitle;
