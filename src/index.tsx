import React from "react";
import * as ReactDOMClient from "react-dom/client";
import App from "./App";
import store from "./redux/store";
import { Provider } from "react-redux";

const container = document.getElementById("app");
const root = ReactDOMClient.createRoot(container);
localStorage.clear();
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
