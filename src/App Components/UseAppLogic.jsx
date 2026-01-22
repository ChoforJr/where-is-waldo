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
    board2: {
      waldo: {
        min: {
          x: 748,
          y: 23,
        },
        max: {
          x: 756,
          y: 35,
        },
      },
      wenda: {
        min: {
          x: 217,
          y: 317,
        },
        max: {
          x: 224,
          y: 325,
        },
      },
      wizard: {
        min: {
          x: 223,
          y: 186,
        },
        max: {
          x: 249,
          y: 229,
        },
      },
      odlaw: {
        min: {
          x: 715,
          y: 272,
        },
        max: {
          x: 724,
          y: 296,
        },
      },
    },
    board3: {
      waldo: {
        min: {
          x: 444,
          y: 217,
        },
        max: {
          x: 449,
          y: 223,
        },
      },
      wenda: {
        min: {
          x: 246,
          y: 304,
        },
        max: {
          x: 253,
          y: 309,
        },
      },
      wizard: {
        min: {
          x: 528,
          y: 153,
        },
        max: {
          x: 539,
          y: 161,
        },
      },
      odlaw: {
        min: {
          x: 346,
          y: 160,
        },
        max: {
          x: 353,
          y: 170,
        },
      },
    },
    board4: {
      waldo: {
        min: {
          x: 329,
          y: 83,
        },
        max: {
          x: 346,
          y: 107,
        },
      },
      wenda: {
        min: {
          x: 234,
          y: 361,
        },
        max: {
          x: 242,
          y: 385,
        },
      },
      wizard: {
        min: {
          x: 545,
          y: 15,
        },
        max: {
          x: 559,
          y: 29,
        },
      },
      odlaw: {
        min: {
          x: 151,
          y: 355,
        },
        max: {
          x: 162,
          y: 377,
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
