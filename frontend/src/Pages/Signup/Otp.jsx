import { useState } from "react";
import { Button, Toast } from "../../Components";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { verifyOtp } from "../../Redux/Actions";
import { animation } from "../../Utils/animation";
export function Otp({ onBack, onNext }) {
  const [otp, setOtp] = useState({
    1: "",
    2: "",
    3: "",
    4: "",
  });
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.signup);
  const { loading, success, message } = useSelector((state) => state.verifyOtp);
  const handleOtpChange = (e) => {
    const { name, value } = e.target;
    setOtp((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const enTeredOtp = Object.values(otp).join("");
  const handleVerifyOtp = async () => {
    const response = await dispatch(
      verifyOtp({ otp: enTeredOtp, hash: user.hash, email: user.email })
    );
    if (response) {
      return onNext();
    }
  };
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={animation}
      exit="hidden"
      className="flex flex-col items-center justify-center h-full w-80 max-w-sm mobile:max-w-full mobile:p-10 mobile:w-full"
    >
      {message && !loading && !success && (
        <Toast message={message} success={success} />
      )}
      <div className="w-full max-w-sm">
        <div className="bg-white ">
          <div onClick={() => onBack()} className="justify-items-start">
            <i className="fa-solid fa-circle-chevron-left text-2xl cursor-pointer mb-10"></i>
          </div>
          <div className="mb-4">
            <h1 className="text-gray-800 font-bold text-2xl mb-1">
              Hi, {user.name} Verify your account
            </h1>
            <p className="text-sm font-normal text-gray-600 mb-5">
              Enter the OTP sent to your email {user.email}.
            </p>
          </div>
          <div className="container">
            <div className="grid grid-cols-4 justify-between">
              <input
                type="number"
                className="w-12 leading-10 border:none bg-slate-50 rounded-md text-center uppercase mb-5 1"
                maxLength="1"
                onChange={handleOtpChange}
                placeholder="0"
                name="1"
              />
              <input
                type="number"
                className="w-12 leading-10 border:none bg-slate-50 rounded-md text-center uppercase mb-5 2"
                maxLength="1"
                onChange={handleOtpChange}
                placeholder="0"
                name="2"
              />
              <input
                type="number"
                className="w-12 leading-10 border:none bg-slate-50 rounded-md text-center uppercase mb-5 3"
                maxLength="1"
                onChange={handleOtpChange}
                placeholder="0"
                name="3"
              />
              <input
                type="text"
                className="w-12 leading-10 border:none bg-slate-50 rounded-md text-center uppercase mb-5 4"
                maxLength="1"
                onChange={handleOtpChange}
                placeholder="0"
                name="4"
              />
            </div>
            <button className="resend">
              Resend OTP
              <i className="fa fa-caret-right ml-2"></i>
            </button>
            <Button loading={loading} onClick={handleVerifyOtp}>
              {loading ? "Verifying..." : "Verify"}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
