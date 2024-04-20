import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <>
      <div className="flex flex-col items-start">
        <Header />
        <div className="flex">
          <Sidebar />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Main;
