import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TypingIcon } from "../../Components";
import { fetchChat, sendMessage } from "../../Redux/Actions";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "./renderlogin";
import { useSocket } from "../../Context/socket-context";
export const ChatScreen = () => {
  const { socket, onlineFriends } = useSocket();
  const messagesEndRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [userMessage, setUserMessage] = useState("");
  const { selectedId, loading, chats } = useSelector((state) => state.message);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const isThisUserOnline = onlineFriends.some(
    (eachUser) => eachUser.userId === selectedId.id
  );

  useEffect(() => {
    dispatch(fetchChat(selectedId.id));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, [selectedId]);

  useEffect(() => {
    scrollToBottom();
  }, [chats, isTyping]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      const checkIfThisExists = chats.find((chat) => chat.id !== data.id);
      if (!checkIfThisExists) {
        dispatch({ type: "UPDATE_SENT_MESSAGE", payload: data });
      }
    });
  }, []);

  // Detect if user is pressing enter key
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  // Function to send message
  const handleSendMessage = async (e) => {
    if (userMessage === "" || userMessage === null) return;
    const data = await dispatch(
      sendMessage({ message: userMessage, receiverId: selectedId.id })
    );
    socket.emit("send-message", data);
    setUserMessage("");
  };

  // Function to handle typing
  const typingHandler = (e) => {
    setUserMessage(e.target.value);
    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedId.id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedId.id);
        setTyping(false);
      }
    }, timerLength);
  };

  const TypingComponent = () => (
    <div className="flex">
      <img
        src={selectedId.avatar}
        className="w-8 h-8 rounded-full mt-2 mr-1 cursor-pointer"
      />
      <div
        className="flex flex-col space-y-2 text-xs border-1 items-start px-4 rounded-lg inline-block
bg-gray-300 text-gray-600 rounded-bl-none justify-center"
      >
        <TypingIcon />
      </div>
    </div>
  );

  return (
    <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen mt-4">
      <div className="flex justify-between py-3 rounded-xl border-2 border-gray-200">
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
              <span
                onClick={() => navigate(`/user/${selectedId.id}`)}
                className="text-gray-700 mr-3 font-semibold cursor-pointer"
              >
                {selectedId.name}
              </span>
            </div>
            <span className="rounded-lg text-sm inline-block text-gray-600">
              {isThisUserOnline ? "Online" : "Offline"}
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
        {loading ? (
          <div className="text-black flex-col w-full h-screen flex justify-center align-center texts-center">
            <div
              className="w-10 mb-10 h-10 rounded-full animate-spin
                    border-2 border-dashed border-black-600 border-t-black mr-1"
            ></div>
            <p>Loading.</p>
          </div>
        ) : !loading && chats.length == 0 ? (
          <div className="text-black flex-col w-full h-screen flex justify-center align-center texts-center">
            <p>No Earlier Chats.</p>
          </div>
        ) : (
          chats.map((m, i) => (
            <div className="flex" ref={messagesEndRef} key={m.id}>
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
                          ? "bg-indigo-600 text-white rounded-br-none"
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
        {isTyping && <TypingComponent />}
      </div>
      <div
        onKeyDown={handleKeyPress}
        className="border-t-2 border-gray-200 pt-4 mb-2 sm:mb-0"
      >
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
            onChange={typingHandler}
            value={userMessage}
            className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"
          />
          <div className="items-center text-center inset-y-0 sm:flex ml-2">
            <button
              onClick={handleSendMessage}
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
