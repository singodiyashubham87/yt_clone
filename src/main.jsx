import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Video from "./components/Video";
import { Provider } from "react-redux";
import store from "../redux/store";
import "./index.css";

function main() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/video/:id" element={<Video />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
}

const root = createRoot(document.getElementById("root"));

root.render(main());
