import { createContext } from "react";
import io from "socket.io-client";
import { apiBaseUrl } from "../config/constants";

export const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const socket = io(apiBaseUrl);
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
