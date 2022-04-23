import { useSelector } from "react-redux";

export function Promotion() {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="grid grid-cols-6 max-w-5xl bg-indigo-600">
      <div className="col-span-4">
        <h2 className="font-bold text-3xl text-white ml-10 mt-8">
          Hi, {user.name}
        </h2>
        <p className="font-light text-white text-sm ml-10 mt-5">
          Thanks for joining us. We are currently working on our platform.
          Awesome, you are beta tester.
        </p>

        <button className="text-white font-semibold ml-10 mt-5 mb-8 group ">
          View the docs
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="inline-block h-6 w-6 group-hover:translate-x-2 transition delay-100 transition-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </button>
      </div>
      <div className="col-span-2 relative">
        <img
          src="https://www.digitalocean.com/_next/static/media/cloudJourneyImage.954519ea.svg"
          className="absolute bottom-0 right-0"
        />
      </div>
    </div>
  );
}
