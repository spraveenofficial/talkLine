import {
  Button,
  Input,
  Toast,
  EmailIcon,
  PasswordIcon,
} from "../../Components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { userLogin, verifyUser } from "../../Redux/Actions";
import { useState } from "react";
export function EmailPassword() {
  const [isGuest, setIsGuest] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let from = location.state?.from?.pathname || "/";
  const { loading, success, message } = useSelector((state) => state.login);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      const response = await dispatch(userLogin(values));
      if (response) {
        return dispatch(verifyUser()) && navigate(from, { replace: true });
      }
    },
  });

  const handleGuestLogin = async () => {
    formik.setFieldValue("email", "spraveen593@gmail.com");
    formik.setFieldValue("password", "Praveen8874@");
    setIsGuest(true);
    formik.handleSubmit();
  };
  return (
    <form
      className="bg-white w-80 max-w-sm mobile:max-w-full mobile:p-10 mobile:w-full"
      onSubmit={formik.handleSubmit}
    >
      <h1 className="text-gray-800 font-bold text-2xl mb-1">Welcome Back !</h1>
      <p className="text-sm font-normal text-gray-600 mb-5">
        Enter your email and password
      </p>
      <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
        <EmailIcon />
        <Input
          type="email"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          onBlur={formik.handleBlur}
          placeholder="Enter Email"
        />
      </div>
      <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
        <PasswordIcon />
        <Input
          type="password"
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          onBlur={formik.handleBlur}
          id=""
          placeholder="Enter Password"
        />
      </div>
      <Button loading={!isGuest && loading} type="submit">
        {!isGuest && loading ? "Loading." : "Login"}
      </Button>
      <Button loading={isGuest} onClick={handleGuestLogin}>
        {loading ? "Loading." : "Login as Guest"}
      </Button>
      {!loading && message && !success && (
        <Toast message={message} success={success} />
      )}
      <div className="flex justify-between mt-15">
        <Link to="/signup">
          <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">
            New User ?
          </span>
        </Link>
        <Link to="/forget-password">
          <span className="mt-2 text-sm ml-2 hover:text-blue-500 cursor-pointer">
            Forgot Password?
          </span>
        </Link>
      </div>
    </form>
  );
}
