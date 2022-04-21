import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChat, sendMessage } from "../../Redux/Actions";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "./renderlogin";

export const ChatScreen = ({ socket }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [userMessage, setUserMessage] = useState("");
  const { selectedId, loading, chats } = useSelector((state) => state.message);
  useEffect(() => {
    dispatch(fetchChat(selectedId.id));
  }, [selectedId]);

  const handleSendMessage = async () => {
    if (userMessage === "" || userMessage === null) return;
    const data = await dispatch(
      sendMessage({ message: userMessage, receiverId: selectedId.id })
    );
    socket.current.emit("send-message", data);
    setUserMessage("");
  };
  useEffect(() => {
    socket.current.on("receiveMessage", (data) => {
      dispatch({ type: "UPDATE_SENT_MESSAGE", payload: data });
    });
  }, [selectedId]);
  return (
    <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen mt-4">
      <div className="flex sm:items-center justify-between py-3 border-2 border-gray-200">
        <div className="relative flex items-center space-x-4 px-4">
          <div className="relative flex items-center">
            <img
              src={selectedId.avatar}
              alt={selectedId.name}
              className="w-14 sm:w-16 h-14 sm:h-16 rounded-full"
            />
          </div>
          <div className="flex flex-col leading-tight">
            <div className="text-xl mt-1 flex items-center">
              <span className="text-gray-700 mr-3 font-semibold">
                {selectedId.name}
              </span>
            </div>
            <span className="rounded-lg text-sm inline-block text-gray-600">
              Online
            </span>
          </div>
        </div>
      </div>
      <div
        id="chats"
        className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
      >
        {loading ? (
          <div className="text-black flex-col w-full h-screen flex justify-center align-center texts-center bg-slate-50">
            <div
              className="w-10 mb-10 h-10 rounded-full animate-spin
                    border-2 border-dashed border-black-600 border-t-black mr-1"
            ></div>
            <p>Loading.</p>
          </div>
        ) : !loading && chats.length == 0 ? (
          <div className="text-black flex-col w-full h-screen flex justify-center align-center texts-center bg-slate-50">
            <p>No Earlier Chats.</p>
          </div>
        ) : (
          chats.map((m, i) => (
            <div className="flex" key={m.id}>
              {(isSameSender(chats, m, i, user.id) ||
                isLastMessage(chats, i, user.id)) && (
                <img
                  src={m.sender.avatar}
                  className="w-8 h-8 rounded-full mt-2 mr-1 cursor-pointer"
                />
              )}
              <div
                style={{
                  backgroundColor: `${
                    m.sender.id === user.id
                      ? "#rgb(37 99 235)"
                      : "#rgb(209 213 219)"
                  }`,
                  marginLeft: isSameSenderMargin(chats, m, i, user.id),
                  marginTop: isSameUser(chats, m, i, user.id) ? 0 : 2,
                  borderRadius: "20px",
                  maxWidth: "75%",
                }}
                className="chat-message flex items-center justify-between"
              >
                <div className="flex items-end justify-end">
                  <div className="flex flex-col space-y-2 text-xs max-w-xs border-1 items-end">
                    <span
                      className={`px-4 py-2 rounded-lg inline-block  ${
                        m.sender.id === user.id
                          ? "bg-blue-600 text-white rounded-br-none"
                          : "bg-gray-300 text-gray-600 rounded-bl-none "
                      }`}
                    >
                      {m.message}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="border-t-2 border-gray-200 pt-4 mb-2 sm:mb-0">
        <div className="relative flex justify-between">
          <span className="absolute inset-y-0 flex items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6 text-gray-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                />
              </svg>
            </button>
          </span>
          <input
            type="text"
            placeholder="Write message!"
            onChange={(e) => setUserMessage(e.target.value)}
            value={userMessage}
            className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"
          />
          <div className="items-center text-center inset-y-0 sm:flex ml-2">
            <button
              onClick={() => handleSendMessage()}
              type="button"
              className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-indigo-600 hover:bg-blue-400 focus:outline-none"
            >
              <span className="font-bold">Send</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="white"
                className="h-6 w-6 ml-2 transform rotate-90"
              >
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
