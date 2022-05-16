import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { getMessageNotification } from "../Redux/Actions";
const SocketContext = createContext();
const useSocket = () => useContext(SocketContext);

const connectSocketReducer = (state, action) => {
  switch (action.type) {
    case "CONNECT_SOCKET":
      return {
        ...state,
        socket: action.payload,
      };
    case "SET_ONLINE_FRIENDS":
      return {
        ...state,
        onlineFriends: action.payload,
      };
    case "GET_MESSAGE_NOTIFICATION":
      return {
        ...state,
        messageNotification: action.payload,
      };
    case "UPDATE_MESSAGE_NOTIFICATION":
      return {
        ...state,
        messageNotification: state.messageNotification.map(
          (eachNotification) => {
            if (eachNotification.id === action.payload.sender.id) {
              return {
                ...eachNotification,
                unseenMessages: eachNotification.unseenMessages + 1,
                recentMessage: action.payload.createdAt,
              };
            }
            return eachNotification;
          }
        ),
      };
    case "UPDATE_SEEN_MESSAGE":
      return {
        ...state,
        messageNotification: state.messageNotification.map(
          (eachNotification) => {
            if (eachNotification.id === action.payload) {
              return {
                ...eachNotification,
                unseenMessages: 0,
              };
            }
            return eachNotification;
          }
        ),
      };
    case "UPDATE_RESENT_MESSAGE":
      return {
        ...state,
        messageNotification: state.messageNotification.map(
          (eachNotification) => {
            if (eachNotification.id === action.payload.receiver) {
              return {
                ...eachNotification,
                recentMessage: action.payload.createdAt,
              };
            }
            return eachNotification;
          }
        ),
      };
    default:
      return state;
  }
};

const SocketContextProvider = ({ children }) => {
  const ENDPOINT = process.env.REACT_APP_SOCKET_URL;
  const dispatch = useDispatch();
  const [state, setDispatch] = useReducer(connectSocketReducer, {
    socket: null,
    onlineFriends: [],
    messageNotification: [],
  });
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { selectedId, chats } = useSelector((state) => state.message);
  const ref = useRef(selectedId);

  useEffect(() => {
    if (isAuthenticated) {
      const socket = io(ENDPOINT);
      socket.emit("new-user", user.id);
      setDispatch({
        type: "CONNECT_SOCKET",
        payload: socket,
      });
      getMessagesNotification();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    ref.current = selectedId;
    if (state.socket) {
      state.socket.on("connectedUsers", (users) => {
        setDispatch({
          type: "SET_ONLINE_FRIENDS",
          payload: users,
        });
      });
      state.socket.on("receiveMessage", (data) => {
        if (ref.current && ref.current.id === data.sender.id) {
          if (chats.some((chat) => chat._id === data._id)) return;
          dispatch({ type: "UPDATE_SENT_MESSAGE", payload: data });
        } else {
          setDispatch({
            type: "UPDATE_MESSAGE_NOTIFICATION",
            payload: data,
          });
        }
      });
    }
  }, [selectedId, state.socket]);

  const getMessagesNotification = async () => {
    const { data } = await getMessageNotification();
    return setDispatch({
      type: "GET_MESSAGE_NOTIFICATION",
      payload: data ? data : [],
    });
  };
  return (
    <SocketContext.Provider
      value={{
        socket: state.socket,
        onlineFriends: state.onlineFriends,
        messageNotification: state.messageNotification,
        setDispatch,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { useSocket, SocketContextProvider };
