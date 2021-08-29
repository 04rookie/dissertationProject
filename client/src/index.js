import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.js";
import { BrowserRouter } from "react-router-dom";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";

ReactDOM.render(
  <BrowserRouter>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <App />
    </LocalizationProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
