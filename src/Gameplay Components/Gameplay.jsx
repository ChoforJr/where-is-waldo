import styles from "./gameplay.module.css";
import { Link } from "react-router-dom";
import { CircleCheck } from "lucide-react";

// import { useState, useEffect } from "react";
import { ItemContext } from "../ItemContext";
import { useContext } from "react";
// const apiUrl = import.meta.env.VITE_BLOG_API_URL;

const Gameplay = () => {
  const { boardID, characterIcon } = useContext(ItemContext);

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
      <section className={styles.gameplayBoard}>
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
      </section>
    </div>
  );
};

export default Gameplay;
