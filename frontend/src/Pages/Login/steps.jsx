import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EmailPassword } from "./EmailPassword";
export function Login() {
  const Steps = {
    1: EmailPassword,
  };
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const Step = Steps[step];
  const handleNavigate = () => {
    navigate("/readmore");
  };
  return (
    <div className="h-screen flex mobile:flex-col ">
      <div className="flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center mobile:w-full mobile:h-80">
        <div className="mobile: p-10">
          <h1 className="text-white font-bold text-4xl font-sans">TalkLine</h1>
          <p className="text-white mt-1">
            The best way to connect with people and make new friends.
          </p>
          <button
            onClick={handleNavigate}
            className="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2"
          >
            Read More
          </button>
        </div>
      </div>
      <div className="flex w-1/2 justify-center items-center bg-white mobile:w-full">
        <Step
          onNext={() => setStep((prev) => prev + 1)}
          onBack={() => setStep((prev) => prev - 1)}
        />
      </div>
    </div>
  );
}
