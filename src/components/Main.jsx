import Body from "./Body";
import Sidebar from "./Sidebar";

const Main = () => {
  return (
    <>
      <div className="flex w-full min-h-screen">
        <Sidebar />
        <Body />
      </div>
    </>
  );
};

export default Main;
