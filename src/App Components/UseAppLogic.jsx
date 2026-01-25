import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_WHERE_IS_WALDO_API_URL;

export function useAppLogic() {
  const [rankings, setRankings] = useState([]);
  const [currentGame, setCurrentGame] = useState();

  const { boardID, level, gameID } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getFinishedGameplays();
  }, []);
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
      name: "Waldo",
    },
    {
      id: 1,
      keyID: crypto.randomUUID(),
      image: "/icons/wenda_icon.png",
      name: "Wenda",
    },
    {
      id: 1,
      keyID: crypto.randomUUID(),
      image: "/icons/odlaw_icon.png",
      name: "Odlaw",
    },
    {
      id: 1,
      keyID: crypto.randomUUID(),
      image: "/icons/wizard_icon.png",
      name: "Wizard",
    },
  ];

  async function getFinishedGameplays() {
    try {
      const response = await fetch(`${apiUrl}/gameplay/finished`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      const gameplays = result.map((gameplay) => {
        return {
          id: gameplay.id,
          keyID: crypto.randomUUID(),
          level: gameplay.level,
          time: Math.floor(
            (new Date(gameplay.endAt) - new Date(gameplay.startAt)) / 1000
          ),
          player: gameplay.player,
        };
      });
      setRankings(gameplays);
    } catch (error) {
      console.error("Network error:", error);
    }
  }

  async function startGame(event) {
    const { id } = event.currentTarget;
    try {
      const response = await fetch(`${apiUrl}/gameplay/level/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      setCurrentGame(result[0]);
      navigate(`/gameplay/${id}/${result[0].id}`, { replace: false });
    } catch (error) {
      console.error("Network error:", error);
    }
  }

  async function confirmLocation(board, character, currentPos, gameID) {
    try {
      const response = await fetch(`${apiUrl}/gameplay/${gameID}/character`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          board: board,
          character: character,
          currentPos: currentPos,
        }),
      });
      const result = await response.json();
      if (response.status == 404) {
        return alert("Wrong, Try again!");
      }
      if (response.ok) {
        setCurrentGame(result);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  }

  async function addPlayerName(player) {
    try {
      const response = await fetch(`${apiUrl}/gameplay/${gameID}/player`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          player: player,
        }),
      });
      const result = await response.json();
      const rankedPrepared = {
        id: result[0].id,
        keyID: crypto.randomUUID(),
        level: result[0].level,
        time: Math.floor(
          (new Date(result[0].endAt) - new Date(result[0].startAt)) / 1000
        ),
        player: result[0].player,
      };
      if (response.ok) {
        setCurrentGame(result[0]);
        setRankings((prev) => {
          return [...prev, rankedPrepared];
        });
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  }

  return {
    boardID,
    level,
    rankings,
    levelsInfo,
    characterIcon,
    confirmLocation,
    startGame,
    gameID,
    currentGame,
    addPlayerName,
  };
}
