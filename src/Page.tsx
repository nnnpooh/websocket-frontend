import { FC, useEffect, useState } from "react";
import { useSocket } from "./userSocket";
const Page: FC = () => {
  const { socket } = useSocket();

  const [data, setData] = useState<any>(null);
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connect");
    });

    socket.on("onEnter", (data) => console.log(data));

    socket.on("onMessage", (data) => {
      setData(data);
    });

    return () => {
      socket.off("connect");
      socket.off("onMessage");
    };
  }, []);
  console.log({ socket });
  return <>{data && JSON.stringify(data)}</>;
};

export default Page;
