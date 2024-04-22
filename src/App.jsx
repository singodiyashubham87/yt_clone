import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../redux/store";
import SearchCards from "./components/SearchCards";
import Main from "./components/Main";
import Watch from "./components/Watch";
import Body from "./components/Body";
import UserPage from "./components/UserPage";
import "./index.css";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children: [
        {
          path: "/",
          element: <Body />,
        },
        {
          path: "watch/:id",
          element: <Watch />,
        },
        {
          path: "/search/:videoId",
          element: <SearchCards />,
        },
        {
          path: "/user",
          element: <UserPage />,
        },
      ],
    },
  ]);

  return (
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </React.StrictMode>
  );
}

const root = createRoot(document.getElementById("root"));

root.render(<App />);

export default App;
