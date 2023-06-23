import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// images.
import learningPortal from "../../assets/images/learningportal.svg";

// RTK query hooks.
import { useLoginMutation } from "../../redux/features/auth/authAPI";

// custom hooks.
import useChangeTitle from "../../hooks/useChangeTitle";

// react components.
import Error from "../../components/ui/Error";

// initial form values.
const formValues = {
  email: "",
  password: "",
};

const StudentLogin = () => {
  const navigate = useNavigate();
  const changeTitle = useChangeTitle();
  const [error, setError] = useState("");
  const [values, setValues] = useState(formValues);

  const [login, { isLoading, isSuccess, error: responseError }] =
    useLoginMutation();

  // handle form values change.
  const changeHandler = (event) => {
    const { name, value } = event.target;

    setValues({ ...values, [name]: value });
  };

  // handle forom submission of login.
  const formSubmitHandler = (event) => {
    event.preventDefault();
    setError("");

    const { email, password } = values;

    login({ email, password });
  };

  // show error or redirect to course-player page.
  useEffect(() => {
    if (isSuccess) navigate("/course-player");
    else if (responseError) setError("Invalid credentials");
  }, [isSuccess, responseError]);

  // set page title.
  useEffect(() => changeTitle("Student | Login"), [changeTitle]);

  return (
    <section className="grid h-screen py-6 bg-primary place-items-center">
      <div className="max-w-md px-5 mx-auto">
        <div>
          <img className="h-12 mx-auto" src={learningPortal} />
          <h2 className="mt-6 text-3xl font-extrabold text-center text-slate-100">
            Sign in to Student Account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={formSubmitHandler}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="-space-y-px rounded-md shadow-sm">
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
                onChange={changeHandler}
                placeholder="Email address"
                className="login-input rounded-t-md"
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
                onChange={changeHandler}
                autoComplete="current-password"
                className="login-input rounded-b-md"
              />
            </div>
          </div>
          
          <div class="flex items-center justify-end">
                    <div class="text-sm">
                        <Link to="/register" class="font-medium text-violet-600 hover:text-violet-500">
                            Create New Account
                        </Link>
                    </div>
                </div>
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white transition-colors duration-200 border border-transparent rounded-md group bg-violet-600 hover:bg-violet-700 active:bg-violet-800"
            >
              Sign in
            </button>
          </div>

          {Boolean(error) && <Error message={error} />}
        </form>
      </div>
    </section>
  );
};

export default StudentLogin;
