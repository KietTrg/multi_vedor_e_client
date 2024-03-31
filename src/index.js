import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import store from "./store/index";
import { BrowserRouter } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <Toaster
        toastOptions={{
          position: "top-center",
          style: {
            background: "white",
            color: "black",
          },
        }}
      />
    </BrowserRouter>
  </Provider>
);

reportWebVitals();
