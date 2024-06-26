import { useSelector } from "react-redux";
import SearchCard from "./SearchCard";

const SearchCards = () => {
  const searchedVideos = useSelector((state) => state.bodySlice.searchedVideos);

  return (
    <div className="flex flex-col gap-4 p-4">
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
            kind={video.id.kind}
          />
        ))}
    </div>
  );
};

export default SearchCards;
