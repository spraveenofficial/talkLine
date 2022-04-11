import { useState } from "react";
import { Button } from "../../Components";
import { motion } from "framer-motion";
export function Otp({ onBack, onNext }) {
  const [otp, setOtp] = useState("");
  const handleOtpChange = (e) => {
    const { value } = e.target;
    setOtp((oldvalue) => oldvalue.concat(value));
  };
  const animation = {
    hidden: {
      x: "-10%",
      opacity: 0,
    },
    show: {
      x: "-0%",
      opacity: 1,
      transition: {
        duration: 1,
        type: "tween",
        ease: "easeOut",
      },
    },
  };
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={animation}
      exit="hidden"
      className="flex flex-col items-center justify-center h-full w-80 max-w-sm mobile:max-w-full mobile:p-10 mobile:w-full"
    >
      <div className="w-full max-w-sm">
        <div className="bg-white ">
          <div onClick={() => onBack()} className="justify-items-start">
            <i className="fa-solid fa-circle-chevron-left text-2xl cursor-pointer mb-10"></i>
          </div>
          <div className="mb-4">
            <h1 className="text-gray-800 font-bold text-2xl mb-1">
              Verify your account
            </h1>
            <p className="text-sm font-normal text-gray-600 mb-5">
              Enter the OTP sent to your email.
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
              />
              <input
                type="number"
                className="w-12 leading-10 border:none bg-slate-50 rounded-md text-center uppercase mb-5 2"
                maxLength="1"
                onChange={handleOtpChange}
                placeholder="0"
              />
              <input
                type="number"
                className="w-12 leading-10 border:none bg-slate-50 rounded-md text-center uppercase mb-5 3"
                maxLength="1"
                onChange={handleOtpChange}
                placeholder="0"
              />
              <input
                type="text"
                className="w-12 leading-10 border:none bg-slate-50 rounded-md text-center uppercase mb-5 4"
                maxLength="1"
                onChange={handleOtpChange}
                placeholder="0"
              />
            </div>
            <p>You are just one step ahead.</p>
            <button className="resend">
              Resend OTP
              <i className="fa fa-caret-right ml-2"></i>
            </button>
            <Button>Verify Otp</Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
