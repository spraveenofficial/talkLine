import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChat, sendMessage } from "../../Redux/Actions";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "./renderlogin";

export const ChatScreen = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [userMessage, setUserMessage] = useState("");
  const { selectedId, loading, message, error, success, chats } = useSelector(
    (state) => state.message
  );
  useEffect(() => {
    dispatch(fetchChat(selectedId.id));
  }, [selectedId]);

  const handleSendMessage = (e) => {
    dispatch(sendMessage({ message: userMessage, receiverId: selectedId.id }));
  };

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
        {chats &&
          chats.map((m, i) => (
            <div style={{ display: "flex" }} key={m.id}>
              {(isSameSender(chats, m, i, user.id) ||
                isLastMessage(chats, i, user.id)) && (
                <img
                  src={user.avatar}
                  className="w-8 h-8 rounded-full mt-5 mr-1 cursor-pointer"
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
                  marginTop: isSameUser(chats, m, i, user.id) ? 3 : 10,
                  borderRadius: "20px",
                  maxWidth: "75%",
                }}
                className="chat-message flex items-center justify-between"
              >
                <div className="flex items-end justify-end">
                  <div className="flex flex-col space-y-2 text-xs max-w-xs border-1 items-end">
                    <div>
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
            </div>
          ))}
      </div>
      <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
        <div className="relative flex">
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
            placeholder="Write your message!"
            onChange={(e) => setUserMessage(e.target.value)}
            className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"
          />
          <div className="absolute right-0 items-center inset-y-0 sm:flex">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6 text-red-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                />
              </svg>
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
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
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
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
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
            <button
              onClick={() => handleSendMessage()}
              type="button"
              className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
            >
              <span className="font-bold">Send</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="black"
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
