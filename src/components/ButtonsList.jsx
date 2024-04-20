import { useState } from "react";

const ButtonsList = () => {
  const [btns] = useState([
    "All",
    "Music",
    "Gaming",
    "News",
    "Movies",
    "Fashion",
    "Live",
    "Learning",
    "Spotlight",
    "360",
    "Video",
    "VR",
  ]);

  return (
    <div className="flex px-[6rem] pt-4 gap-4 items-center justify-center">
      {btns.map((btn, i) => (
        <h1
          key={i}
          className="bg-gray-300 px-4 py-2 rounded-lg text-lg font-primary hover:bg-gray-400 cursor-pointer"
        >
          {btn}
        </h1>
      ))}
    </div>
  );
};

export default ButtonsList;
