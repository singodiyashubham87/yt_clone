import { useState } from "react";
import {
  YT_KEYWORD_SEARCH_API,
  YT_MOST_POPULAR_VIDEOS_API,
} from "../constants/APIs";
import { useDispatch } from "react-redux";
import { setHomePageVideos } from "../../redux/BodySlice";
import Loader from "./Loader";

const ButtonsList = () => {
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const [btns] = useState([
    "All",
    "Music",
    "Gaming",
    "News",
    "Movies",
    "Fashion",
    "Live",
    "Learning",
    "Spotlight",
    "360",
    "Video",
    "VR",
  ]);

  async function fetchKeywordResults(searchKeyword) {
    setLoader(true);
    const res = await fetch(
      searchKeyword === "All"
        ? YT_MOST_POPULAR_VIDEOS_API
        : YT_KEYWORD_SEARCH_API + searchKeyword
    ).then((res) => res.json());
    const data = res.items;
    dispatch(setHomePageVideos(data));
    setLoader(false);
  }

  return (
    <>
      <div className="flex px-[6rem] pt-4 gap-4 items-center justify-center">
        {btns.map((btn, i) => (
          <h1
            key={i}
            className="bg-gray-300 px-4 py-2 rounded-lg text-lg font-primary hover:bg-gray-400 cursor-pointer"
            onClick={() => {
              fetchKeywordResults(btn);
            }}
          >
            {btn}
          </h1>
        ))}
      </div>
      {loader && <Loader />}
    </>
  );
};

export default ButtonsList;
