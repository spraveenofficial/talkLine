import { createContext, useContext, useEffect, useReducer } from "react";
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
  const { selectedId } = useSelector((state) => state.message);
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
    if (state.socket) {
      state.socket.on("connectedUsers", (users) => {
        setDispatch({
          type: "SET_ONLINE_FRIENDS",
          payload: users,
        });
      });
      state.socket.on("receiveMessage", (data) => {
        if (selectedId !== null && selectedId?.id === data.sender.id) {
          console.log("Executed if....");
          return dispatch({ type: "UPDATE_SENT_MESSAGE", payload: data });
        } else {
          return setDispatch({
            type: "UPDATE_MESSAGE_NOTIFICATION",
            payload: data,
          });
        }
      });
    }
  }, [state.socket, selectedId?.id]);

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
