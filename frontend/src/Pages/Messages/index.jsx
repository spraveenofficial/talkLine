import { MessageIcon } from "../../Components";

const ChatSupport = () => {
  return (
    <div className="w-72 bg-indigo-600 fixed bottom-0 right-20">
      <div className="w-full h-full shadow-lg rounded-lg">
        <div className="w-full h-full flex flex-col justify-between">
          <h1>Chat</h1>
          <div />
        </div>
      </div>
    </div>
  );
};

export function Message() {
  return (
    <div className="w-2/3 bg-white block p-2 mobile:w-full mobile:py-0">
      <div className="w-full p-4 bg-indigo-100 flex text-center items-center gap-2 rounded-2xl">
        <h2 className="text-2xl font-bold">Messaging</h2>
        <MessageIcon className="h-8 w-8" />
      </div>
      {/* <ChatSupport /> */}
      <div className="mt-4">
        <input
          type="text"
          className="bg-dim-700 font-black h-10 p-4 w-full rounded-full text-sm focus:outline-none bg-purple-white shadow rounded border"
          placeholder="Search Friends"
        />
      </div>
      {/* <div className="w-full mt-2">
        <div className="relative w-max">
          <h1 className="font-black font-semibold ml-4 text-md mb-2">
            Active Users
          </h1>
          <span className="absolute top-0 transform translate-y-1/4 w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
        </div>
        <div className="rounded-xl border-black border w-full h-20 "></div>
      </div> */}
    </div>
  );
}
