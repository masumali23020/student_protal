import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// images.
import learningPortal from "../../../assets/images/learningportal.svg";

// RTK actions.
import { userLoggedOut } from "../../../redux/features/auth/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const { pathname: path } = useLocation();

  const { user } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(userLoggedOut());
    localStorage.removeItem("auth");
  };

  return (
    <nav className="sticky top-0 shadow-md bg-slate-900">
      <div className="flex justify-between px-5 py-3 mx-auto max-w-7xl">
        <Link to="/course-player">
          <img className="h-10" src={learningPortal} />
        </Link>
        <div className="flex items-center gap-3">
          <Link
            to="/leaderboard"
            className={`${path === "/leaderboard" && "font-bold"}`}
          >
            Leaderboard
          </Link>
          <h2>{user?.name}</h2>
          <button
            className="flex items-center gap-2 px-4 py-1 text-sm transition-all border rounded-full border-cyan hover:bg-cyan"
            onClick={logout}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
              />
            </svg>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
