import { useParams } from "react-router-dom";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// const apiUrl = import.meta.env.VITE_BLOG_API_URL;

export function useAppLogic() {
  const [rankings, setRankings] = useState([
    {
      id: 1,
      keyID: crypto.randomUUID(),
      level: 1,
      time: 42,
      player: "Gabe",
    },
    {
      id: 2,
      keyID: crypto.randomUUID(),
      level: 1,
      time: 93,
      player: "Lucky",
    },
    {
      id: 3,
      keyID: crypto.randomUUID(),
      level: 2,
      time: 164,
      player: "Jade",
    },
    {
      id: 4,
      keyID: crypto.randomUUID(),
      level: 3,
      time: 210,
      player: "Justin",
    },
    {
      id: 5,
      keyID: crypto.randomUUID(),
      level: 4,
      time: 300,
      player: "Natsu",
    },
  ]);

  const { boardID, level } = useParams();
  // const navigate = useNavigate();
  const levelsInfo = [
    {
      id: 1,
      keyID: crypto.randomUUID(),
      level: 1,
      difficulty: "easy",
      image: "/boards/board_1.jpg",
      name: "level 1 board",
    },
    {
      id: 2,
      keyID: crypto.randomUUID(),
      level: 2,
      difficulty: "easy",
      image: "/boards/board_2.jpg",
      name: "level 2 board",
    },
    {
      id: 3,
      keyID: crypto.randomUUID(),
      level: 3,
      difficulty: "normal",
      image: "/boards/board_3.jpg",
      name: "level 3 board",
    },
    {
      id: 4,
      keyID: crypto.randomUUID(),
      level: 4,
      difficulty: "normal",
      image: "/boards/board_4.jpg",
      name: "level 4 board",
    },
  ];
  const characterIcon = [
    {
      id: 1,
      keyID: crypto.randomUUID(),
      image: "/icons/waldo_icon.png",
      name: "waldo icon",
    },
    {
      id: 1,
      keyID: crypto.randomUUID(),
      image: "/icons/wenda_icon.png",
      name: "wenda icon",
    },
    {
      id: 1,
      keyID: crypto.randomUUID(),
      image: "/icons/odlaw_icon.png",
      name: "odlaw icon",
    },
    {
      id: 1,
      keyID: crypto.randomUUID(),
      image: "/icons/wizard_icon.png",
      name: "wizard icon",
    },
  ];
  return {
    boardID,
    level,
    rankings,
    levelsInfo,
    characterIcon,
  };
}
