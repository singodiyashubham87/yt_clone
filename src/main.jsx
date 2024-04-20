import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "../redux/store";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchCards from "./components/SearchCards";

function main() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/search/:videoId" element={<SearchCards />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
}

const root = createRoot(document.getElementById("root"));

root.render(main());
