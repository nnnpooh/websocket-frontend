import { FC, useEffect, useState } from "react";
import { useSocket } from "./useSocket";

interface DataInterface {
  e: string;
  data: any;
  timestamp: number;
}
const Page: FC = () => {
  const { socket } = useSocket();

  const [data, setData] = useState<DataInterface[]>([]);

  const setDataListener = (event: string, payload: any) => {
    setData((prev) => {
      const _prev = [...prev];
      _prev.push({
        e: event,
        data: payload,
        timestamp: new Date().getTime(),
      });
      return _prev;
    });
  };
  useEffect(() => {
    // socket.on("connect", () => {
    //   console.log("connect");
    // });

    socket.on("onEnter", (payload) => {
      setDataListener("onEnter", payload);
    });

    socket.on("onChat", (payload) => {
      setDataListener("onChat", payload);
    });

    socket.on("onPrivate", (payload) => {
      setDataListener("onPrivate", payload);
    });

    return () => {
      // socket.off("connect");
      socket.off("onEnter");
      socket.off("onChat");
      socket.off("onPrivate");
    };
  }, [data]);
  console.log({ socket, data });
  return (
    <>
      <button
        onClick={() => {
          socket.emit("onChat", 999, "Hi", { data: true });
        }}
      >
        Emit
      </button>
      {data.map((d) => (
        <div key={d.timestamp}>
          [{d.e}] {JSON.stringify(d.data)}
        </div>
      ))}
    </>
  );
};

export default Page;
