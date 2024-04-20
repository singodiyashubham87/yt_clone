import { useSelector } from "react-redux";
import SearchCard from "./SearchCard";
import { useParams } from "react-router-dom";

const SearchCards = () => {
  const { videoId } = useParams();
  console.log(videoId);
  const searchedVideos = useSelector((state) => state.bodySlice.searchedVideos);

  return (
    <div className="flex flex-col gap-4">
      {searchedVideos &&
        searchedVideos.map((video) => (
          <SearchCard
            key={video.id.videoId}
            videoId={video.id.videoId}
            thumbnail={video.snippet.thumbnails.medium.url}
            videoTitle={video?.snippet?.title}
            publishedTime={video.snippet.publishedAt.slice(0, 10)}
            channelTitle={video.snippet.channelTitle}
            description={video.snippet.description}
          />
        ))}
    </div>
  );
};

export default SearchCards;
