import { useSelector } from "react-redux";

export function Profile() {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="w-2/3 bg-white block py-10 mobile:w-full">
      <div className="mx-auto">
        <div className="w-full">
          <div className="w-full bg-blue-600 h-48 rounded-t-lg"></div>
          <div className="absolute -mt-20 ml-5">
            <img
              src={user.avatar}
              className="bg-transparent border border-gray-300 h-36 w-40 rounded-lg shadow-md border-b border-primary"
              alt=""
            />
          </div>
        </div>
        <div className="bg-primary border border-primary rounded-b-lg p-5 pt-20 flex flex-col">
          <h1 className="font-bold text-2xl">{user.name}</h1>
          <p className="text-gray-600 font-semibold">{user.bio}</p>
          <button className="bg-indigo-600 text-white mt-3 font-bold p-2 rounded-xl w-max hover:bg-indigo-800">Send Request</button>
          <div className="pt-8 flex gap-8">
            <div className="flex flex-col">
              <div className="mb-1 bg-gray-200 border border-gray-300 h-5 w-20"></div>
              <div className="mb-1 bg-gray-200 border border-gray-300 h-5 w-20"></div>
            </div>
            <div className="flex flex-col">
              <div className="mb-1 bg-gray-200 border border-gray-300 h-5 w-20"></div>
              <div className="mb-1 bg-gray-200 border border-gray-300 h-5 w-20"></div>
            </div>
            <div className="flex flex-col">
              <div className="mb-1 bg-gray-200 border border-gray-300 h-5 w-20"></div>
              <div className="mb-1 bg-gray-200 border border-gray-300 h-5 w-20"></div>
            </div>
            <div className="flex flex-col">
              <div className="mb-1 bg-gray-200 border border-gray-300 h-5 w-20"></div>
              <div className="mb-1 bg-gray-200 border border-gray-300 h-5 w-20"></div>
            </div>
          </div>
          <div className="py-5 break-all bbcode">
            <div className="mb-1 bg-gray-200 border border-gray-300 h-5 w-44"></div>
            <div className="mb-1 bg-gray-200 border border-gray-300 h-5 w-full h-40"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
