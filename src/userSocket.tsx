import { createContext, useContext, ReactNode } from "react";
import { io, Socket } from "socket.io-client";

type socketContextProps = {
  socket: Socket;
};

const socket = io("http://172.25.43.16:3000");
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
