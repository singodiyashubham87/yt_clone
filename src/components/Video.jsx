import { useParams } from "react-router-dom";

const Video = () => {
  const { id } = useParams();
  const videoUrl = `https://www.youtube.com/embed/${id}`;

  return (
    <div className="bg-black p-8 flex justify-center items-center min-h-screen">
      <iframe
        src={videoUrl}
        title="YouTube video player"
        className="border-2 border-red-400 w-full h-[90vh]"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"
      ></iframe>
    </div>
  );
};

export default Video;
