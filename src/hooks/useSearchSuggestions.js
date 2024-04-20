import { useDispatch, useSelector } from "react-redux";
import { setSearchCache } from "../../redux/SearchSlice";
import { YT_SEARCH_SUGGESTION_API } from "../constants/APIs";

const useSearchSuggestions = (setSearchSuggestions) => {
  const dispatch = useDispatch();
  const searchInput = useSelector((state) => state.headerSlice.searchInput);

  const fetchSearchSuggestions = async () => {
    const res = await fetch(`${YT_SEARCH_SUGGESTION_API}${searchInput}`);
    const data = await res.json();
    setSearchSuggestions(data[1]);
    dispatch(setSearchCache({ [searchInput]: data[1] }));
  };

  return fetchSearchSuggestions;
};

export default useSearchSuggestions;
