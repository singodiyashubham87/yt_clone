import { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import { YT_MOST_POPULAR_VIDEOS_API } from "../constants/APIs";
import { useDispatch, useSelector } from "react-redux";
import { setHomePageVideos } from "../../redux/BodySlice";
import ButtonsList from "./ButtonsList";
import Loader from "./Loader";

const Body = () => {
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const homePageVideos = useSelector((state) => state.bodySlice.homePageVideos);

  useEffect(() => {
    async function fetchYtData() {
      setLoader(true);
      const res = await fetch(YT_MOST_POPULAR_VIDEOS_API);
      const data = await res.json();
      dispatch(setHomePageVideos(data.items));

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
          {homePageVideos &&
            homePageVideos.map((video) => (
              <VideoCard
                key={video?.etag}
                videoId={video?.id}
                videoTitle={video?.snippet?.title}
                channelTitle={video.snippet?.channelTitle}
                views={video?.statistics?.viewCount}
                thumbnail={video?.snippet?.thumbnails?.medium?.url}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default Body;
