import { useSelector } from "react-redux";

const useAuth = () => {
  const { user, accessToken } = useSelector((state) => state.auth);

  if (user && accessToken) return { isLoggedIn: true, user };
  else return { isLoggedIn: false, user: null };
};

export default useAuth;
