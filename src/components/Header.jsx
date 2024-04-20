import { GiHamburgerMenu } from "react-icons/gi";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { RxAvatar } from "react-icons/rx";
import logo from "../assets/images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../redux/SidebarSlice";
import { setSearchInput } from "../../redux/HeaderSlice";
import { Link, useNavigate } from "react-router-dom";
import { filterVideos, setSearchedVideos } from "../../redux/BodySlice";
import { apiKey } from "../constants/API_CREDS";
import { useState } from "react";
import Loader from "./Loader";

const Header = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
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

  const searchVideos = async () => {
    if (searchInput.length < 1) {
      navigate("/");
      return;
    }
    setLoader(true);
    const res = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet,id&maxResults=20&q=${searchInput}&key=${apiKey}`
    );
    const data = await res.json();
    dispatch(setSearchedVideos(data.items));
    setLoader(false);
    navigate(`/search/${searchInput}`);
  };

  return (
    <>
      <nav className="navbar grid grid-flow-col w-full">
        <div className="flex gap-4 items-center ml-4 col-span-1">
          <GiHamburgerMenu
            className="text-2xl cursor-pointer"
            onClick={handleHamburgerClick}
          />
          <Link to="/">
            <img src={logo} alt="yt_logo" className="h-[4rem]" />
          </Link>
        </div>
        <div className="searchBar flex col-span-10 h-8 justify-center mt-4 items-center">
          <input
            type="text"
            placeholder="Search"
            className="w-[50%] border-2 border-gray-300 px-2 pl-4 py-[0.5rem] rounded-l-full"
            onChange={handleSearchChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                // filterAllVideos();
                searchVideos();
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
      {loader && <Loader />}
    </>
  );
};

export default Header;
