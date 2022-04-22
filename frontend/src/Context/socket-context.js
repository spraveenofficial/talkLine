import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
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
    default:
      return state;
  }
};

const SocketContextProvider = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const [state, dispatch] = useReducer(connectSocketReducer, {
    socket: null,
  });
  useEffect(() => {
    if (isAuthenticated) {
      Promise.resolve(io("http://localhost:4000")).then((socket) => {
        dispatch({
          type: "CONNECT_SOCKET",
          payload: socket,
        });
      });
    }
  }, [isAuthenticated]);
  return (
    <SocketContext.Provider value={{ socket: state.socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export { useSocket, SocketContextProvider };
