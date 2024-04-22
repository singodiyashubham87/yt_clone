import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiKey } from "../constants/API_CREDS";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { MdDownload } from "react-icons/md";
import CommentsList from "./CommentsList";
import { comments } from "../constants/commentsMock";

const Watch = () => {
  const { id } = useParams();
  const videoUrl = `https://www.youtube.com/embed/${id}`;

  const [videoDetails, setVideoDetails] = useState([]);
  const [showDesc, setShowDesc] = useState(false);

  useEffect(() => {
    async function fetchYtData() {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&part=snippet,statistics,id&id=${id}&regionCode=IN&maxResults=10`
      );
      const data = await res.json();
      setVideoDetails(data.items[0]);
    }
    fetchYtData();
  }, []);

  return (
    <div className="p-8 flex flex-col gap-4 rounded-md col-span-10 w-full">
      <iframe
        src={videoUrl}
        title="YouTube video player"
        className="w-[51vw] h-[50vh] rounded-md"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"
      ></iframe>
      {videoDetails && (
        <>
          <div className="videoDetails flex flex-col gap-2 shadow-mdm rounded-2xl p-4 max-w-[62%]">
            <h1 className="text-2xl">{videoDetails?.snippet?.title}</h1>
            <div className="flex gap-4 items-center">
              <h1 className="text-[1.2rem]">
                {videoDetails?.snippet?.channelTitle}
              </h1>
              <button className="py-2 px-8 bg-black text-white hover:bg-gray-800 rounded-full cursor-pointer">
                Subscribe
              </button>
              <div className="flex p-2 px-4 gap-2 bg-black text-white hover:bg-gray-800 rounded-full cursor-pointer ml-4">
                <FaThumbsUp className="text-[1.2rem]" />
                {videoDetails?.statistics?.likeCount}
              </div>
              <div className="flex p-2 px-4 gap-2 bg-black text-white hover:bg-gray-800 rounded-full cursor-pointer">
                <FaThumbsDown className="text-[1.2rem]" />
                {"  "}
              </div>
              <div className="flex p-2 px-4 gap-2 bg-black text-white hover:bg-gray-800 rounded-full cursor-pointer">
                <MdDownload className="text-[1.2rem]" />
                {"Download"}
              </div>
            </div>
          </div>
          <div className="desc flex flex-col gap-2 shadow-mdm rounded-2xl p-4 max-w-[50vw]">
            <div className="flex gap-4">
              <h1 className="viewCount">
                {videoDetails?.statistics?.viewCount} views
              </h1>
              <h1 className="viewCount">
                {videoDetails?.snippet?.publishedAt?.slice(0, 10)} views
              </h1>
            </div>
            {showDesc ? (
              <h1 className="desc">{videoDetails?.snippet?.description}</h1>
            ) : (
              <h1 className="desc">
                {videoDetails?.snippet?.description.slice(0, 300)}
                <span
                  className="text-blue-500 hover:underline cursor-pointer font-semibold"
                  onClick={() => setShowDesc(true)}
                >
                  ...READ MORE
                </span>
              </h1>
            )}
          </div>
          <div className="comments mt-8 max-w-[62%]">
            <h1 className="text-3xl font-bold mb-4">Comments: </h1>
            <CommentsList comments={comments} />
          </div>
        </>
      )}
    </div>
  );
};

export default Watch;
