import { motion } from "framer-motion";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Toast } from "../../Components";
import { setProfile } from "../../Redux/Actions/auth-actions";
import { verifyUser } from "../../Redux/Actions";
import { animation } from "../../Utils/animation";
export function SetAvatar({ onBack }) {
  const [image, setImage] = useState("/images/monkey-avatar.png");
  const isButtonDisabled = image === "/images/monkey-avatar.png";
  const dispatch = useDispatch();
  const { loading, success, message } = useSelector(
    (state) => state.uploadAvatar
  );
  const handleAvatar = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      setImage(reader.result);
    };
  };
  const handleUploadAvatar = async () => {
    const response = await dispatch(setProfile({ avatar: image }));
    if (response) {
      return dispatch(verifyUser());
    }
  };
  const handleSkipAvatar = () => {
    dispatch(verifyUser());
  };
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={animation}
      exit="hidden"
      className="flex flex-col items-center justify-center h-full w-80 max-w-sm mobile:max-w-full mobile:p-10 mobile:w-full"
    >
      {message && !success && <Toast message={message} success={success} />}
      <div className="w-full max-w-sm">
        <div className="bg-white">
          <div onClick={() => onBack()} className="justify-items-start">
            <i className="fa-solid fa-circle-chevron-left text-2xl cursor-pointer mb-10"></i>
          </div>
          <div className=" flex flex-col items-center justify-center w-full max-w-sm">
            <div className="w-36 h-36 border-2 border-slate-300 rounded-3xl justify-center overflow-hidden">
              <img src={image} alt="avatar" />
            </div>
            <div className="mt-4">
              <input
                onChange={handleAvatar}
                id="avatarInput"
                type="file"
                className="hidden"
              />
              <label
                className="text-indigo-600 cursor-pointer hover:text-indigo-800"
                htmlFor="avatarInput"
              >
                Choose a different photo
              </label>
            </div>
            <Button
              disabled={isButtonDisabled}
              loading={loading}
              onClick={() => handleUploadAvatar()}
            >
              {loading ? "Uploading..." : "Upload"}
            </Button>
            <button
              onClick={() => handleSkipAvatar()}
              className="block flex w-full justify-center bg-red-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
            >
              Skip
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
