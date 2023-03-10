import { createContext, useContext, ReactNode } from "react";
import { io, Socket } from "socket.io-client";

type socketContextProps = {
  socket: Socket;
};

const socket = io("http://localhost:3000/custom-namespace", {
  extraHeaders: {
    secret: "12345",
  },
  auth: {
    userId: "ward",
    role: "admin",
  },
});
console.log("Initialize Websocket");
const WebsocketContext = createContext<socketContextProps>({
  socket,
});

type Props = {
  children: ReactNode;
};
export const WebsocketProvider = (props: Props) => {
  return (
    <WebsocketContext.Provider value={{ socket }}>
      {props.children}
    </WebsocketContext.Provider>
  );
};

export function useSocket() {
  return useContext(WebsocketContext);
}
