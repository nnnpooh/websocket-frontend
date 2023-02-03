import { useState } from "react";
import { WebsocketProvider, useSocket } from "./userSocket";
import "./App.css";
import Page from "./Page";
function App() {
  return (
    <WebsocketProvider>
      <Page />
    </WebsocketProvider>
  );
}

export default App;
