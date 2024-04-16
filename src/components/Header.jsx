import { GiHamburgerMenu } from "react-icons/gi";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { RxAvatar } from "react-icons/rx";
import logo from "../assets/images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../redux/SidebarSlice";
// import { useState } from "react";
import { setSearchInput } from "../../redux/HeaderSlice";
import { filterVideos } from "../../redux/BodySlice";

const Header = () => {
  const searchInput = useSelector((state) => state.headerSlice.searchInput);

  const dispatch = useDispatch();
  const handleHamburgerClick = () => {
    dispatch(toggleSidebar());
  };

  const handleSearchChange = (e) => {
    dispatch(setSearchInput(e.target.value));
  };

  const filterAllVideos = () => {
    dispatch(filterVideos(searchInput));
  };

  return (
    <nav className="navbar grid grid-flow-col">
      <div className="flex gap-4 items-center ml-4 col-span-1">
        <GiHamburgerMenu
          className="text-2xl cursor-pointer"
          onClick={handleHamburgerClick}
        />
        <img src={logo} alt="yt_logo" className="h-[4rem]" />
      </div>
      <div className="searchBar flex col-span-10 h-8 justify-center mt-4 items-center">
        <input
          type="text"
          placeholder="Search"
          className="w-[50%] border-2 border-gray-300 px-2 pl-4 py-[0.5rem] rounded-l-full"
          onChange={handleSearchChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {  
              filterAllVideos();
            }
          }}
        />
        <FaMagnifyingGlass
          className="text-gray-400 text-[2.7rem] border-2 border-gray-300 rounded-r-full p-2"
          onClick={filterAllVideos}
        />
      </div>
      <div className="userAvatar flex items-center col-span-1 justify-end mr-2">
        <RxAvatar className="text-[2.5rem]" />
      </div>
    </nav>
  );
};

export default Header;
