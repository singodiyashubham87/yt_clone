import { useEffect } from "react";
import VideoCard from "./VideoCard";
import { apiKey } from "../constants/API_CREDS";
import { useDispatch, useSelector } from "react-redux";
import { setAllVideos } from "../../redux/BodySlice";
import { setFilteredVideos } from "../../redux/BodySlice";

const Body = () => {
  const filteredVideos = useSelector((state) => state.bodySlice.filteredVideos);

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
    <div className="flex flex-wrap gap-[2rem] p-8  justify-center">
      {filteredVideos &&
        filteredVideos.map((video) => {
          return (
            <VideoCard
              key={video.id}
              videoId={video.id}
              videoTitle={video.snippet.title}
              channelTitle={video.snippet.channelTitle}
              views={video.statistics.viewCount}
              thumbnail={video.snippet.thumbnails.maxres.url}
            />
          );
        })}
    </div>
  );
};

export default Body;
