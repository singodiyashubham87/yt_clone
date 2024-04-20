import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setSearchedVideos } from "../../redux/BodySlice";
import { YT_SEARCH_RESULTS_API } from "../constants/APIs";

const useSearchResult = (setLoader) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchInput = useSelector((state) => state.headerSlice.searchInput);

  async function fetchSearchResults(searchQuery = searchInput) {
    setLoader(true);
    const res = await fetch(`${YT_SEARCH_RESULTS_API}${searchQuery}`);
    const data = await res.json();
    dispatch(setSearchedVideos(data.items));
    setLoader(false);
    navigate(`/search/${searchQuery}`);
  }

  return fetchSearchResults;
};

export default useSearchResult;
