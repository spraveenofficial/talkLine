import { useSelector } from "react-redux";

export function Promotion() {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="p-4 w-full text-center mobile:p-8">
      <h3 className="mb-2 text-xl font-bold text-black text-captialize">
        Hi, {user.name} Welcome to the Talkine.
      </h3>
      <p className="text-base text-black">
        Talkine is a social network for people to connect with each other. We
        are very excited to have you here. You are Beta User.
      </p>
    </div>
  );
}
