import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setSearchInput } from "../../redux/HeaderSlice";
import { toggleSidebar } from "../../redux/SidebarSlice";
import useSearchSuggestions from "../hooks/useSearchSuggestions";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { RxAvatar } from "react-icons/rx";
import logo from "../assets/images/logo.png";
import Loader from "./Loader";
import useSearchResult from "../hooks/useSearchResult";

const Header = () => {
  const inputRef = useRef(null);
  const suggestionRef = useRef(null);
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const searchInput = useSelector((state) => state.headerSlice.searchInput);
  const searchCache = useSelector((store) => store.searchSlice);
  const fetchSearchSuggestions = useSearchSuggestions(setSearchSuggestions);
  const fetchSearchResult = useSearchResult(setLoader);

  const dispatch = useDispatch();
  const handleHamburgerClick = () => {
    dispatch(toggleSidebar());
  };

  const handleSearchChange = (e) => {
    dispatch(setSearchInput(e.target.value));
  };

  //Deboucing in search functionality
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchCache[searchInput]) {
        setSearchSuggestions(searchCache[searchInput]);
      } else {
        fetchSearchSuggestions();
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [searchInput, searchCache, fetchSearchSuggestions]);

  //Hide suggestions when clicking outside the input and suggestions div
  useEffect(() => {
    // Event listener to hide suggestions when clicking outside the input and suggestions div
    const handleClickOutside = (event) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target) &&
        suggestionRef.current &&
        !suggestionRef.current.contains(event.target)
      ) {
        setShowSearchSuggestions(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

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
              ref={inputRef}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (searchInput.length < 0) {
                    navigate("/");
                  } else {
                    setShowSearchSuggestions(false);
                    fetchSearchResult();
                  }
                }
              }}
              onFocus={() => setShowSearchSuggestions(true)}
            />
            <FaMagnifyingGlass
              className="text-gray-400 text-[2.7rem] border-2 border-gray-300 rounded-r-full p-2"
              onClick={() => {
                if (searchInput.length < 0) {
                  navigate("/");
                } else {
                  fetchSearchResult();
                }
              }}
            />
            {showSearchSuggestions && (
              <div
                className="absolute top-[3rem] bg-gray-100 w-full rounded-2xl"
                ref={suggestionRef}
              >
                <div className="item">
                  {searchSuggestions &&
                    searchSuggestions.map((searchRes, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-4 p-4 py-2 hover:bg-gray-200 cursor-pointer"
                        onClick={() => {
                          setShowSearchSuggestions(false);
                          fetchSearchResult(searchRes);
                        }}
                      >
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
          <Link to={"/user"}>
            <RxAvatar className="text-[2.5rem]" />
          </Link>
        </div>
      </nav>
      {loader && <Loader />}
    </>
  );
};

export default Header;
