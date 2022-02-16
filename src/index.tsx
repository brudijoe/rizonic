import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App/App";
// Redux
import { store } from "./redux/store";
import { Provider } from "react-redux";
// React Router
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
