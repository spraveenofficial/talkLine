import { createContext, useContext, useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
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

    default:
      return state;
  }
};

const SocketContextProvider = ({ children }) => {
  const ENDPOINT = process.env.REACT_APP_SOCKET_URL;
  const [state, dispatch] = useReducer(connectSocketReducer, {
    socket: null,
    onlineFriends: [],
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
    }
  }, [user]);

  useEffect(() => {
    if (state.socket) {
      state.socket.on("connectedUsers", (users) => {
        dispatch({
          type: "SET_ONLINE_FRIENDS",
          payload: users,
        });
      });
    }
  }, [user]);
  return (
    <SocketContext.Provider
      value={{ socket: state.socket, onlineFriends: state.onlineFriends }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { useSocket, SocketContextProvider };
