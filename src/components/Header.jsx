import { GiHamburgerMenu } from "react-icons/gi";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { RxAvatar } from "react-icons/rx";
import logo from "../assets/images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../redux/SidebarSlice";
import { setSearchInput } from "../../redux/HeaderSlice";
import { Link, useNavigate } from "react-router-dom";
import { setSearchedVideos } from "../../redux/BodySlice";
import {
  YT_SEARCH_RESULTS_API,
  YT_SEARCH_SUGGESTION_API,
} from "../constants/APIs";
import { useEffect, useState } from "react";
import { setSearchCache } from "../../redux/SearchSlice";
import Loader from "./Loader";

const Header = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const searchInput = useSelector((state) => state.headerSlice.searchInput);
  const searchCache = useSelector((store) => store.searchSlice);

  const dispatch = useDispatch();
  const handleHamburgerClick = () => {
    dispatch(toggleSidebar());
  };

  const handleSearchChange = (e) => {
    dispatch(setSearchInput(e.target.value));
  };

  const searchVideos = async () => {
    if (searchInput.length < 1) {
      navigate("/");
      return;
    }
    setLoader(true);
    const res = await fetch(`${YT_SEARCH_RESULTS_API}${searchInput}`);
    const data = await res.json();
    dispatch(setSearchedVideos(data.items));
    setLoader(false);
    navigate(`/search/${searchInput}`);
  };

  async function getSearchResult() {
    const res = await fetch(`${YT_SEARCH_SUGGESTION_API}${searchInput}`);
    const data = await res.json();
    setSearchSuggestions(data[1]);
    dispatch(setSearchCache({[searchInput]:data[1]}));
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchCache[searchInput]) {
        setSearchSuggestions(searchCache[searchInput]);
      } else {
        getSearchResult();
      }
    }, 200);
    return function () {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  return (
    <>
      <nav className="navbar flex w-full items-center  justify-between">
        <div className="flex gap-8 items-center ml-8">
          <GiHamburgerMenu
            className="text-2xl cursor-pointer text-gray-500 hover:text-gray-800"
            onClick={handleHamburgerClick}
          />
          <Link to="/">
            <img src={logo} alt="yt_logo" className="h-[4rem]" />
          </Link>
        </div>
        <div className="searchBar flex items-center">
          <div className="flex justify-center text-center relative">
            <input
              type="text"
              placeholder="Search"
              className="w-[40rem] border-2 border-gray-300 px-2 pl-4 py-[0.5rem] rounded-l-full active:"
              onChange={handleSearchChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  searchVideos();
                }
              }}
              onFocus={() => setShowSearchSuggestions(true)}
              onBlur={() => setShowSearchSuggestions(false)}
            />
            <FaMagnifyingGlass
              className="text-gray-400 text-[2.7rem] border-2 border-gray-300 rounded-r-full p-2"
              onClick={searchVideos}
            />
            {showSearchSuggestions && (
              <div className="absolute top-[3rem] bg-gray-100 w-full rounded-2xl">
                <div className="item">
                  {searchSuggestions &&
                    searchSuggestions.map((searchRes, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 pt-2">
                        <FaMagnifyingGlass />
                        <h6>{searchRes}</h6>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="userAvatar flex items-center justify-end mr-8">
          <RxAvatar className="text-[2.5rem]" />
        </div>
      </nav>
      {loader && <Loader />}
    </>
  );
};

export default Header;
