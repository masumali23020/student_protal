import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";

// RTK actions.
import { userLoggedIn } from "../../redux/features/auth/authSlice";

const AuthChecker = ({ children }) => {
  const dispatch = useDispatch();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const auth = localStorage.getItem("auth") || "{}";
    const { user, accessToken } = JSON.parse(auth);

    if (user && accessToken) {
      dispatch(userLoggedIn({ user, accessToken }));
    }

    setIsChecking(false);
  }, []);

  return !isChecking ? children : <span></span>;
};

export default AuthChecker;
