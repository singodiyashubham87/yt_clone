import { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import { apiKey } from "../constants/API_CREDS";
import { useDispatch, useSelector } from "react-redux";
import { setAllVideos } from "../../redux/BodySlice";
import { setFilteredVideos } from "../../redux/BodySlice";
import ButtonsList from "./ButtonsList";
import Loader from "./Loader";

const Body = () => {
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const filteredVideos = useSelector((state) => state.bodySlice.filteredVideos);

  useEffect(() => {
    async function fetchYtData() {
      setLoader(true);
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&part=snippet,statistics,id&chart=mostPopular&regionCode=IN&maxResults=20`
      );
      const data = await res.json();
      dispatch(setAllVideos(data.items));
      dispatch(setFilteredVideos(data.items));
      setLoader(false);
    }
    fetchYtData();
  }, [dispatch]);

  return (
    <>
      <div className="flex flex-col">
      {loader && <Loader />}
        <ButtonsList />
        <div className="flex flex-wrap gap-[2rem] p-8  justify-center">
          {filteredVideos &&
            filteredVideos.map((video) => (
              <VideoCard
                key={video?.id}
                videoId={video?.id}
                videoTitle={video?.snippet?.title}
                channelTitle={video.snippet?.channelTitle}
                views={video?.statistics?.viewCount}
                thumbnail={video?.snippet?.thumbnails?.maxres?.url}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default Body;
