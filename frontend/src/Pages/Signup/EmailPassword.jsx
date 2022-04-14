import {
  Button,
  Input,
  Toast,
  NameIcon,
  EmailIcon,
  PasswordIcon,
} from "../../Components";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../Redux/Actions";
export function EmailPassword({ onNext }) {
  const dispatch = useDispatch();
  const { loading, user, success, message } = useSelector(
    (state) => state.signup
  );
  const formik = useFormik({
    initialValues: {
      name: user.name,
      email: user.email,
      password: user.password,
    },
    onSubmit: async (values) => {
      const data = await dispatch(signup(values));
      if (data) {
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
      if (!values.name) {
        errors.name = "Valid name is required";
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
      <h1 className="text-gray-800 font-bold text-2xl mb-1">Join Now !</h1>
      <p className="text-sm font-normal text-gray-600 mb-5">
        Share some credentials to get Started.
      </p>
      {formik.touched.name && formik.errors.name ? (
        <p className="mb-2 text-red-600">{formik.errors.name}</p>
      ) : null}
      <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
        <NameIcon />
        <Input
          type="text"
          name="name"
          id=""
          placeholder="Enter Name"
          onChange={formik.handleChange}
          value={formik.values.name}
          onBlur={formik.handleBlur}
        />
      </div>
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
      {message && !success && <Toast message={message} success={success} />}
      <Button loading={loading} type="submit">
        {loading ? "Sending otp.." : "Signup"}
      </Button>
      <Link to="/login">
        <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">
          Already have an Account ?
        </span>
      </Link>
    </form>
  );
}
