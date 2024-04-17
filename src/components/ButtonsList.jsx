import { useState } from "react";
import Button from "./Button";

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
  ]);

  return (
    <div className="flex px-[6rem] pt-4 gap-4">
      {btns.map((btn, i) => (
        <Button key={i} btnText={btn} />
      ))}
    </div>
  );
};

export default ButtonsList;
