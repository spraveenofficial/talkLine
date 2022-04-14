import {
  Button,
  Input,
  Toast,
  EmailIcon,
  PasswordIcon,
} from "../../Components";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../Redux/Actions";
export function EmailPassword({ onNext }) {
  const dispatch = useDispatch();
  const { loading, user, success, message } = useSelector(
    (state) => state.login
  );
  const formik = useFormik({
    initialValues: {
      email: user.email,
      password: user.password,
    },
    onSubmit: async (values) => {
      const response = await dispatch(userLogin(values));
      if (response) {
        return onNext();
      }
    },
    validate: (values) => {
      const regularExpression = new RegExp(
        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
      );
      let errors = {};
      if (!values.email) {
        errors.email = "Valid email is required";
      } else if (
        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }
      if (!values.password) {
        errors.password = "Valid password is required";
      } else if (!regularExpression.test(values.password)) {
        errors.password =
          "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character";
      }
      return errors;
    },
  });
  return (
    <form
      className="bg-white w-80 max-w-sm mobile:max-w-full mobile:p-10 mobile:w-full"
      onSubmit={formik.handleSubmit}
    >
      <h1 className="text-gray-800 font-bold text-2xl mb-1">Welcome Back !</h1>
      <p className="text-sm font-normal text-gray-600 mb-5">
        Enter your email and password
      </p>
      {formik.touched.email && formik.errors.email ? (
        <p className="text-red-600 mb-2">{formik.errors.email}</p>
      ) : null}
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
      {formik.touched.password && formik.errors.password ? (
        <p className="text-red-600 mb-2">{formik.errors.password}</p>
      ) : null}
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
      <Button loading={loading} type="submit">
        {loading ? "Sending otp..." : "Login"}
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
