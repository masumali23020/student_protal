

import toast from "react-hot-toast";

const options = {
  id: "toast",
};

const notify = {
  success(message) {
    toast.success(message, options);
  },

  error(message) {
    toast.error(message, options);
  },
};

export default notify;
