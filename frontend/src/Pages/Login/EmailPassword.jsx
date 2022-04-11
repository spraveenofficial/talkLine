import { Button, Input } from "../../Components";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
export function EmailPassword({ onNext }) {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      // console.log(values);
      onNext();
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
          />
        </svg>
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
            clipRule="evenodd"
          />
        </svg>
        <Input
          type="text"
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          onBlur={formik.handleBlur}
          id=""
          placeholder="Enter Password"
        />
      </div>
      <Button type="submit">Login</Button>
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
