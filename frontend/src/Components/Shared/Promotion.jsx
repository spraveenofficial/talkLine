import { useSelector } from "react-redux";

export function Promotion() {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="p-4 w-full text-center bg-whit mobile:p-8">
      <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white text-captialize">
        Hi, {user.name} Welcome to the Talkine.
      </h3>
      <p className="mb-5 text-base text-black sm:text-lg dark:text-gray-400">
        Talkine is a social network for people to connect with each other. We
        are very excited to have you here. You are Beta User.
      </p>
      <div className="justify-center items-center  flex gap-2">
        <button className="bg-red-500 p-2 rounded-xl text-white text-base">
          Dismiss
        </button>
      </div>
    </div>
  );
}
