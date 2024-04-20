/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const SearchCard = ({
  thumbnail,
  videoId,
  kind,
  videoTitle,
  publishedTime,
  channelTitle,
  description,
}) => {
  return (
    <div className="card flex gap-8" key={videoId}>
      <Link to={`/watch/${videoId}`} className="col-span-4">
        {kind === "youtube#channel" ? (
          <img src={thumbnail} className="rounded-full shadow-mdm" />
        ) : (
          <img src={thumbnail} className="rounded-2xl shadow-mdm p-2" />
        )}
      </Link>
      <div className="videoDetails flex flex-col justify-center gap-4 col-span-8">
        <h1>{videoTitle}</h1>
        <h3>{publishedTime}</h3>
        <h2>{channelTitle}</h2>
        <p>{description.slice(0, 100)}</p>
      </div>
    </div>
  );
};

export default SearchCard;
