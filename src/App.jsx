import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Main from "./components/Main";
import Body from "./components/Body";
import Watch from "./components/Watch";

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
          path: "/watch/:id",
          element: <Watch />,
        },
      ],
    },
  ]);

  return (
    <>
      <Header />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
