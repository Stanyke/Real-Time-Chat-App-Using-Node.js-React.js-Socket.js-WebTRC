import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { SocketContextProvider } from "./statesManager";

ReactDOM.render(
  <SocketContextProvider>
    <App />
  </SocketContextProvider>,
  document.getElementById("root")
);
