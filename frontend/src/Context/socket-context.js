import { createContext, useContext, useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
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
    default:
      return state;
  }
};

const SocketContextProvider = ({ children }) => {
  const ENDPOINT = process.env.REACT_APP_SOCKET_URL;
  const [state, dispatch] = useReducer(connectSocketReducer, {
    socket: null,
    onlineFriends: [],
    messageNotification: [],
  });
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  useEffect(() => {
    if (isAuthenticated) {
      const socket = io(ENDPOINT);
      socket.emit("new-user", user.id);
      dispatch({
        type: "CONNECT_SOCKET",
        payload: socket,
      });
      getMessagesNotification();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (state.socket) {
      state.socket.on("connectedUsers", (users) => {
        dispatch({
          type: "SET_ONLINE_FRIENDS",
          payload: users,
        });
      });
    }
  }, [state.socket]);

  const getMessagesNotification = async () => {
    const { data } = await getMessageNotification();
    return dispatch({
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
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { useSocket, SocketContextProvider };
