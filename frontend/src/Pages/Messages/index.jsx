import { MessageIcon } from "../../Components";
import { io } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChatScreen } from "./ChatScreen";

export function Message() {
  const dispatch = useDispatch();
  const ENDPOINT = process.env.REACT_APP_SOCKET_URL;
  const { user } = useSelector((state) => state.auth);
  const { selectedId } = useSelector((state) => state.message);
  const { friends } = user;
  const [activeUsers, setActiveUsers] = useState([]);
  let socket = useRef();
  useEffect(() => {
    socket.current = io(ENDPOINT);
    socket.current.emit("new-user", user.id);
    return () => {
      dispatch({ type: "MESSAGE_CLEAR" });
    };
  }, []);
  useEffect(() => {
    socket.current.on("connectedUsers", (users) => {
      setActiveUsers(users);
    });
  }, [user]);
  const handleSelectToChat = (user) => {
    dispatch({
      type: "MESSAGE_SELECT",
      payload: user,
    });
  };
  return (
    <div className="w-2/3 bg-white block p-2 mobile:w-full mobile:py-0">
      <div className="w-full p-4 bg-indigo-100 flex text-center items-center gap-2 rounded-2xl">
        <h2 className="text-2xl font-bold">Messaging</h2>
        <MessageIcon className="h-8 w-8" />
      </div>
      <div className="mt-4">
        <input
          type="text"
          className="bg-dim-700 font-black h-10 p-4 w-full rounded-full text-sm focus:outline-none bg-purple-white shadow rounded border"
          placeholder="Search Friends"
        />
      </div>
      <div className="w-full mt-2">
        <h1 className="font-black font-semibold text-md mb-2">Users</h1>
        <div className="activeContainer drop-shadow-md px-2 rounded-xl border-black border w-full h-20 flex items-center gap-5 flex-nowrap">
          {friends.length === 0 ? (
            <h1 className="text-center flex w-full font-bold text-black justify-center">
              No friends, connect to users first.
            </h1>
          ) : (
            friends.map((eachFriend) => {
              const isOnline = activeUsers.some(
                (eachUser) => eachUser.userId === eachFriend.id
              );
              return (
                <div
                  key={eachFriend.id}
                  onClick={() => handleSelectToChat(eachFriend)}
                  className="relative cursor-pointer min-w-fit"
                >
                  <img
                    className="w-16 h-16 rounded-full"
                    src={eachFriend.avatar}
                    alt={eachFriend.name}
                  />
                  <span
                    className={`bottom-0 left-12 absolute w-4 h-4 border-2 border-white dark:border-gray-800 rounded-full ${
                      isOnline ? "bg-green-500" : "bg-red-500"
                    }`}
                  ></span>
                </div>
              );
            })
          )}
        </div>
      </div>
      {selectedId?.id ? (
        <ChatScreen socket={socket} onLineFriends={activeUsers} />
      ) : (
        <div className="w-full h-72 flex justify-center items-center">
          <h1 className="text-center text-2xl font-bold">
            Select a user to chat
          </h1>
        </div>
      )}
    </div>
  );
}
