import styles from "./gameplay.module.css";
import { useNavigate } from "react-router-dom";
import { CircleCheck, Loader } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { ItemContext } from "../ItemContext";
import { useContext } from "react";

const Gameplay = () => {
  const {
    boardID,
    characterIcon,
    confirmLocation,
    gameID,
    currentGame,
    addPlayerName,
  } = useContext(ItemContext);

  const [menuPos, setMenuPos] = useState({ x: 0, y: 0, isOpen: false });
  const [iconColor, setIconColor] = useState({
    waldo: "#808080",
    wenda: "#808080",
    wizard: "#808080",
    odlaw: "#808080",
  });
  const [player, setPlayer] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const currentPos = useRef();
  const dialogRef = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    if (!currentGame) return;

    setIconColor((prev) => {
      const nextState = {};
      Object.keys(prev).forEach((char) => {
        nextState[char] = currentGame[char] === true ? "#1e90ff" : "#808080";
      });
      return nextState;
    });

    if (currentGame.endAt !== null) {
      dialogRef.current.showModal();
    }
  }, [currentGame]);

  function onChangePlayer(event) {
    const { value } = event.target;
    setPlayer(value);
  }

  function changeCurPos(event) {
    const rect = event.currentTarget.getBoundingClientRect();

    const xOnScreen = event.clientX - rect.left;
    const yOnScreen = event.clientY - rect.top;

    const originalWidth = 800;
    const originalHeight = 500;

    const finalX = (xOnScreen / rect.width) * originalWidth;
    const finalY = (yOnScreen / rect.height) * originalHeight;

    currentPos.current = {
      x: Math.floor(finalX),
      y: Math.floor(finalY),
    };
    let newMenuY = null;
    let newMenuX = null;
    if (yOnScreen > 640) {
      newMenuY = yOnScreen - 240;
    }
    if (xOnScreen > 640) {
      newMenuX = xOnScreen - 210;
    }
    setMenuPos({
      x: newMenuX || xOnScreen,
      y: newMenuY || yOnScreen,
      isOpen: true,
    });
  }

  function closeDialog(event) {
    event.stopPropagation();
    setMenuPos((prev) => ({ ...prev, isOpen: false }));
  }

  function checkCharacter(event, characterName) {
    event.stopPropagation();
    setIsLoading(true);
    confirmLocation(
      `board${boardID}`,
      characterName.toLowerCase(),
      currentPos.current,
      gameID
    );
    setIsLoading(false);
    closeDialog(event);
  }

  function submitPlayer() {
    if (player == "") {
      return alert("You must input a name");
    }
    addPlayerName(player);
    dialogRef.current.close();
    setPlayer("");
    navigate(`/ranking/${currentGame.level}`, { replace: false });
  }

  return (
    <div className={styles.gameplay}>
      <section className={styles.gameplayIcons}>
        {characterIcon.map((item) => (
          <div className={styles.gameplayIcon} key={item.keyID}>
            <img src={item.image} alt={item.name} width={25} />
            <CircleCheck size={25} color={iconColor[item.name.toLowerCase()]} />
          </div>
        ))}
      </section>
      <section className={styles.gameplayBoard} onClick={changeCurPos}>
        {boardID === "1" ? (
          <img src="/boards/board_1.jpg" alt="level 1 board" />
        ) : boardID === "2" ? (
          <img src="/boards/board_2.jpg" alt="level 2 board" />
        ) : boardID === "3" ? (
          <img src="/boards/board_3.jpg" alt="level 3 board" />
        ) : boardID === "4" ? (
          <img src="/boards/board_4.jpg" alt="level 4 board" />
        ) : (
          <img src="" alt="Invalid" />
        )}
        {menuPos.isOpen && (
          <div
            className={styles.customDialog}
            style={{
              left: `${menuPos.x}px`,
              top: `${menuPos.y}px`,
            }}
            onClick={closeDialog}
          >
            <p>
              Who is there?{" "}
              {isLoading && <Loader size={17} className={styles.spinIcon} />}
            </p>
            <section>
              {characterIcon.map((item) => {
                return (
                  currentGame[item.name.toLowerCase()] === false && (
                    <div
                      key={`${item.keyID}1`}
                      className={styles.options}
                      onClick={(event) => {
                        checkCharacter(event, `${item.name}`);
                      }}
                    >
                      <img src={item.image} alt={item.name} />
                      {item.name}
                    </div>
                  )
                );
              })}
            </section>
            <button onClick={closeDialog}>Close</button>
          </div>
        )}
      </section>
      <dialog ref={dialogRef} className={styles.playerModal}>
        <label htmlFor="player">
          Player:{" "}
          <input
            type="text"
            name="player"
            id="player"
            placeholder="Johnny"
            value={player}
            onChange={onChangePlayer}
          />
        </label>
        <button onClick={submitPlayer}>Submit</button>
      </dialog>
    </div>
  );
};

export default Gameplay;
