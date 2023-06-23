import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// images.
import learningPortal from "../../assets/images/learningportal.svg";

// RTK query hooks.
import { useRegisterMutation } from "../../redux/features/auth/authAPI";

// custom hooks.
import useChangeTitle from "../../hooks/useChangeTitle";

// react components.
import Error from "../../components/ui/Error";

// initial form values.
const formValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const StudentRegistration = () => {
  const navigate = useNavigate();
  const changeTitle = useChangeTitle();
  const [error, setError] = useState("");
  const [values, setValues] = useState(formValues);

  const [register, { isLoading, isSuccess, error: responseError }] =
    useRegisterMutation();

  // handle form values change.
  const changeHandler = (event) => {
    const { name, value } = event.target;

    setValues({ ...values, [name]: value });
  };

  // handle form submission of registration.
  const formSubmitHandler = (event) => {
    event.preventDefault();
    setError("");

    const { name, email, password, confirmPassword } = values;

    if (password !== confirmPassword) {
      setError("Password does not match");
    } else {
      register({ name, email, password, role: "student" });
    }
  };

  // show error or redirect to course-player page.
  useEffect(() => {
    if (isSuccess) navigate("/course-player");
    else if (responseError) setError(responseError.data);
  }, [isSuccess, responseError]);

  // set page title.
  useEffect(() => changeTitle("Student | Registration"), []);

  return (
    <section className="grid h-screen py-6 bg-primary place-items-center">
      <div className="max-w-md px-5 mx-auto">
        <div>
          <img className="h-12 mx-auto" src={learningPortal} />
          <h2 className="mt-6 text-3xl font-extrabold text-center text-slate-100">
            Create Your New Account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={formSubmitHandler}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                required
                id="name"
                name="name"
                type="name"
                autoComplete="name"
                onChange={changeHandler}
                placeholder="Student Name"
                className="login-input rounded-t-md"
              />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                required
                type="email"
                name="email"
                id="email-address"
                autoComplete="email"
                className="login-input "
                onChange={changeHandler}
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                required
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                className="login-input"
                onChange={changeHandler}
                autoComplete="current-password"
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="sr-only">
                Confirm Password
              </label>
              <input
                required
                type="password"
                id="confirm-password"
                name="confirmPassword"
                onChange={changeHandler}
                placeholder="Confirm Password"
                autoComplete="confirm-password"
                className="login-input rounded-b-md"
              />
            </div>
          </div>
          <div className="flex items-center justify-start text-sm font-medium">
            <span className="mr-2">Already have an account? </span>
            <Link to="/" className=" text-violet-600 hover:text-violet-500">
              Login now.
            </Link>
          </div>
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white transition-colors duration-200 border border-transparent rounded-md group bg-violet-600 hover:bg-violet-700 active:bg-violet-800"
            >
              Create Account
            </button>
          </div>

          {Boolean(error) && <Error message={error} />}
        </form>
      </div>
    </section>
  );
};

export default StudentRegistration;
