import { useParams } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const [gameplay, setGameplay] = useState([]);

  const { boardID, level, gameID } = useParams();
  const navigate = useNavigate();
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
  const correctLocation = {
    board1: {
      waldo: {
        min: {
          x: 337,
          y: 368,
        },
        max: {
          x: 359,
          y: 396,
        },
      },
      wenda: {
        min: {
          x: 347,
          y: 296,
        },
        max: {
          x: 352,
          y: 303,
        },
      },
      wizard: {
        min: {
          x: 521,
          y: 382,
        },
        max: {
          x: 532,
          y: 394,
        },
      },
      odlaw: {
        min: {
          x: 461,
          y: 475,
        },
        max: {
          x: 477,
          y: 488,
        },
      },
    },
  };

  function startGame(event) {
    const { id } = event.currentTarget;
    const newGame = {
      level: id,
      gameID: gameplay.length,
      startAt: Date.now(),
      endAt: null,
      waldo: false,
      wenda: false,
      wizard: false,
      odlaw: false,
      player: null,
    };
    setGameplay((prevGames) => {
      return [...prevGames, newGame];
    });
    navigate(`/gameplay/${id}/${newGame.gameID}`, { replace: false });
  }

  function confirmLocation(board, character, currentPos, gameID) {
    let currentGame = gameplay.find((game) => game.gameID == gameID);
    if (currentGame == undefined) {
      return alert(
        "Gameplay not found, go back to homepage and start a new game"
      );
    }
    if (
      correctLocation[board][character].min.x <= currentPos.x &&
      correctLocation[board][character].max.x >= currentPos.x &&
      correctLocation[board][character].min.y <= currentPos.y &&
      correctLocation[board][character].max.y >= currentPos.y
    ) {
      currentGame[character] = true;
      if (
        currentGame.waldo == true &&
        currentGame.wenda == true &&
        currentGame.wizard == true &&
        currentGame.odlaw == true
      ) {
        currentGame.endAt = Date.now();
      }
      updateGameplay(currentGame);
    } else {
      return alert("Wrong, Try again!");
    }
  }

  function updateGameplay(updatedGame) {
    setGameplay((prevGames) => {
      const updateGames = prevGames.map((game) => {
        if (game.gameID == updatedGame.gameID) {
          return updatedGame;
        }
        return game;
      });
      return updateGames;
    });
  }

  function addRanking(game) {
    const modGame = {
      id: rankings.length + 1,
      keyID: crypto.randomUUID(),
      level: game.level,
      time: Math.floor((game.endAt - game.startAt) / 1000),
      player: game.player,
    };
    setRankings((prevRanks) => {
      return [...prevRanks, modGame];
    });
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
    gameplay,
    updateGameplay,
    addRanking,
  };
}
