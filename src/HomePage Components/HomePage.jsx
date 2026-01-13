import styles from "./homePage.module.css";
import { useNavigate } from "react-router-dom";
import { ItemContext } from "../ItemContext";
import { useContext } from "react";

const HomePage = () => {
  const { levelsInfo } = useContext(ItemContext);

  const navigate = useNavigate();
  function startGame(event) {
    const { id } = event.currentTarget;
    navigate(`/gameplay/${id}`, { replace: false });
  }

  return (
    <div className={styles.levels}>
      {levelsInfo.map((item) => (
        <article
          key={item.keyID}
          className={styles.levelArticle}
          id={item.id}
          onClick={startGame}
        >
          <img src={item.image} alt={item.name} />
          <div>
            <h2>level {item.level}</h2>
            {item.difficulty == "easy" ? (
              <p style={{ color: "#7CFC00", backgroundColor: "#cd5700" }}>
                {item.difficulty}
              </p>
            ) : (
              <p style={{ color: "#FFFF00", backgroundColor: "#cd5700" }}>
                {item.difficulty}
              </p>
            )}
          </div>
        </article>
      ))}
    </div>
  );
};

export default HomePage;
