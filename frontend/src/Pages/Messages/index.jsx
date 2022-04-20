import { MessageIcon } from "../../Components";
import { io } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

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
  const ENDPOINT = process.env.REACT_APP_SOCKET_URL;
  const { user } = useSelector((state) => state.auth);
  const [activeUsers, setActiveUsers] = useState([]);
  const socket = useRef();
  useEffect(() => {
    socket.current = io(ENDPOINT);
    socket.current.emit("new-user", user.id);
  }, []);
  useEffect(() => {
    socket.current.on("connectedUsers", (users) => {
      setActiveUsers(users);
    });
  }, [user]);
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
      {/* <div className="w-max-full">{JSON.stringify(activeUsers)}</div> */}
      <div className="w-full mt-2">
        <div className="relative w-max">
          <h1 className="font-black font-semibold ml-4 text-md mb-2">
            Active Users
          </h1>
          <span className="absolute top-0 transform translate-y-1/4 w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
        </div>
        <div className="rounded-xl border-black border w-full h-20 flex items-center ">
          <div class="relative">
            <img
              class="w-16 h-16 rounded-full"
              src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              alt=""
            />
            <span class="top-0 left-12 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
          </div>
        </div>
      </div>
    </div>
  );
}
