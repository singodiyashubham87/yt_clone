import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiKey } from "../constants/API_CREDS";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { MdDownload } from "react-icons/md";

const Watch = () => {
  const { id } = useParams();
  const videoUrl = `https://www.youtube.com/embed/${id}`;

  const [videoDetails, setVideoDetails] = useState([]);

  useEffect(() => {
    async function fetchYtData() {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&part=snippet,statistics,id&id=R0_ZzOrucI0&regionCode=IN&maxResults=10`
      );
      const data = await res.json();
      setVideoDetails(data.items[0]);
    }
    fetchYtData();
  }, []);

  return (
    <div className="p-8 flex flex-col gap-4 rounded-md col-span-10">
      <iframe
        src={videoUrl}
        title="YouTube video player"
        className="w-[50vw] h-[50vh] rounded-md"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"
      ></iframe>
      {videoDetails && (
        <>
          <div className="videoDetails flex flex-col gap-2 shadow-mdm rounded-2xl p-4">
            <h1>{videoDetails?.snippet?.title}</h1>
            <div className="flex gap-4 items-center">
              <h1 className="text-[1.2rem]">
                {videoDetails?.snippet?.channelTitle}
              </h1>
              <button className="py-2 px-8 bg-black text-white hover:bg-gray-800 rounded-full cursor-pointer">
                Subscribe
              </button>
              <div className="flex p-2 px-4 gap-2 bg-black text-white hover:bg-gray-800 rounded-full cursor-pointer ml-[4rem]">
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
            <h1 className="desc">{videoDetails?.snippet?.description}</h1>
          </div>
        </>
      )}
    </div>
  );
};

export default Watch;
