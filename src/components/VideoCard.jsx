/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const VideoCard = ({ videoId, videoTitle, channelTitle, views, thumbnail }) => {
  return (
    <div className="videoCard  p-2 rounded-3xl shadow-mdm">
      <div className="flex flex-col gap-2">
        <Link to={`/watch/${videoId}`}>
          <img
            src={thumbnail}
            alt=""
            className="w-[20rem] h-[12rem] cursor-pointer rounded-xl"
          />
        </Link>
        {/* <video src={`https://www.youtube.com/watch?v=${videoId}`} className="w-[16rem] h-[9rem]"></video> */}
        <div className="videoDetails flex">
          <img src="" alt="" />
          <div className="flex flex-col">
            <h4>{videoTitle?.slice(0, 30)}</h4>
            <p>{channelTitle}</p>
            <div className="subDetails flex">
              <p>{views?views.slice(0, -3):"100k"}K views</p>
              {/* <p>{timestamp}</p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
