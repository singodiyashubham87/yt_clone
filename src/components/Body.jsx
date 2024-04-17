import { useEffect } from "react";
import VideoCard from "./VideoCard";
import { apiKey } from "../constants/API_CREDS";
import { useDispatch, useSelector } from "react-redux";
import { setAllVideos } from "../../redux/BodySlice";
import { setFilteredVideos } from "../../redux/BodySlice";
import ButtonsList from "./ButtonsList";
import SearchCards from "./SearchCards";

const Body = () => {
  const filteredVideos = useSelector((state) => state.bodySlice.filteredVideos);
  const showSearchedVideos = useSelector(
    (state) => state.bodySlice.showSearchedVideos
  );

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchYtData() {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&part=snippet,statistics,id&chart=mostPopular&regionCode=IN&maxResults=20`
      );
      const data = await res.json();
      dispatch(setAllVideos(data.items));
      dispatch(setFilteredVideos(data.items));
    }
    fetchYtData();
  }, [dispatch]);

  return (
    <>
      <div className="flex flex-col">
        <ButtonsList />
        <div className="flex flex-wrap gap-[2rem] p-8  justify-center">
          {showSearchedVideos ? (
            <SearchCards />
          ) : (
            filteredVideos &&
            filteredVideos.map((video) => (
              <VideoCard
                key={video?.id}
                videoId={video?.id}
                videoTitle={video?.snippet?.title}
                channelTitle={video.snippet?.channelTitle}
                views={video?.statistics?.viewCount}
                thumbnail={video?.snippet?.thumbnails?.maxres?.url}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Body;
