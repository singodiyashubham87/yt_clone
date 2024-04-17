import { useState } from "react";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const [sideBarSections] = useState([
    "You",
    "Subscription",
    "Explore",
    "Trending",
    "More",
    "Explore",
    "Trending",
    "More",
  ]);

  const isOpen = useSelector((state) => state.sidebarSlice.isOpen);
  if (!isOpen) return null;

  return (
    <div className="sideBar flex flex-col  text-[1.2rem] bg-[#5f5f5f] col-span-2">
      <ul className="bg-[#EEEEEE] px-8 py-2 flex gap-2 flex-col">
        <li>Home</li>
        <li>Shorts</li>
        <li>Subscription</li>
      </ul>
      {sideBarSections.map((sideBarItem, i) => (
        <div key={i}>
          <h1 className="text-[1.4rem] font-bold text-white">{`${sideBarItem} >`}</h1>
          <ul className="bg-[#EEEEEE] px-8 py-2 flex gap-2 flex-col">
            <li>Your Channel</li>
            <li>History</li>
            <li>Playlist</li>
            <li>Your Videos</li>
            <li>Watch Later</li>
            <li>Liked Videos</li>
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
