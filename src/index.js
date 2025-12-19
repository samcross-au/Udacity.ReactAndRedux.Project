import React from "react";
import ReactDOM from "react-dom/client";

import App from "./components/App";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import middleware from "./middleware";
import { HashRouter as Router } from "react-router-dom";

import reportWebVitals from './reportWebVitals';

import { AuthProvider } from "./server/AuthProvider";


import 'bootstrap/dist/css/bootstrap.css';
import "./index.css";

const store = createStore(reducer, middleware);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);

reportWebVitals();
