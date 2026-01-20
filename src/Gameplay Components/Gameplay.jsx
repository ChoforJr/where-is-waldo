import styles from "./gameplay.module.css";
// import { Link } from "react-router-dom";
import { CircleCheck } from "lucide-react";
import { useRef, useState } from "react";
import { ItemContext } from "../ItemContext";
import { useContext } from "react";
// const apiUrl = import.meta.env.VITE_BLOG_API_URL;

const Gameplay = () => {
  const { boardID, characterIcon, confirmLocation } = useContext(ItemContext);
  const [menuPos, setMenuPos] = useState({ x: 0, y: 0, isOpen: false });
  const currentPos = useRef();

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
    confirmLocation("board1", "waldo", currentPos.current);
  }

  function closeDialog(event) {
    event.stopPropagation();
    setMenuPos((prev) => ({ ...prev, isOpen: false }));
  }

  return (
    <div className={styles.gameplay}>
      <section className={styles.gameplayIcons}>
        {characterIcon.map((item) => (
          <div className={styles.gameplayIcon} key={item.keyID}>
            <img src={item.image} alt={item.name} width={25} />
            <CircleCheck size={25} color="#808080" />
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
            <p>Who is there?</p>
            <section>
              {characterIcon.map((item) => (
                <div key={`${item.keyID}1`} className={styles.options}>
                  <img src={item.image} alt={item.name} />
                  {item.name}
                </div>
              ))}
            </section>
            <button onClick={closeDialog}>Close</button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Gameplay;
